var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors=require('cors');
const { execSync } = require("child_process");
var PDFDocument=require('pdfkit')
var fs= require('fs')
const mongoose = require('mongoose');

const uri = "mongodb+srv://cojo:student@cluster0.osyldly.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/scan',(req,res)=>{
    console.log(req.body)
    listOfScans=req.body.listOfScans
    let texts=[]
    // check if networkDiscovery is in the list of scans
    if(listOfScans.includes("networkDiscovery")){
        console.log("networkDiscovery is in the list of scans")
        let  stdout=execSync("ls");
        texts.push(stdout)
        console.log(stdout)
    }
    // check if backdoorDetection is in the list of scans
    if(listOfScans.includes("backdoorDetection")){
        console.log("backdoorDetection is in the list of scans")
        let  stdout=execSync("ls");
        texts.push(stdout)
        console.log(stdout)
    }
    // check if vulnerabilityScan is in the list of scans
    if(listOfScans.includes("vulnerabilityScan")){
        console.log("vulnerabilityScan is in the list of scans")
        let  stdout=execSync("ls");
        let texts=[]
        console.log(stdout)
    }
    // join all the texts
    let text=texts.join("\n")
    const doc = new PDFDocument();
    // take date as string
    let date=new Date().toString()
    // title
    let title="public/"+date+".pdf"
    doc.pipe(fs.createWriteStream(title));
    doc
   
  .fontSize(27)
  .text('Report: '+date+"\n", 100, 100)
  doc.fontSize(15)
    .text(text, 100, 150);
  
    res.send(date+".pdf")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
