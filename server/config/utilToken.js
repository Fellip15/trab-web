const jwt = require("jsonwebtoken");

exports.generate = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

exports.verify = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
};