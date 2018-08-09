var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db;
var url = "mongodb://localhost:27017/";

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.post('/ReceiveJSON', function (req, res) {
  res.send("ok");
});

MongoClient.connect(url, { useNewUrlParser: true }, function (err, dbo) {
  if (err) throw err;

  db = dbo.db("app");

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

//------------------------------------------------------------------------users links:

app.post('/login', function (req, res) { //login link that checks the username and the password with the database
  db.collection("users").find({ username: req.body.username, password: req.body.password }).toArray(function (err, result) {
    if (err)
      res.status(500).send();
    else
      res.send(result);
  });
});

app.post('/user', function (req, res) { //get the user with a specific id
  var myId = JSON.parse(req.body.id);
  db.collection("users").find({ _id: ObjectId(myId) }).toArray(function (err, result) {
    if (err) throw err;
    res.send(result);
  })
});

app.get('/users', function (req, res) { //get users with search or with id or all users
  if (req.query.id !== undefined) {
    db.collection("users").find({ _id: ObjectId(req.query.id) }).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  } else if (req.query.search !== undefined) {
    db.collection("users").find({ $text: { $search: req.query.search }, }).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    })
  }
  else {
    db.collection("users").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  }
});

app.post("/addUser", function (req, res) { // adding a user link
  db.collection("users").insertOne(req.body.user, function (err, result) {
    if (err) {
      res.status(500).send();
    } else {
      res.send("success");
    }
  });
});

app.post("/editUser", function (req, res) { //editting a user link
  db.collection("users").updateOne({ _id: ObjectId(req.body.user._id) }, { $set: {name: req.body.user.name,username: req.body.user.username,password: req.body.user.password,premiumAccess : req.body.user.premiumAccess,userAccess:req.body.user.userAccess }}, function (err, result) {
    if (err) {
      res.status(500).send();
    } else {
      res.send("success");
    }
  });
});

app.delete("/deleteUser", function (req, res) {//deleting a user link
  db.collection("users").deleteOne({ _id: ObjectId(req.query.id) }, function (err, result) {
    if (err) res.status(500).send();
    else res.send("success");
  });
});



//-----------------------------------------videos links: 

app.get('/videos', function (req, res) {
  if (req.query.id !== undefined) {
    db.collection("videos").find({ _id: ObjectId(req.query.id) ,isPremium : false}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  } else if (req.query.search !== undefined) {
    db.collection("videos").find({ $text: { $search: req.query.search }, isPremium : false}).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    })
  }
  else {
    db.collection("videos").find({isPremium : false}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  }
});

app.post("/addVideo", function (req, res) {
  req.body.video.isPremium = false;
  db.collection("videos").insertOne(req.body.video, function (err, result) {
    if (err) {
      res.status(500).send();
    } else {
      res.send("success");
    }
  });
});

app.post("/editVideo", function (req, res) {
  db.collection("videos").updateOne({ _id: ObjectId(req.body.video._id) }, { $set: {title: req.body.video.title,director: req.body.video.director,actors: req.body.video.actors,duration : req.body.video.duration}}, function (err, result) {
    if (err) {
      res.status(500).send();
    } else {
      res.send("success");
    }
  });
});

app.delete("/deleteVideo", function (req, res) {
  db.collection("videos").deleteOne({ _id: ObjectId(req.query.id) }, function (err, result) {
    if (err) res.status(500).send();
    else res.send("success");
  });
});

//------------------------------------ premium links:

app.get('/premiums', function (req, res) {
  if (req.query.id !== undefined) {
    db.collection("videos").find({ _id: ObjectId(req.query.id) ,isPremium : true}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  } else if (req.query.search !== undefined) {
    db.collection("videos").find({ $text: { $search: req.query.search }, isPremium : true}).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    })
  }
  else {
    db.collection("videos").find({isPremium : true}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  }
});

app.post("/addPremium", function (req, res) {
  req.body.video.isPremium = true;
  console.log(req.body.video);
  db.collection("videos").insertOne(req.body.video, function (err, result) {
    if (err) {
      res.status(500).send();
    } else {
      res.send("success");
    }
  });
});