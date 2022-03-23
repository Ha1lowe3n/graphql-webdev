import mongoose from "mongoose";

const Movie = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    directorId: [{ type: String }],
});

export default mongoose.model("Movie", Movie);
