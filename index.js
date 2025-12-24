require('dotenv').config({quiet: true});
const path = require("path");
const express = require('express');

const { connectDB } = require('./config/db.config.js');
const rootRoutes = require('./routes/root.routes.js');
const userRoutes = require('./routes/user.routes.js');
const { checkForAuthentication, restrictTo } = require('./middleware/auth.middleware.js');

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

connectDB(connectionString)
    .then(() => console.log('MongoDB Connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkForAuthentication);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/', rootRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})
