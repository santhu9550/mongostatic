require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");


const app = express();
// Bodyparser middleware
app.use(express.json({extended:false}));

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));



// Routes
app.use("/api", require("./routes/campaign"));

app.get("/",(req,res) => res.send("Server Working"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));