const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

// Haversine formula to calculate distance in km
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat)/2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

module.exports = (io) => {
    // Socket Authentication Middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (err) {
            next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id, 'Role:', socket.user.role);

        // Driver updates their location
        socket.on('driver:updateLocation', async (data) => {
            if (socket.user.role !== 'DRIVER') return;

            try {
                const busId = socket.user.id;
                const { lat, lng } = data;
                
                // Verify the bus exists and is online/approved
                const bus = await prisma.bus.findUnique({
                    where: { id: parseInt(busId) }
                });

                if (bus && bus.status === 'approved' && bus.isOnline) {
                    // Update or create location
                    await prisma.busLocation.upsert({
                        where: { busId: parseInt(busId) },
                        update: { lat, lng },
                        create: { busId: parseInt(busId), lat, lng }
                    });
                }
            } catch (error) {
                console.error('Error updating driver location:', error);
            }
        });

        // User asks for the nearest bus
        socket.on('user:getNearestBus', async (data) => {
            try {
                const { lat, lng, destinationId } = data;

                // Find all online buses going to this destination with their locations
                const buses = await prisma.bus.findMany({
                    where: {
                        destinationId: parseInt(destinationId),
                        isOnline: true,
                        status: 'approved'
                    },
                    include: {
                        busLocation: true
                    }
                });

                let nearestBus = null;
                let minDistance = Infinity;

                buses.forEach(bus => {
                    if (bus.busLocation) {
                        const dist = getDistance(
                            lat, lng,
                            bus.busLocation.lat, bus.busLocation.lng
                        );
                        if (dist < minDistance) {
                            minDistance = dist;
                            nearestBus = {
                                busId: bus.id,
                                driverName: bus.driverName,
                                carNumber: bus.carNumber,
                                phone: bus.phone,
                                lat: bus.busLocation.lat,
                                lng: bus.busLocation.lng,
                                distanceKm: parseFloat(dist.toFixed(2))
                            };
                        }
                    }
                });

                socket.emit('nearestBusResult', nearestBus);
            } catch (error) {
                console.error('Error finding nearest bus:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
