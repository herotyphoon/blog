const bcrypt = require("bcrypt");
saltRounds = process.env.SALT_ROUNDS;

async function hashPassword(password, saltRounds) {

    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hash(password, salt);

    return hash;
}

module.exports = {hashPassword};
