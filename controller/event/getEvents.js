const Event = require("../../model/events.js");

async function getEvents(req, res) {
  const events = await Event.find({});
  console.log("events = ", events)
  res.status(200).json({ events });
}
module.exports = getEvents;
