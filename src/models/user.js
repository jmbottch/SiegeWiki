const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({ 

    name: {
        type: String,
        unique: true,
        validate: {
            validator: (username) => username.length > 5,
            message: 'Username must be longer than five characters.'
        },
        required: [true, 'name is required']
        
    },

    password: {
        type: String,
        validate: {
            validator: (password) => password.length > 6,
            message: 'Password must be at least seven characters'
        },
        required: [true, 'password is required']
    },

});

const User = mongoose.model('user', UserSchema);

module.exports = User;