const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();



// ==================================
// @desc Get All Destination
// @route /api/v1/admin/Destination
// @method GET
// @access public
// ==================================
module.exports.getAllDestination = asyncHandler(async (req, res) => {
  const { name } = req.query;

  const destination = await prisma.destination.findMany({
    where: name
      ? {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : undefined,
  });

  return res.status(200).json({ data: destination });
});


// ==================================
// @desc Get All Destination
// @route /api/v1/admin/Destination
// @method GET
// @access public
// ==================================
module.exports.getDestinationById = asyncHandler(async(req , res) => {
    const {id} = req.params;

    const destination = await prisma.destination.findUnique({
        where: {id:parseInt(id)}
    })

    if(!destination){
        return res.status(404).json({message:  "لا توجد رحله متوفره لهذا المعرف"})
    }

    return res.status(200).json({data: destination})
})



// ==================================
// @desc Create new Destination
// @route /api/v1/admin/Destination
// @method POST
// @access private ( only admin )
// ==================================
module.exports.createDestination = asyncHandler(async(req , res) => {
    const {name} = req.body;

    const existingName = await prisma.destination.findFirst({
        where: {name}
    });

    if(existingName) {
        return res.status(400).json({message: "هذا المسار موجود بالفعل"})
    }


    const destination = await prisma.destination.create({
        data: {
            name
        }
    });

    res.status(201).json({message: "تم انشاء المسار بنجاح" , date:destination})
})




// ==================================
// @desc Delete Destination
// @route /api/v1/admin/Destination
// @method DELETE
// @access private ( only admin )
// ==================================
module.exports.deleteDestination = asyncHandler(async(req , res) => {
    const {id} = req.params;


     const destination = await prisma.destination.findUnique({
        where: {id:parseInt(id)}
    })

    if(!destination){
        return res.status(404).json({message:  "لا توجد رحله متوفره لهذا المعرف"})
    }

    await prisma.destination.delete({
        where: {id: parseInt(id)}
    })

    res.status(200).json({message: "تم حذف المسار بنجاح"})
})