const express = require("express");
const {connectDB} = require("./config");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
const routes=require("./routes/auth");
const addHabits = require("./routes/addHabit");

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true 
};
app.use(cors(corsOption));

// mongodb
connectDB();

//middleware
app.use(express.json());

// routes
app.use("/api",routes);
app.use("/api",addHabits);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




