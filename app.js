//npm install body-parser, npm install express  
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const { Server } = require("http");
const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index1.html");
})

app.post("/",(req,res)=>{
    console.log("Post recieved is : " + req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "7d1290c1ffce6bb8dd3f7818d081bc66";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        var date = new Date();
        console.log(response.statusCode);
        response.on("data",function (data){
            //console.log(data);
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
           // console.log(temperature);
            console.log(description);
            const icon = weatherData.weather[0].icon;
            //console.log(icon);
            const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            // res.write('<head><meta charset="utf-8"></head>');
            // res.write("<img src =" + imgUrl + ">");
            //Above head meta line is written if img src has to be at top
            // res.write("<p>The weather is currently " + description+".</p>");
            // res.write("<h1>The temperature in "+ query+" is " + temperature + " degrees celcius.</h1>"); 
            // res.write("<img src =" + imgUrl + ">");
            // res.send()
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const month_val = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            res.render("test1.ejs",{
                cityName:query,
                day:days[date.getDay()],
                cur_date:date.getDate(),
                month:month_val[date.getMonth()],
                year:date.getFullYear(),
                Temperature:temperature,
                des:description,
                Url:imgUrl
            })
            })
    })
    // res.send("Server is up and running");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
