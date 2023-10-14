const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return value.match(emailRegex);
            },
            message: 'Please enter valid email address.',

        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 6;
            },
            message: 'Password must be at least 6 character',
        }
    },
    addresss: {
        trim: true,
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    }
});


///creating a model
const User = mongoose.model('User', userSchema);


module.exports = User;