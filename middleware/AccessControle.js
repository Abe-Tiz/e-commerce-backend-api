const { Ability, AbilityBuilder } = require("@casl/ability");

const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role === "admin") {
    can("manage", "Product"); 
  } else {
    can("read", "Product"); 
    can("create", "Order"); 
  }
  return new Ability(rules);
};

module.exports = { defineAbilitiesFor };
