const { defineAbilitiesFor } = require("./AccessControle");

 

const checkAbility = (action, subject) => {
  return (req, res, next) => {
    console.log("user",req.user)
    const ability = defineAbilitiesFor(req.user); 

    if (!ability.can(action, subject)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    next();
  };
};

module.exports = { checkAbility };
