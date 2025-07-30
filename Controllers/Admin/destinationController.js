const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();



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
