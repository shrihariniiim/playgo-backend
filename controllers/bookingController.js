// import User from "../models/userModel.js";
// import Location from "../models/Location.js"; 
// import Booking from "../models/Booking.js";

// // Create a new booking
// export async function createBooking(req, res) {
//   try {
//     const booking = new Booking({ ...req.body, userId: req.user.id });
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create booking" });
//   }
// }

// // Get bookings for the logged-in user
// export async function getUserBookings(req, res) {
//   try {
//     const bookings = await Booking.find({ userId: req.user.id });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// }

// // Get all bookings with user info (for homepage cards)
// export async function getAllBookingsWithUser(req, res) {
//   try {
//     const bookings = await Booking.find().populate("userId", "email role");
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// }

// export async function getPlayersByLocation(req, res) {
//   try {
//     const { location } = req.query;
//     const locations = await Location.find({ name: { $regex: location, $options: "i" } });
//     const locationIds = locations.map(l => l._id);
//     const bookings = await Booking.find({ locationId: { $in: locationIds } });
//     const userIds = [...new Set(bookings.map(b => b.userId.toString()))];
//     const users = await User.find({ _id: { $in: userIds } }, "email role name karma");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch players" });
//   }
// }


import User from "../models/userModel.js";
import Location from "../models/Location.js";
import Booking from "../models/Booking.js";

// Create a new booking
export async function createBooking(req, res) {
  try {
    const booking = new Booking({ ...req.body, userId: req.user.id });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: "Failed to create booking" });
  }
}

// Get bookings for the logged-in user
export async function getUserBookings(req, res) {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

// Get all bookings with user info (for homepage cards)
export async function getAllBookingsWithUser(req, res) {
  try {
    const bookings = await Booking.find().populate("userId", "email role name karma");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

// Get unique players who booked in a location
export async function getPlayersByLocation(req, res) {
  try {
    const { location } = req.query;
    const locations = await Location.find({ location: { $regex: location, $options: "i" } });
    const venueIds = locations.flatMap(loc => (loc.venues || []).map(v => v._id));
    const bookings = await Booking.find({ venueId: { $in: venueIds } });
    const userIds = [...new Set(bookings.map(b => b.userId.toString()))];
    const users = await User.find({ _id: { $in: userIds } }, "email role name karma");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch players" });
  }
}

// Get all bookings for a specific venue (for booked players section)
export async function getBookingsByVenue(req, res) {
  try {
    const { venueId } = req.params;
    const bookings = await Booking.find({ venueId }).populate("userId", "name email karma role");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}