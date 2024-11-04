require('dotenv').config();
const fs = require('fs');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const helmet = require('helmet');
const https = require('https');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// Load SSL certificates
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Connect Database
connectDB();

// Configure cors
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'production') {
      // Allow specific origin (production frontend)
      const allowedOrigins = ['https://localhost:3000'];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Allow localhost during development
      callback(null, true); // Allow all origins during development
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

  
// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection to routes that require it
app.use('/api', csrfProtection);

// Send CSRF token to frontend
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Apply rate limiting to API routes
app.use('/api', limiter);

// Set X-Frame-Options to DENY to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Redirect HTTP to HTTPS (optional but recommended)
app.use((req, res, next) => {
  if (req.protocol === 'http') {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

// Start the HTTPS server
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});