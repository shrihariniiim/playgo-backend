// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   court: String,
//   sport: String,
//   date: String,
//   startTime: String,
//   endTime: String,
//   duration: Number,
//   price: Number,
// }, {
//   timestamps: true,
// });

// export default mongoose.model("Booking", bookingSchema);



import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  court: String,
  sport: String,
  date: String,
  startTime: String,
  endTime: String,
  duration: Number,
  price: Number,
}, {
  timestamps: true,
});

export default mongoose.model("Booking", bookingSchema);