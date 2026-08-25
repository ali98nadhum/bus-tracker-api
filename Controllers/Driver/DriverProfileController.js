const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// ==================================
// @desc Get driver profile
// @route /api/v1/driver/profile
// @method GET
// @access private (Driver only)
// ==================================
module.exports.getDriverProfile = asyncHandler(async (req, res) => {
    const driver = await prisma.bus.findUnique({
        where: { id: parseInt(req.user.id) },
        select: {
            id: true,
            driverName: true,
            carNumber: true,
            phone: true,
            driverImage: true,
            licensephoto: true,
            status: true,
            isOnline: true,
            destinationId: true,
            createdAt: true
        }
    });

    if (!driver) {
        return res.status(404).json({ message: "السائق غير موجود" });
    }

    res.status(200).json(driver);
});
