const {connect} = require('mongoose');

async function connectDB(connectionString) {
    return connect(connectionString);
}

module.exports = {connectDB};