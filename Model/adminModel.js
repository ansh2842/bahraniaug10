const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


AdminSchema.pre('save', function(next) {
    const admin = this;
    if (!admin.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(admin.password, salt, function(err, hash) {
            if (err) return next(err);
            admin.password = hash;
            next();
        });
    });
});

const adminModel = mongoose.model("admin", AdminSchema);

module.exports = adminModel;
