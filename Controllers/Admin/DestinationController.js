const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { HashPassword } = require("../../Utils/HashPassword");
const {generateToken} = require("../../Utils/generateToken");

const prisma = new PrismaClient();





// ==================================
// @desc Create new Destination
// @route /api/v1/admin/Destination
// @method POST
// @access public
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