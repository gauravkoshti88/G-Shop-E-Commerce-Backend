import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    phone: {
        type: String
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;