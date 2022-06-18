const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
       type: String,
       require: [true, 'Pls input a name'], 
    },
    email: {
        type: String,
        require: true, 
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
},{
    timestamps: true 
})


module.exports = mongoose.model('User', userSchema)