import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },

    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        city:{type:String},
        state:{type:String},
        nearBy:{type:String},
        landMark:{type:String},
        pincode:{type:String}
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;