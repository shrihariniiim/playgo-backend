
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user', 'manager'] },
    name: { type: String, required: true },
    karma: { type: Number, default: 0 }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;