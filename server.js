////////// Node.JS INITIALIZATION //////////////

var express   = require('express')
  , bodyParser = require('body-parser')
  , Sequelize = require('sequelize')
  , http      = require('http')
  , restful   = require('sequelize-restful')
  , sequelize = new Sequelize('test', 'root', 'password', {
            logging: console.log,
            define: {
                timestamps: false
            }
        })
  , app       = express();

var port = process.env.PORT || 3000;
app.use(bodyParser());
////////////////////////////////////////////////

/////////// MODELS DEFINITIONS /////////////////

// User model definition
var User = sequelize.define('users', {
        name: Sequelize.STRING,
        password: Sequelize.STRING
    }
);

// Project model definition
var Project = sequelize.define('projects', {
        name: Sequelize.STRING
    }
);

// Relationship definition
User.hasMany(Project, {foreignKey: 'user_id' });
///////////////////////////////////////////////

/////////// MAGICAL PIECE OF CODE /////////////
app.use(restful(sequelize));
///////////////////////////////////////////////

/////////// LAUNCH THE SERVER /////////////////
app.listen(port);
console.log('Magic happens on port ' + port);
////////////////////////////////////////////////
