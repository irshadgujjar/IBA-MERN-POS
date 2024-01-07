const { hash, compare } = require("bcryptjs");
const User = require("./model");
const jwt = require("jsonwebtoken");
const { connect } = require('mongoose');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Missing Required Field",
    });
  }

  try {
    await connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const checkExist = await User.exists({ email: email });

    if (checkExist) {
      console.log("User already exists");
      return res.status(409).json({
        message: "User already exists",
      });
    }

    console.log("Creating a new user");
    const newUser = await User.create({
      username,
      email,
      password: await hash(password, 12),
    });

    console.log("Signup Successfully");

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to YourApp',
      text: `Hi ${username}, welcome to YourApp!`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error during user sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing Required Field",
    });
  }

  try {
    await connect(process.env.MONGO_URI);

    const checkExistUser = await User.findOne({ email: email });

    if (!checkExistUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const decryptPass = await compare(password, checkExistUser.password);

    if (decryptPass) {
      const token = jwt.sign(
        {
          username: checkExistUser.username,
          id: checkExistUser._id,
          email: checkExistUser.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.status(200).json({
        message: "Successfully Logged In",
        token: token
      });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (error) {
    console.error("Error during user Login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      return res.status(200).json(users.map((user) => ({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile,
          joining: user.joining
      })));
  } catch (error) {
      console.error('Error fetching all users:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserByID = async (req, res) => {
  const userId = req.query.id;

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile,
          joining: user.joining
      });
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.body;
  try {
    await connect(process.env.MONGO_URI);
    await User.deleteOne({ _id });
    const users = await User.find();

    return res.json({
      message: "User Deleted Successfully",
      users
    });
  } catch (error) {
    console.error("Error Deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { _id, username, email, profile } = req.body;

  const filter = { _id };
  const update = { username, email, profile };

  try {
    await connect(process.env.MONGO_URI);
    await User.findOneAndUpdate(filter, update, {
      new: true
    });
    const users = await User.find();

    return res.json({
      message: "User Updated Successfully",
      users
    });
  } catch (error) {
    console.error("Error Updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await connect(process.env.MONGO_URI);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send reset email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      text: `To reset your password, click on the following link: ${process.env.CLIENT_URL}/reset-password/${resetToken}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(200).json({
      message: "Password reset email sent successfully"
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    await connect(process.env.MONGO_URI);

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Update the password
    user.password = await hash(newPassword, 12);
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login, forgotPassword, resetPassword, getAllUsers, getUserByID, deleteUser, updateUser };