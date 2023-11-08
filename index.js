// Constants

const express = require("express")
const app = express()
const env = require("dotenv").config()
const path = require('path');
// Third Party Module
const cors = require("cors")
const mongoose = require("mongoose")
const port = process.env.PORT || 8080
const route = require("./routes/route")
const errorHandler = require("./middleware/errorhandler")
// deployment
__dirname = path.resolve();
if ("production" === 'production') {
    app.use(express.static('build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//custom made middleware
app.use("/v1/api", route)
app.use(errorHandler)


//server and mongodb connect
mongoose.connect("mongodb+srv://gvverma:abcabcabc@cluster0.m2f0yjy.mongodb.net/").then(() => {
    app.listen(port, () => {
        console.log(`port is running on ${port}`)
    })
    console.log("monogdb is connected")
}).catch((err) => {
    console.log(err)
})




