// user schema for mongodb
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    reports:[]
})
UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
}
)
module.exports = mongoose.model('User', UserSchema)