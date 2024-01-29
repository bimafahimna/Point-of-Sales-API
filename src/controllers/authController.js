const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const register = async (req, res) => {
  const { name, username, password, position, image } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.employee.create({
      data: {
        name,
        username,
        password: hashedPassword,
        position,
        image,
      },
    });

    res.status(201).json({ userId: user.employee_id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const user = await prisma.employee.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.employee_id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = {
  register,
  login,
};
