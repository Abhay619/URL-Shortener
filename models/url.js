const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true
    },
    redirectUrl: {
        type: String,
    },
    visitHistory: [{timestamps: {type: Number}}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},
{
    timestamps: true
}
);

const urlModel = mongoose.model("url", urlSchema);

module.exports = urlModel;