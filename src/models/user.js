const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Metodo per hashare la password prima di salvare l'utente
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { return next(); }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Metodo per confrontare la password
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Metodo per cambiare la password
UserSchema.methods.changePassword = async function (oldPassword, newPassword) {
    const isMatch = this.verifyPassword(oldPassword);
    if (!isMatch) {
        throw new Error('La vecchia password non è corretta.');
    }
    this.password = newPassword;
    await this.save();
};

UserSchema.statics.register = async function (username, password) {
    const existingUser = await this.findOne({ username });
    if (existingUser) {
        throw new Error('Nome utente già in uso.');
    }
    const newUser = new this({ username, password });
    await newUser.save();
    return newUser;
};

module.exports = mongoose.model('User', UserSchema);
