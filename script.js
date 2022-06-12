var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("<h1>Hello world</h1>");
});

app.get("/name/:name", function(req, res){
   var name = req.params.name;
   res.send("<h1>Hello " + name +"</h1>");
});
app.get("/search", function(req,res){
   
    res.redirect('http://google.com');
})
app.get("/search/:search", function(req,res){
   var searchvalue = req.params.search;
    res.redirect('https://google.com/search?q=' + searchvalue);
})

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
