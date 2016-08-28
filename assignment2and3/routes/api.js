
/*
 * GET users listing.
 */
var dateFormat = require('dateformat');
var request = require('request');
var sync = require('sync-request'); 
var mongooseapi = require("mongoose");
mongooseapi.connect('mongodb://ayhkhugo:Abcd1234@ds023634.mlab.com:23634/305codesample', function(err){
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var searchSchema = new mongooseapi.Schema({
    search: String,
    data: Object,
    updated_at: String,
});

var Do = mongooseapi.model('searches', searchSchema);




var callback = function(err, data){
    if(err) return console.error(err);
    else console.logh(data);
}

exports.api = function(req, res){
    var today = new Date();
    var result = Do.find({search:req.query.search, updated_at: dateFormat(today, 'yyyy-mm-dd')}, function(err, doc){
     
    if(doc == ''){
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=5&APPID=a20c73d4877bdcee4bd9f6df0421b8a3&q=';
        var res2 = sync('GET', url+req.query.search);
        var data = JSON.parse(res2.getBody().toString('utf8'));

        Do.create({
               search: req.query.search,
               data: data,
               updated_at: dateFormat(today, 'yyyy-mm-dd')
            }, function(err,todo){
                if(err) {
                    res.render('result', {result : err});
                }else{
                    res.header('Content-type','application/json');
                    res.header('Charset','utf8');
                    res.jsonp(data.list);
                    //console.log(data);
                
            };
        }); 
    }else{
        if(doc.length >0){
            res.header('Content-type','application/json');
            res.header('Charset','utf8');
            res.jsonp(doc[0].data.list);
            console.log(req.query.search);
        }else{
            res.send('Error : data not found');
        }
    }
  })
};