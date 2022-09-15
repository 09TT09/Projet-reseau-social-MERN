const { default: mongoose } = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 60,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      maxlength: 200,
      minlength: 8,
    },
    firstName: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    picture: {
      type: String,
      default: "./uploads/profil/user.png",
    },
    cellphone: {
      type: Number,
      validate: [isMobilePhone],
      trim: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 200,
    },
    biography: {
      type: String,
      max: 1024,
    },
    job: {
      type: String,
      maxlength: 200,
    },
    nationality: {
      type: [String],
    },
    countryOfResidence: {
      type: String,
      maxlength: 200,
    },
    townOrCityOfResidence: {
      type: String,
      maxlength: 200,
    },
    birthday: {
      type: Date,
    },
    connected: {
      type: Number,
    },
    friends: {
      type: [String],
    },
    groups: {
      type: [String],
    },
    hideSensitiveInformation: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
