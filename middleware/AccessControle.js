const { Ability, AbilityBuilder } = require("@casl/ability");

const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role === "admin") {
    can("manage", "Product"); 
  } else {
    can("read", "Product"); 
  }
  return new Ability(rules);
};

module.exports = { defineAbilitiesFor };
