const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { HashPassword } = require("../../Utils/HashPassword");
const {generateToken} = require("../../Utils/generateToken");
const sendEmail = require("../../Utils/emails/sendEmail");
const verifyEmailTemplate = require("../../Utils/emails/emailTemplates/verifyEmailTemplate");
const randomBytes = require('randombytes');

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

  const verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

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
      verificationToken: randomBytes(32).toString("hex"),
      verificationTokenExpires: verificationTokenExpires
    },
  });

  const link = `${process.env.DOMAIN}/api/v1/auth/verify-email/${user.id}/${user.verificationToken}`;


     // send email to verified user
    try {
      await sendEmail({
        email: user.email,
        subject: "رابط التفعيل الخاص بك صالح لمده 10 دقائق فقط",
        message: verifyEmailTemplate(user.email , link)
      })
    } catch (error) {
      console.log(error);
      
    }

  res.status(201).json({ message: "تم التسجيل بنجاح يرجى تفقد الاميل الخاص بك لتاكد الحساب" });
});


// ==================================
// @desc verfiy email
// @route /api/v1/auth/verify-email/:id/:verificationToken
// @method GET
// @access private (only user register)
// ==================================
module.exports.verfiyEmail = asyncHandler(async(req , res) => {
  const { id, verificationToken } = req.params;

  const user = await prisma.user.findUnique({where:{id: parseInt(id)}})
  if(!user){
    return res.status(404).json({message: "لا يوجد مستخدم بهذا المعرف "})
  }

  if (user.verificationToken === null || user.verificationTokenExpires < new Date()) {
  await prisma.user.update({
    where: {id: parseInt(user.id), },
    data: { verificationToken: null },
  });

  return res.status(404).json({ message: "انتهت صلاحيه رابط التاكيد يرجى طلب رابط جديد" });
}

if (user.verificationToken !== verificationToken) {
    return res.status(400).json({ message: "يوجد خطا في رابط التاكد او انه غير تابع لهذا الحساب" });
  }

  await prisma.user.update({
    where:{id: parseInt(user.id),},
    data: {
      isVerifird: true,
      verificationToken: null,
      verificationTokenExpires: null
    }
  })

  res.status(200).json({message: "تم تاكيد حسابك بنجاح يرجى تسجيل الدخول لاستخدام خدماتنا"})

})



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