const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
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
        required: true
    },

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    //if password is not modified or created
    if (!this.isModified('password')) {
        next();
    }

    //if password is modified or created
    try {
        const salt = await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password, salt);
    }
    catch (err) {
        console.log(err);
    }
})

//control if password is matched
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;