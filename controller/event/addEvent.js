const { writeFileSync } = require("fs");
const Event = require("../../model/events.js");
const crypto = require("crypto");

const config = require("../../config.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

async function addEvent(req, res) {
  try {
    const { eventName, eventDate } = req.body || {};
    let { eventPhoto } = req.files || {};

    // Check if eventPhoto exists and is a valid file
    if (eventPhoto && eventPhoto.size > 0) {
      // Generate a random name for the file
      const randomName = `${crypto.randomBytes(10).toString("hex")}.png`;
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(eventPhoto.tempFilePath, {
        folder: "uploads", // Optional: Specify a folder in Cloudinary
      });

      // Delete the temporary file after uploading
      eventPhoto.mv(eventPhoto.tempFilePath, (err) => {
        if (err) {
          console.error("Failed to delete temporary file:", err);
        }
      });

      // Create the event with Cloudinary URL
      await Event.create({
        eventName,
        eventDate,
        eventPhoto: result.secure_url,
      });

      // Fetch all events and send response
      const events = await Event.find({});
      res.status(200).json({ events });
    } else {
      // If no event photo provided
      await Event.create({
        eventName,
        eventDate,
      });

      // Fetch all events and send response
      const events = await Event.find({});
      res.status(200).json({ events });
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.code === 11000) {
      res.status(409).json({ message: "Event already exists" });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = addEvent;
