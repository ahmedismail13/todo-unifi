const passport = require("passport");

require("../Start/passport");

module.exports = async function (req, res, next) {
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log(info);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
