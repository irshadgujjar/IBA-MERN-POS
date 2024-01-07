const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    profile : {
        type : String,
        default : "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    },
    joining : {
        type : Date,
        default : Date.now
    }
})

const User = model('user', UserSchema)
module.exports = User