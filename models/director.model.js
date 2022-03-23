import mongoose from "mongoose";

const Director = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
});

export default mongoose.model("Director", Director);
