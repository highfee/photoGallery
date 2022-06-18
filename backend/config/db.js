const mongoose = require('mongoose')

const connection = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected on ${db.connection.host}`.yellow.underline)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connection,
}