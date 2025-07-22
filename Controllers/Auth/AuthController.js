const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { HashPassword } = require("../../Utils/HashPassword");

const prisma = new PrismaClient();

// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST
// @access public
// ==================================
module.exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "This user already exists" });
  }

  const hashedPassword = await HashPassword(password);

  let imagePath;
  if (req.file) {
    imagePath = `/assets/${req.file.filename}`;
  } else {
    imagePath = "/assets/avatar.jpg";  
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: imagePath,
      role,
      block: false,
    },
  });

  res.status(201).json({ message: "User registered successfully" });
});
