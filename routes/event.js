const express = require("express");
const getEvents = require("../controller/event/getEvents.js");
const addEvent = require("../controller/event/addEvent.js");
const removeEvent = require("../controller/event/removeEvent.js");
const eventRouter = express.Router();

eventRouter.get("/get", getEvents);
eventRouter.post("/add", addEvent);
eventRouter.delete("/remove/:name", removeEvent);

module.exports = eventRouter;
