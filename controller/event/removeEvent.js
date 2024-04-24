const Event = require("../../model/events.js");

async function removeEvent(req, res) {
    const {name} = req.params;
    console.log("name = ", name)

    const event = await Event.findOne({eventName: name});
    if(!event) {
        return res.status(400).json({success: false, message: "Event not found"});
    }
    await Event.findOneAndDelete({eventName: name});

    const events = await Event.find({});

    console.log(events)

    res.status(200).json({ status: true, message: "Event deleted successfully", events: events });
}
module.exports = removeEvent;
