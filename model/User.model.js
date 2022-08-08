const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: [String],
      default: ["user"],
    },
    password: {
      type: String,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password);
  return next();
});

userSchema.method({
  passwordMatches(password){
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password, isReg }) {
    if (!email) {
      throw new Error("No Email");
    }
    if (!password) {
      throw new Error("No password");
    }
    if (isReg === false) {
      const user = await this.findOne({ email }).exec();
      if (!user) {
        throw new Error("No user");
      }
      const isPasswordOk = await user.passwordMatches(password);
      if (!isPasswordOk) {
        throw new Error("Password incorrect");
      }
      await user.updateOne({isLogin: true})
      return user;
    } else {
      const user = await this.findOne({ email }).exec();
      if (user) {
        throw new Error("User is already exists");
      }
      try {
        const userObj = await new this({ email, password });
        await userObj.save();
      } catch (err) {
        console.log(err);
      }
    }
  },
};

module.exports = mongoose.model("chat_users", userSchema);
