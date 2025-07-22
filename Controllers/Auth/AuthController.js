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

  console.log('Uploaded filename:', req.file.filename);


  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: imagePath,
      role: "USER",
      block: false,
    },
  });

  res.status(201).json({ message: "User registered successfully" });
});
