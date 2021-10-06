const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// ----------------------------- //

const ApplicantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
},{
    versionKey: false,
    timestamps: true
});

ApplicantSchema.method('fix', function() {
    const mongooseInstance = this.toObject();

    mongooseInstance.id = mongooseInstance._id;
    delete mongooseInstance._id;

    return mongooseInstance;
});

// ----------------------------- //

module.exports = mongoose.model("applicants" ,ApplicantSchema);