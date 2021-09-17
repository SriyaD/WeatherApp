const express = require("express");
const https = require("https"); //no need to innstall http module. It is a native node module.
const app = express();

//body pareser allows us to go through the data that the usrer submitted
const bodyParser =  require("body-parser");
//necessary code for us to be able to parse through the body of the post requset
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    // console.log(req.body.cityname);
    // console.log("Post received");
    const query=req.body.cityname;
    const apiKey="your api key"; //removed due to security reasons
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+ apiKey +"&units="+unit;
    //make a http get rquest to get data from world wide web(here weather api) weather api
    https.get(url,function(response){
    // console.log(response.statusCode);//like 201 404 etc

    response.on("data",function(data) {//used to send a response when user requests on our server
    const weatherdata=JSON.parse(data); // the data that the server(of api) sends to us .that data we are parsing and converting into js object
    const temperature=weatherdata.main.temp;  // from the data obtained we tap into the attributes like temperature,description etc..
    // console.log(temperature);                // and then console log our requires featues
    const description=weatherdata.weather[0].description;
    // console.log(description);
    const icon=weatherdata.weather[0].icon;
    const imageurl="http://openweathermap.org/img/wn/"+ icon+"@2x.png";
    const city=

    //now send our responseto the client(browser)  that asked inf from our server
    res.write("<p>The weather is currently "+description+"<p>");
    res.write("<h1>The temperature in " + query + " is "+temperature+" degree celsius</h1>")
    res.write("<img src=" + imageurl +">");
    res.send()
        });
    });
});


app.listen(3000,function(){
  console.log("Server running on port 3000");
})
