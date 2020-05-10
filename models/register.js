let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let registerSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, {timestamps: true});

registerSchema.pre('save', function(next){
    if (this.password && this.isModified('password')) {
       this.password = bcrypt.hashSync(this.password, 10);
        return next();
    } else {
        return next();
    }
})

registerSchema.methods.verify = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Register', registerSchema);