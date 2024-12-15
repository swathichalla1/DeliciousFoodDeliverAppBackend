const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser")
const UserRoutes = require("./Routes/UserRoutes")
const ItemRoutes = require("./Routes/ItemRoutes")
const app = express();
const port = process.env.PORT||4005;

app.listen(port, () => {
    console.log(`The server has started at ${port}`);
});
app.use(bodyParser.json())
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
 app.use(express.json());

dotEnv.config();

// Connect to MongoDB
mongoose.connect(process.env.mongo_url)
    .then(() => {
        console.log("MongoDB connected successfully for delicious project");
    })
    .catch((e) => {
        console.log(`There is some error in connecting MongoDB to delicious project. Error: ${e}`);
    });

app.use('/user',UserRoutes)
app.use('/item',ItemRoutes)
