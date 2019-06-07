import isEmpty from "lodash/isEmpty";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
// import mailer from "@sendgrid/mail";
import { User, Season } from "models";
import { emailAlreadyTaken, invalidSeason } from "shared/authErrors";
import { createRandomToken } from "shared/helpers";
// import newUser from "emailTemplates/newUser";
// import config from "env";

// const env = process.env.NODE_ENV;
// const { portal } = config[env];

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((user, done) => {
//   User.findById(user.id, (err, existingUser) => {
//     done(err, existingUser);
//   });
// });

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // override username with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { firstName, lastName, season } = req.body;

      if (!email || !firstName || !lastName || !season) return done("Missing creation params.", done);

      const token = createRandomToken(); // a token used for email verification

      // check to see if the email is already in use

      try {
        const existingUser = await User.find({ email });
        if (!isEmpty(existingUser)) return done(emailAlreadyTaken, false);

        // find currently selected season
        const currentSeason = await Season.findOne({ season });
        if (!currentSeason) return done(invalidSeason, false);

        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12);
        // create new user
        const newUser = await User.createUser({
          ...req.body,
          password: newPassword,
          token,
        });

        // add user to selected season
        await Season.addUser(currentSeason._id, newUser._id);

        // creates an email template for a new user signup
        // const msg = {
        //   to: `${email}`,
        //   from: "helpdesk@subskribble.com",
        //   subject: "Please verify your email address",
        //   html: newUser(portal, firstName, lastName, token),
        // };

        // // attempts to send a verification email to newly created user
        // await mailer.send(msg);

        return done(null, newUser.email);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport.authenticate("local-signup", { session: false });
