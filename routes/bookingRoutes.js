// import { Router } from "express";
// import { createBooking, getUserBookings, getAllBookingsWithUser } from "../controllers/bookingController.js";
// import verifyToken from "../middleware/authMiddleware.js";
// import { getPlayersByLocation } from "../controllers/bookingController.js";

// const router = Router();

// router.post("/create", verifyToken, createBooking);
// router.get("/my", verifyToken, getUserBookings);
// router.get("/", getAllBookingsWithUser); // Public route for homepage cards
// router.get("/players", getPlayersByLocation);

// export default router;

import { Router } from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookingsWithUser,
  getPlayersByLocation,
  getBookingsByVenue
} from "../controllers/bookingController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyToken, createBooking);
router.get("/my", verifyToken, getUserBookings);
router.get("/", getAllBookingsWithUser); // Public route for homepage cards
router.get("/players", getPlayersByLocation);
router.get("/venue/:venueId", getBookingsByVenue); // <-- NEW

export default router;