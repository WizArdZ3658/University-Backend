var http = require('http')
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var url1 = process.env.MONGODB_UNIVERSITY_PROJECT;
var dbname = "university";

const server = http.createServer((req, res) => {
    const headers = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    var q = url.parse(req.url, true);
    var qdata = q.query;

    if (q.pathname === '/api/colleges') {
        MongoClient.connect(url1, (err, db) => {
            if (err) {
                throw err;
            }
            var dbo = db.db(dbname);
            dbo.collection("colleges").find({}).toArray((err, result) => {
                if (err) {
                    throw err;
                }

                res.writeHead(200, headers);
                res.end(JSON.stringify(result));
            });
        });
    }
    else if (q.pathname === '/api/students') {

        MongoClient.connect(url1, (err, db) => {
            if (err) {
                throw err;
            }
            var dbo = db.db(dbname);
            var query;
            
            if (qdata.collegeid) {
                query = { college_id: parseInt(qdata.collegeid) };
            }
            else {
                query = {};
            }


            dbo.collection("students").find(query).toArray((err, result) => {
                if (err) {
                    throw err;
                }

                res.writeHead(200, headers);
                res.end(JSON.stringify(result));
            });
        });
    }


});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server running"));
