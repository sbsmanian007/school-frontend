const { config: _config } = require("dotenv");

_config();

const config = {
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  cloudinaryURL: process.env.CLOUDINARY_URL,
};

module.exports = config;
