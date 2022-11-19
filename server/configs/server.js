// Dotenv config
const dotenv = require("dotenv");

const installServerConfigs = () => {
    dotenv.config();
}

module.exports = {
    installServerConfigs: installServerConfigs,
}