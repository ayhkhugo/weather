
/*
 * GET users listing.
 */
var mongoose = require("mongoose");
mongoose.connect('mongodb://ayhkhugo:Abcd1234@ds023634.mlab.com:23634/305codesample', function(err){
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    updated_at: {type:Date, default: Date.now},
});

var Todo = mongoose.model('users', usersSchema);

exports.search_tmp = function(req, res){
  res.render('search', { value: '' });
};

exports.registration = function(req, res){
  res.render('registration', { value: '' });
};

exports.registry = function(req,res){
    Todo.create({
       username: req.body.username,
       password: req.body.password,
       email: req.body.email
    }, function(err,todo){
        if(err) {
            res.render('result', {result : err});
            
        }else{
            res.redirect("/search");
            
        };
    });   
};


exports.login_temp = function(req, res){
  res.render('login', { title: 'Login' });
};


exports.login = function(req, res){
  Todo.count({username:req.body.username, password: req.body.password}, function(err, doc){
    if(doc == 0){
        res.redirect("/login");
    }else{
        res.redirect("/search");
    }
  })
};