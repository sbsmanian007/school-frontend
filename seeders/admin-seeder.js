const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../model/admins.js");
const config = require("../config.js");

async function seedAdmin() {
  // Connect to the database
  await mongoose
    .connect(config?.MONGO_URI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });

  const existingAdmin = await Admin.findOne({ username: "admin" });

  if (!existingAdmin) {
    const user = {
      username: "admin",
      password: "Rama$School2024",
    };

    const genSalt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user?.password, genSalt);

    const admin = new Admin({
      username: user?.username,
      password: hashedPassword,
    });

    await admin.save();
  }
}

// Execute the admin seeder
seedAdmin()
  .then(() => {
    console.log("Admin seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
  });
