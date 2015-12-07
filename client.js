var doc =  {
  'data': [
    {
      'id': '1381570368829917',
      'name': 'Mauro LABORATORIO'
    },
    {
      'id': '341111819414677',
      'name': 'Piero SEMINARIO'
    },
    {
      'id': '1697072347191096',
      'name': 'Carlo ROMA'
    },
    {
      'id': '1631474397125909',
      'name': 'Giovanna ROMA'
    },
    {
      'id': '1669912926572873',
      'name': 'Filippa 13'
    },
    {
      'id': '456178171227907',
      'name': 'Carla TUTTI'
    },
    {
      'id': '728991950561935',
      'name': 'Gianna live'
    },
    {
      'id': '1051062348260899',
      'name': 'Enza ROMA'
    },
    {
      'id': '1686644478237183',
      'name': 'SWINGINTOWN Bologna'
    },
    {
      'id': '1488430701459521',
      'name': 'MOTORSHOW Bologna'
    },
    {
      'id': '1503932416571781',
      'name': 'Franco mauro'
    },
    {
      'id': '1452470588390200',
      'name': 'Giorgia BRUEGHEL'
    },
    {
      'id': '1591264901143464',
      'name': 'LUMIERA Venerdì'
    },
    {
      'id': '1171049602909085',
      'name': 'UFOMAMMUT 2015'
    },
    {
      'id': '1475357019448262',
      'name': 'Ludovico Einaudi'
    }
  ],
  'paging': {
    'cursors': {
      'before': 'MAZDZD',
      'after': 'MjQZD'
    },
    'next': 'https://graph.facebook.com/v2.5/search?access_token=CAACEdEose0cBABxoykfWdANwOy0qonYCMqGB7su4IqtSmIHZCm0cD16abvHJdLRq88NQjdlEGCFXqIRpsMgPq3UEjOn037zu6BCaVpU3ESbzIb4XA6mxXZCkCTL7xoZCnO5rZAcVRnbnPegTKNaH91EkyRGinZA0XTuZCei1jdZCTWLaoB1jkTovuiarqZBXemTgZA7GtIZAZAMGoHqNq2ZBbnL0&pretty=0&fields=id%2Cname%2Cend_time&q=Bologna&type=event&limit=25&after=MjQZD'
  }
};

var request = require('request');
//make the request object
request({
    url: "http://localhost:3000/genderize",
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: doc
}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else {

            console.log("error: " + error)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusText)
        }
    });

