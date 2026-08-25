const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// ==================================
// @desc Get all pending drivers
// @route /api/v1/admin/drivers/pending
// @method GET
// @access private (Admin only)
// ==================================
module.exports.getPendingDrivers = asyncHandler(async (req, res) => {
    const pendingDrivers = await prisma.bus.findMany({
        where: {
            status: "pending"
        },
        select: {
            id: true,
            driverName: true,
            carNumber: true,
            phone: true,
            driverImage: true,
            licensephoto: true,
            createdAt: true
        }
    });

    res.status(200).json(pendingDrivers);
});

// ==================================
// @desc Approve a driver
// @route /api/v1/admin/drivers/approve/:id
// @method PUT
// @access private (Admin only)
// ==================================
module.exports.approveDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const driver = await prisma.bus.findUnique({
        where: { id: parseInt(id) }
    });

    if (!driver) {
        return res.status(404).json({ message: "لم يتم العثور على السائق" });
    }

    if (driver.status === 'approved') {
        return res.status(400).json({ message: "هذا السائق موافق عليه مسبقاً" });
    }

    const updatedDriver = await prisma.bus.update({
        where: { id: parseInt(id) },
        data: { status: "approved" },
        select: {
            id: true,
            driverName: true,
            status: true
        }
    });

    res.status(200).json({ message: "تمت الموافقة على السائق بنجاح", driver: updatedDriver });
});
