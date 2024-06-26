const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, name, lastName, role) => {
  return jwt.sign(
    { id, email, name, lastName, role }, 
    process.env.SECRET_KEY, 
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { name, lastName, email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Login and password can't be empty"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ name, lastName, email, role, password: hashPassword });

    const token = generateJwt(user.id, user.email, user.name, user.lastName, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User not found"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password!"));
    }
    const token = generateJwt(user.id, user.email, user.name, user.lastName, user.role);
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.lastName, req.user.role);;
    return res.json({ token });
  }
}

module.exports = new UserController();
