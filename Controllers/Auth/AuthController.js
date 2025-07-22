const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");



const prisma = new PrismaClient();



// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST
// @access public
// ==================================
