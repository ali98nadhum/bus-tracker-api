const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();


// ==================================
// @desc Get All Destination
// @route /api/v1/admin/destination
// @method POST
// @access private ( only admin )
// ==================================
module.exports.getAllDestination = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const destinations = await prisma.destination.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: 'insensitive', 
          },
        }
      : {},
  });

  res.status(200).json({ data: destinations });
});


// ==================================
// @desc Get  Destination by id
// @route /api/v1/admin/destination
// @method POST
// @access private ( only admin )
// ==================================
module.exports.getOneDestination = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const destination = await prisma.destination.findUnique({
    where: {
      id: parseInt(id),
    },
    include:{
        buses: {
            select:{
                driverName:  true,
                driverImage: true,
                carNumber: true
            }
        }
    }
  });

  if (!destination) {
    return res.status(404).json({ message: "لا يوجد مسار مرتبط بهذا المعرف" });
  }

  res.status(200).json({ data: destination });
});



// ==================================
// @desc Create new Destination
// @route /api/v1/admin/destination
// @method POST
// @access private ( only admin )
// ==================================
module.exports.createDestination = asyncHandler(async(req , res) => {
    const {name} = req.body;

    const existingDestination = await prisma.destination.findFirst({
        where: {name}
    })
    
    if(existingDestination){
        return res.status(400).json({message: "هذا المسار موجود بالفعل "})
    }

    const destination = await prisma.destination.create({
        data:{
            name
        }
    })

    res.status(201).json({message: "تم انشاء المسار بنجاح", destination})
})





// ==================================
// @desc Delete Destination
// @route /api/v1/admin/destination/:id
// @method POST
// @access private ( only admin )
// ==================================
module.exports.deleteDestination = asyncHandler(async(req , res) => {
  const {id} = req.params;

  const destination = await prisma.destination.findUnique({
    where: {id: parseInt(id)}
  })

  if(!destination){
    return res.status(404).json({message: "لا يوجد مسار بهذا المعرف"})
  }

  await prisma.destination.delete({
    where: {id:parseInt(id)}
  })

  res.status(200).json({message: "تم حذف المسار بنجاح"})
})