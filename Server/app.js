const express = require('express');
// const session =require('express-session')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./DB/mongoDB');
const userRoute = require('./Routes/user.route');
const prodRoute = require('./Routes/product.route');

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true
}).then(()=> console.log('Connection To DB Established'))
.catch((error) => console.log(error));
// mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/' ,userRoute);
app.use('/' ,prodRoute);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});