const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { HashPassword } = require("../../Utils/HashPassword");
const {generateToken} = require("../../Utils/generateToken");
const { registerValidator } = require("../../Utils/validators/UserRegistervalidator");

const prisma = new PrismaClient();

// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST
// @access public
// ==================================
module.exports.registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;

  

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "This user already exists" });
  }

  const hashedPassword = await HashPassword(password);

  let imagePath;
  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
  } else {
    imagePath = "/assets/avatar.jpg";  
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: imagePath,
      role: "USER",
      isApproved: true,
    },
  });

  res.status(201).json({ message: "User registered successfully" });
});



// ==================================
// @desc Login
// @route /api/v1/auth/login
// @method POST
// @access public
// ==================================
module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate a JWT token 
  const token = generateToken(user.id, user.name, user.role);

  res.status(200).json({ message: "login success", token: token });
});