const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

const saltRounds = Number(process.env.SALT_ROUNDS); // salt rounds diganti .env biar secure

const register = async (req, res, next) => {
  let {
    name,
    username,
    email,
    password,
    position,
    image,
    address,
    date_of_birth,
    handphone,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const defaultImage = "https://via.placeholder.com/150";
    if (!image) {
      image = defaultImage;
    }

    const user = await prisma.employee.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        position,
        image,
        address,
        date_of_birth,
        handphone,
      },
    });

    res.status(201).json({ message: "User created", data: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    let user;

    if (username) {
      user = await prisma.employee.findUnique({
        where: {
          username: username,
        },
      });
    } else if (email) {
      user = await prisma.employee.findUnique({
        where: {
          email: email,
        },
      });
    } else {
      return res.status(400).json({ error: "Invalid input" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = {
      userId: user.username,
      username: user.username,
      email: user.email,
      position: user.position,
      image: user.image,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    req.session.token = token; // token gak dipass ke client, tapi disimpan di session

    res.status(200).json({ message: "Login success" });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json({ message: "Logout success" });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { username } = req.user;

  try {
    const user = await prisma.employee.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as old password" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = await prisma.employee.update({
      where: {
        username: username,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Password updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

const updateAccount = async (req, res, next) => {
  const { username, email, position } = req.body;
  const { username: currentUsername } = req.user;

  try {
    const user = await prisma.employee.findUnique({
      where: {
        username: currentUsername,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.employee.update({
      where: {
        username: currentUsername,
      },
      data: {
        username,
        email,
        position,
      },
    });

    res.status(200).json({ message: "Account updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  changePassword,
  updateAccount,
};
