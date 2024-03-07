const router = require("express").Router();
const Wholesaler = require("../models/wholesalerModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Middleware to parse cookies
router.use(cookieParser());

// Function to set a cookie
const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    // Secure: true, // Uncomment this line in production for secure HTTPS connection
    sameSite: 'strict', // Adjust according to your requirements
  });
};

// Function to clear a cookie
const clearTokenCookie = (res) => {
  res.clearCookie('token');
};

// register
router.post('/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await Wholesaler.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newWholesaler = new Wholesaler({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      state: req.body.state,
      pincode: req.body.pincode,
      password: hashedPassword
    });
    await newWholesaler.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// log in
router.post('/login', async (req, res) => {
  try {
    const wholesaler = await Wholesaler.findOne({ email: req.body.email });
    if (!wholesaler) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, wholesaler.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a token
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: wholesaler._id }, secretKey);

    // Set token as a cookie
    setTokenCookie(res, token);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// log out
router.get('/logout', async (req, res) => {
  try {
    // Clear token cookie
    clearTokenCookie(res);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Current user route
router.get('/currentuser', async (req, res) => {
  try {
    // Extract token from request cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Decode token to get user ID
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Find user by ID
    const wholesaler = await Wholesaler.findById(userId);
    if (!wholesaler) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    res.json(wholesaler);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add to cart
router.post("/addToCart", async (req, res)=>{
  try{
      const {email, productName, quantity, calculatedPrice } = req.body;

      const newWholesaler = new Wholesaler({
        email, productName, quantity, calculatedPrice
      });

      const savedWholesaler = await newWholesaler.save();

  } catch (err) {
      console.error(err);
      res.status(500).send(); 
  }
});

router.get('/wholesalerRegister', async (req, res) => {
  try {
    const wholesalers = await Wholesaler.find();
    res.json(wholesalers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;