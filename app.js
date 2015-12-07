var express = require('express');
var cors = require('cors')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var async = require('async');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/genderize1');


var routes = require('./routes/index');
//var api = require('./routes/api');

var app = express();


// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


/*app.post('/genderize', function(req, res) {
    //req.body contiene tutto il json
    //req.body.data contiene i dati
    //Con JSON.stringify ottengo il json in stringa

    var addMaschi = (function () {
        counter_m = 0;
        return function () { return counter_m +=1 ;}
    })();

    counter_f = 0;
    counter_u = 0;

    console.log('HO RICEVUTO UNA POST REQUEST');
    //console.log('REQ.BODY: '+JSON.stringify(req.body));

    //res.send("Ho ricevuto la richiesta, ancora non ti ho mandato indietro il JSON");
    
    //console.log(data);
    for(var i=0; i<req.body.data.length; i++) {
        
        var n = req.body.data[i].name.split(" ")[0].toUpperCase();
        //console.log(JSON.stringify(n));

        db.get('nomi').find({nome: n}, function(err, doc){
            var result = JSON.parse(JSON.stringify(doc));
            if(typeof result[0] != 'undefined'){
                //console.log(result[0].sesso);
                if (result[0].sesso == "M") {
                    //console.log("Ho trovato un uomo");
                    return addMaschi();

                } else {
                    //console.log("Ho trovato una donna");
                    return counter_f+=1;
                }
            } else {
                //console.log("Non ho trovato il nome in database");
                return counter_u+=1;
            }
        });
            console.log("Uomini: "+counter_m+" - Donne: "+counter_f+" - Unknown: "+counter_u);

    };
    //var collection = db.get('nomi');
    //var arg = req.query.nome.toUpperCase();
    //collection.find( { nome : arg } , { _id:0 , nome:0} , function(e,docs){
    //    res.json(docs[0]);
    //});
});*/

app.post('/genderize', function(req, res) {

    var myJsonString = ( function(){
    	JSON.stringify( function () { 
	    	// [ #maschi, #femmine, #unknown ]
	    	results = [];
	    	for(i in req.body.data){
	    		var collection = db.get('nomi');
	    		collection.find({ nome : req.body.data[i].name.split(" ")[0].toUpperCase() }, { fields: {_id:0, nome:0}}, function (err, docs) {
	    			console.log("STEP3");
	    			if (!isEmptyObject(docs)) {
	    				docs = JSON.parse(JSON.stringify(docs));
	    				console.log("STEP4");
	    				console.log(docs[0]);
	    				console.log("STEP5");
	    				if(docs[0].sesso == "M"){ 					
	    					results[0] += 1;
	    				} else {
	    					results[1] += 1;
	    				}
	    			} else {
	    				results[2] += 1;
	    			}
	    		});
	    	};
	    	return results;
    	});
    });
    
    res.json(myJsonString());
});

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;