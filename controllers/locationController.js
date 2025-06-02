// import Location from "../models/Location.js";

// export async function getLocations(req, res) {
//   try {
//     const locations = await Location.find();
//     res.json(locations);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// }

// export async function searchLocation(req, res) {
//   const query = req.query.q;
//   try {
//     const location = await Location.findOne({
//       location: { $regex: new RegExp(query, "i") },
//     });

//     if (!location) return res.status(404).json({ message: "Not found" });

//     res.json(location);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching location" });
//   }
// }



// export async function addLocation(req, res) {
//   const { location, venue } = req.body;

//   if (!location || !venue) {
//     return res.status(400).json({ message: "Location and venue are required" });
//   }

//   try {
//     let existingLocation = await Location.findOne({ location });

//     if (existingLocation) {
//       // Avoid duplicate venues
//       if (!existingLocation.venues.includes(venue)) {
//         existingLocation.venues.push(venue);
//         await existingLocation.save();
//       }
//       return res.status(200).json(existingLocation);
//     }

//     // Create new location with the venue as array
//     const newLocation = new Location({
//       location,
//       venues: [venue],
//     });

//     await newLocation.save();
//     res.status(201).json(newLocation);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "Failed to add location" });
//   }
// }



import Location from "../models/Location.js";

// Get all locations with venues
export async function getLocations(req, res) {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// Search for a location and return its venues
export async function searchLocation(req, res) {
  const query = req.query.q;
  try {
    const location = await Location.findOne({
      location: { $regex: new RegExp(query, "i") },
    });

    if (!location) return res.status(404).json({ message: "Not found" });

    res.json(location); // location.venues is an array of venue objects
  } catch (err) {
    res.status(500).json({ message: "Error fetching location" });
  }
}

// Add a venue to a location (admin)
export async function addLocation(req, res) {
  const { location, venue } = req.body;

  if (!location || !venue || !venue.name) {
    return res.status(400).json({ message: "Location and venue name are required" });
  }

  try {
    let existingLocation = await Location.findOne({ location });

    if (existingLocation) {
      // Avoid duplicate venues by name
      if (!existingLocation.venues.some(v => v.name === venue.name)) {
        existingLocation.venues.push(venue);
        await existingLocation.save();
      }
      return res.status(200).json(existingLocation);
    }

    // Create new location with the venue as array
    const newLocation = new Location({
      location,
      venues: [venue],
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add location" });
  }
}