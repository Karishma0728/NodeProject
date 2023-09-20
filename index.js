const express = require('express');
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const cors= require('cors');
const path = require('path');
const cookiePars = require('cookie-parser');

dotenv.config();

const mongoose = require("mongoose");
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB successfully connected!!")).catch(
    (err)=>{
        console.log(err);
    }
)

app.set("view engine",'ejs');
app.use(express.json());
app.use(cookiePars());

app.use("/auth/", authRoute);

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home'); // Assuming EJS file names match routes (e.g., '/login' maps to 'login.ejs')
});

app.get('/login', (req, res) => {
    res.render('login'); // Assuming EJS file names match routes (e.g., '/login' maps to 'login.ejs')
});
app.get('/signup', (req, res) => {
    res.render('signup'); // Assuming EJS file names match routes (e.g., '/login' maps to 'login.ejs')
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running!!!!");
})