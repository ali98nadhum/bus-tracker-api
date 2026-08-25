const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// ==================================
// @desc Start a trip (Go online)
// @route /api/v1/driver/trip/start
// @method PUT
// @access public (assuming busId is passed in body for MVP)
// ==================================
module.exports.startTrip = asyncHandler(async (req, res) => {
    const busId = req.user.id;
    const { destinationId } = req.body;

    if (!destinationId) {
        return res.status(400).json({ message: "destinationId مطلوبة" });
    }

    const bus = await prisma.bus.findUnique({
        where: { id: parseInt(busId) }
    });

    if (!bus) {
        return res.status(404).json({ message: "الباص غير موجود" });
    }

    if (bus.status !== 'approved') {
        return res.status(403).json({ message: "حساب السائق قيد المراجعة أو غير موافق عليه" });
    }

    const updatedBus = await prisma.bus.update({
        where: { id: parseInt(busId) },
        data: {
            destinationId: parseInt(destinationId),
            isOnline: true
        }
    });

    res.status(200).json({ message: "تم بدء الرحلة بنجاح السائق الآن متصل", bus: updatedBus });
});

// ==================================
// @desc End a trip (Go offline)
// @route /api/v1/driver/trip/end
// @method PUT
// @access public
// ==================================
module.exports.endTrip = asyncHandler(async (req, res) => {
    const busId = req.user.id;

    const updatedBus = await prisma.bus.update({
        where: { id: parseInt(busId) },
        data: {
            destinationId: null,
            isOnline: false
        }
    });

    res.status(200).json({ message: "تم إنهاء الرحلة السائق الآن غير متصل", bus: updatedBus });
});
