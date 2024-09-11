const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5000', 'https://image-uploader-frontend-ten.vercel.app'], // Allow localhost during development and your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // If you're sending cookies, you need to include this
}));

// Middleware setup
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/posts', postRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://kaushikdange3107:EN2GXAAyYgao5laN@cluster0.uzvrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
