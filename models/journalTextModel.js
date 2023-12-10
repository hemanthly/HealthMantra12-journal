const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema(
    {
        date: {
            type: Date, // Change the type to Date for better handling of dates
            required: [true, "Enter the journal date"]
        },
        title: {
            type: String, // Assuming you want a title for the journal
            required: [true, "Enter a title for the journal"]
        },
        message: {
            type: String,
            required: [true, "Please write something about today..."]
        }
    },
    {
        timestamps: true
    }
);

const Journal = mongoose.model('Journal', journalSchema); // here the first one is the model name which is stored 
// as a collection name in mongodb atlas.

module.exports = Journal;
