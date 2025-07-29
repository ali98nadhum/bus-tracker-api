const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();
const { HashPassword } = require("../../Utils/HashPassword");



// ==================================
// @desc Create new Bus driver
// @route /api/v1/admin/Destination
// @method POST
// @access private ( only admin )
// ==================================
module.exports.registerNewDriver = asyncHandler(async(req , res) => {

  const {carNumber} = req.body;

    // const existingDriver = await prisma.bus.findUnique({
    //     where: {carNumber}
    // });


    // if(existingDriver){
    //     return res.status(400).json({message: "هذا السائق مسجل بالفعل"})
    // }

     if (!req.files || !req.files.draverImage || !req.files.licensephoto) {
    return res.status(400).json({ message: "يجب رفع صوره السائق وصوره رخصه الوكاله الخاصه بالسياره " });
  }

  const driverImagePath = `/uploads/${req.files.draverImage[0].filename}`;
  const licensePhotoPath = `/uploads/${req.files.licensephoto[0].filename}`;


  const hashedPassword = await HashPassword(req.body.password);

  const driver = await prisma.bus.create({
    data: {
        driverName: req.body.driverName,
        phone: req.body.phone,
        password: hashedPassword,
        draverImage: driverImagePath,
        licensephoto: licensePhotoPath,
        carNumber: req.body.carNumber,
        destination: {
      connect: {
        id: parseInt(req.body.destinationId) 
      }
    }
    }
  });

  res.status(201).json({message: "تم تسجيل السائق بنجاح يرجى انتظار الموافقه" , driver})

})