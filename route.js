import express from "express";
import Routeact from "./routeact.js";
const router = express.Router();
router.route("/c").get(Routeact.fetchall)

router.route("/new").post(Routeact.addcorridor);
router.route("/:id")
.get(Routeact.getcorridor)
.put(Routeact.updatecorridor)
.delete(Routeact.deletecorridor)
router.route("/location").post((req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Received location: Latitude = ${latitude}, Longitude = ${longitude}`);
    res.send("Location received successfully!");})

export default router;
