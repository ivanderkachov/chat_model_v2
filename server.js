const express = require("express");
const app = express();
const http = require("http");
const mongooseService = require("./services/mongoose");
const passportJWT = require("./services/passport");
const User = require("./model/User.model");
const Room = require("./model/Room.model");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const socketio = require('socket.io')
const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

const server = http.createServer(app);
const router = express.Router();

const port = process.env.PORT || 8090;

const dbUrl =
  "mongodb+srv://ivanderkachov:63441257I@cluster0.uwzfx.mongodb.net/Tasks";
mongooseService.connect(dbUrl);



router.get("/", (req, res) => {
  res.json("server up and running");
});
app.use(router)
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
passport.use('jwt', passportJWT.jwt)

const io = socketio(server, {
  cors: {
    origin: "*"
  }
})

io.on('connection', async (socket) => {
  console.log('connected')
    socket.on('join', ({name, room}, callback) => {
      const { error, user } = addUser({id: socket.id, name, room})
      if (error) {
        return callback(error)
      }
      console.log(error, user)
      socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`})
      socket.join(user.room)
      io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})

      callback()
    })
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('message', {user: user.name, text: message})
      callback()
    })

          // const clients = await io.fetchSockets();
          // console.log(clients);

  socket.on('disconnect', async () => {
    console.log('disconnected')
    const user = removeUser(socket.id)

    if (user) {
      try {
        await Room.findOneAndUpdate({name: user.room}, {users: getUserInRoom(user.room)})
      } catch (err) {
        console.log(err)
      }

      io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left`})
       io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})

    }
  })
})

app.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtSecret = "howareyou"
    const token = req.cookies.token
    const jwtUser = jwt.verify(req.cookies.token, jwtSecret)
    const user = await User.findById(jwtUser.uid)
    res.json({status: 'ok', token, user})
  } catch (err) {
    console.log(err)
    res.json({status: "Error! Incorrect token"})
  }
})

app.post("/api/v1/users", async (req, res) => {
  try {
    // console.log(req.body)
    const user = await User.findAndValidateUser(req.body)
    res.status(200).json({ message: 'User is added'});
  } catch (err) {
    console.log(err)
    res.status(300).json({ status: `Incorrect registration data` });
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await User.findAndValidateUser(req.body)

    const payload = {uid: user.id}
    const jwtSecret = 'howareyou'
    const token = jwt.sign(payload, jwtSecret, {expiresIn: '1h'})

    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })

  } catch (err) {
    console.log(err);
    res.status(300).json({ status: `Incorrect user data` });
  }
});

app.post("/api/v1/logout", async (req, res) => {
  try {
    console.log(req.body)
    await User.findOneAndUpdate(req.body, {isLogin: false} )
    res.clearCookie('token')
    res.json({status: 'User is logout'})
  } catch (err) {
    console.log(err)
    res.status(300).json({status: "ERROR"})
  }
})


app.post("/api/v1/addroom", async (req, res) => {
  try {
    const roomObj = await new Room(req.body)
    await roomObj.save()
    const newRoomObj = await Room.find({}).exec()
    res.json({status: 'ok', newRoomObj})
  } catch (err) {
    console.log(err)
  }
})
app.post("/api/v1/delroom", async (req, res) => {

  try {

    await Room.findOneAndDelete(req.body)
    const roomObj = await Room.find({}).exec()
    res.json({ status: "ok", roomObj });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/adddata", async (req, res) => {
  try {
    const {name, users} = req.body
    // console.log(name, users)
    await Room.findOneAndUpdate({name}, {users})
    const newRoomObj = await Room.find({}).exec();
    // console.log(newRoomObj)
    res.json({ status: "ok", newRoomObj });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/addmessage", async (req, res) => {
  try {
    const { name, message } = req.body;
    const roomMessages = await Room.findOne({name})
    const messages = [...roomMessages.messages, message]
    await Room.findOneAndUpdate({ name }, { messages });
    const newRoomObj = await Room.find({}).exec();
    // console.log(newRoomObj);
    res.json({ status: "ok", newRoomObj });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v1/getroom", async (req, res) => {
  try {
    const roomObj = await Room.find({}).exec()
    res.json({ status: "ok", roomObj });
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, () => {
  console.log(`SERVER HAS STARTED ON PORT ${port}`);
});
