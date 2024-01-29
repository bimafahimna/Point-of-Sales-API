const prisma =  require('../config/database')
const jwt = require('jsonwebtoken');

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password,
        },
      });
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ userId: user.id }, 'your-jwt-secret', { expiresIn: '1h' });
  
      req.session.token = token;
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
  register,
  login,
};
