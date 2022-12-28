const express=require("express");
const app=express();
var bodyParser = require('body-parser');
const path=require("path");
const port=3000;
const fs=require("fs");
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/RestaurantWebsite')



// Define Mongoose Schema
// this is the way to store the front end Information to database 
var bookschema= new mongoose.Schema({
    names:String,
    email:String,
    time:String,
    code:String
})
var join =mongoose.model('booking',bookschema)




app.use(express.static("public"));



app.get('/', (req, res) => {
    console.log(path.join(__dirname, 'public'))
    return res.sendFile('public/index.html', { root: __dirname });
  })
 



//ENDPOINT
app.get("/book", (req,res)=>{
    res.status(200).render("public/book.html");
})
app.get("/about", (req,res)=>{
    res.status(200).render("public/about.html");
})
app.get("/contact", (req,res)=>{
    res.status(200).render("public/contact.html");
})
app.get("/contact", (req,res)=>{
    res.status(200).render("public/menu.html");
})
app.post("/join", (req,res) =>{
    var myData =new join(req.body);
    myData.save().then(()=>{
        res.send("This data has been save in database")
    }).catch(()=>{
        res.status(400).send("The data has not been saved")
    })
})



// STARTING THE SEVER
app.listen(port, ()=>{
    console.log(`Listening on port ${port} - http://localhost:3000`)
});