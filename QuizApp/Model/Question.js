const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// ----------------------------- //

const QuestionSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answerId: {
        type: Number,
        required: true
    },
},{
    versionKey: false,
    timestamps: false
});

QuestionSchema.method('fix', function() {
    const mongooseInstance = this.toObject();

    mongooseInstance.id = mongooseInstance._id;
    delete mongooseInstance._id;

    return mongooseInstance;
});

// ----------------------------- //

module.exports = mongoose.model("questions" ,QuestionSchema);