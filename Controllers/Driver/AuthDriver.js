const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const { HashPassword } = require("../../Utils/HashPassword");
const { generateToken } = require("../../Utils/generateToken");


// ==================================
// @desc Create new Bus driver
// @route /api/v1/admin/register
// @method POST
// @access public
// ==================================
module.exports.registerDriver = asyncHandler(async (req, res) => {
  const { carNumber } = req.body;

  const existingDriver = await prisma.bus.findUnique({
    where: { carNumber },
  });

  if (existingDriver) {
    return res.status(400).json({ message: "هذا السائق مسجل بالفعل" });
  }

  if (!req.files || !req.files.draverImage || !req.files.licensephoto) {
    return res
      .status(400)
      .json({ message: "يجب رفع صوره للسائق وصوره لوكاله السياره" });
  }

  const driverImagePath = `/uploads/${req.files.draverImage[0].filename}`;
  const licensePhotoPath = `/uploads/${req.files.licensephoto[0].filename}`;

  const hashedPassword = await HashPassword(req.body.password);

  const driver = await prisma.bus.create({
    data: {
      driverName: req.body.driverName,
      phone: req.body.phone,
      password: hashedPassword,
      driverImage: driverImagePath,
      licensephoto: licensePhotoPath,
      carNumber: req.body.carNumber,
    },
  });

  res
    .status(201)
    .json({ message: "تم تسجيل السائق بنجاح يرجى انتظار الموافقه", driver });
});

// ==================================
// @desc Login Driver
// @route /api/v1/driver/auth/login
// @method POST
// @access public
// ==================================
module.exports.loginDriver = asyncHandler(async (req, res) => {
  const { carNumber, password } = req.body;

  if (!carNumber || !password) {
    return res.status(400).json({ message: "رقم السيارة وكلمة المرور مطلوبان" });
  }

  const driver = await prisma.bus.findUnique({ where: { carNumber } });

  if (!driver || !(await bcrypt.compare(password, driver.password))) {
    return res.status(400).json({ message: "رقم السيارة أو كلمة المرور غير صحيحة" });
  }

  // Generate a JWT token 
  const token = generateToken(driver.id, driver.driverName, driver.role);

  res.status(200).json({ 
    message: "تم تسجيل الدخول بنجاح", 
    token: token,
    driver: {
        id: driver.id,
        driverName: driver.driverName,
        status: driver.status
    }
  });
});
