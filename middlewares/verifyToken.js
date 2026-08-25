const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "توكن غير صالح (Invalid token)" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "الوصول مرفوض، لا يوجد توكن (No token provided)" });
  }
}

// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "ADMIN") {
      next();
    } else {
      return res.status(403).json({ message: "غير مسموح، فقط للأدمن (Admins only)" });
    }
  });
}

// Verify Token & Driver
function verifyTokenAndDriver(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "DRIVER") {
      next();
    } else {
      return res.status(403).json({ message: "غير مسموح، فقط للسائق (Drivers only)" });
    }
  });
}

// Verify Token & User
function verifyTokenAndUser(req, res, next) {
    verifyToken(req, res, () => {
      if (req.user.role === "USER") {
        next();
      } else {
        return res.status(403).json({ message: "غير مسموح، فقط للمستخدم (Users only)" });
      }
    });
  }

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndDriver,
  verifyTokenAndUser
};
