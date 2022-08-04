const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('DB IS CONNECTED')
})

mongoose.connection.on('error', (err) => {
  console.log(`CANNOT CONNECT TO DB! ERROR: ${err}`)
  process.exit(1)
})

exports.connect = async (mongoURL = '127.0.0.1:27017/auth') => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose.connection
}