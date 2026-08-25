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

// ==================================
// @desc Reject a driver
// @route /api/v1/admin/drivers/reject/:id
// @method PUT
// @access private (Admin only)
// ==================================
module.exports.rejectDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const driver = await prisma.bus.findUnique({
        where: { id: parseInt(id) }
    });

    if (!driver) {
        return res.status(404).json({ message: "لم يتم العثور على السائق" });
    }

    const updatedDriver = await prisma.bus.update({
        where: { id: parseInt(id) },
        data: { status: "rejected" },
        select: { id: true, driverName: true, status: true }
    });

    res.status(200).json({ message: "تم رفض السائق بنجاح", driver: updatedDriver });
});

// ==================================
// @desc Block/Unblock a driver
// @route /api/v1/admin/drivers/block/:id
// @method PUT
// @access private (Admin only)
// ==================================
module.exports.blockDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { block } = req.body; // true to block, false to unblock

    const driver = await prisma.bus.findUnique({
        where: { id: parseInt(id) }
    });

    if (!driver) {
        return res.status(404).json({ message: "لم يتم العثور على السائق" });
    }

    const updatedDriver = await prisma.bus.update({
        where: { id: parseInt(id) },
        data: { block: Boolean(block) },
        select: { id: true, driverName: true, block: true }
    });

    res.status(200).json({ message: `تم ${block ? 'حظر' : 'فك حظر'} السائق بنجاح`, driver: updatedDriver });
});

// ==================================
// @desc Get all drivers
// @route /api/v1/admin/drivers
// @method GET
// @access private (Admin only)
// ==================================
module.exports.getAllDrivers = asyncHandler(async (req, res) => {
    const drivers = await prisma.bus.findMany({
        select: {
            id: true,
            driverName: true,
            carNumber: true,
            phone: true,
            status: true,
            block: true,
            isOnline: true,
            createdAt: true
        }
    });

    res.status(200).json(drivers);
});
