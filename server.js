const express= require('express');
const hbs= require('hbs')
const fs = require('fs')

const app = express();
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{return new Date().getFullYear()})

app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('serverlog.txt',log+'\n',(err)=>{
        if(err){
            console.log(`Cannot log data to file`)
        }
        
    })
    next()
})

// app.use((req,res,next)=>{
//     res.render('maintain.hbs')
// })

app.get('/',(req,res)=>{
    res.render('index.hbs',{
        pageHeading:`Home page`,
        welcomeMessage:`Welcome to this website`
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageHeading:`About page`
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        error:444,
        message:'Cannot find what is '
    })
})

app.listen(3000,()=>{
    console.log(`The server is running on port 3000`)
})