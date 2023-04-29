const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Authenticate = require("../Middleware/Authentication");
const User = require("../DataBase/userSchema");
const Otp = require("../DataBase/optSchema");


// *********** Register POST ********************************
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "email or password are missing" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ error: "user is alredy exists" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      await user.save();
      res.status(200).json({ message: "sucsessfull" });
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

// **************** Login POST *******************************************
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "email and password booth are require" });
    }

    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      res.status(400).json({ error: "invalid password" });
    } else {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // adding jwt token
      const token = jwt.sign(
        { user_id: User._id, email },
        process.env.private_key,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      User.token = token;
      // store jwt token in cookie
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        console.log("we are in not ismatch");
        res.status(400).json({ message: "invalid password" });
      } else {
        res.status(200).json({ message: "user login succesfully" });
      }
    }
  } catch (err) {
    console.log("error in signin auth");
    res.json(err);
  }
});

// ***************** forgetPass Storing OTP in DATABASE (POST)************************************
router.post("/forgetpass", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(400).json({ error: "email are require" });
    }

    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      const OtpCode = Math.floor(Math.random() * 10000 + 1);
      const OtpData = new Otp({
        email,
        otp: OtpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      await OtpData.save();

      try {
        const mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "jayram.bagal.it@ghrcem.raisoni.net",
            pass: "jayram@1234",
          },
        });
        const details = {
          from: "jayram.bagal.it@ghrcem.raisoni.net",
          to: email,
          subject: `Reset password OTP is ${OtpCode}`,
          text: `Your OTP(one time password) for resetting the password is ${OtpCode}`,
        };

        mailTransporter.sendMail(details, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("mail send successfully");
          }
        });
      } catch (err) {
        console.log("error in sending emale to email");
      }
      res.status(200).json({ success: "send opt done" });
    } else {
      res.status(400).json({ error: "email does not exists" });
    }
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

// ****************************** changing password **********************************************
router.post("/changepass", async (req, res) => {
  const data = await Otp.findOne({ email: req.body.email, otp: req.body.Otp });

  if (data) {
    const currentTime = new Date().getTime();
    const diff = data.expireIn - currentTime;

    if (diff < 0) {
      res.status(400).json({ message: "otp is expire" });
    } else {
      const user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      await user.save();
      res.status(200).json({ message: "reset password successfully" });
    }
  } else {
    res.status(400).json({ error: "invalid otp" });
  }
});

// ******************************* logout ****************************************************
router.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("user logout");
});

// ******************** adding middleware in /home  ***************************************
router.get("/home", Authenticate, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
