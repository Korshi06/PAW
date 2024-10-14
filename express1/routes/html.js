var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var html = "   <!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "  <head>\n" +
    "    <title>HTML</title>\n" +
    "    <link rel='stylesheet' href='/stylesheets/style.css' />\n" +
    "  </head>\n" +
    "  <body>\n" +
    "    <h1>HTML</h1>\n" +
    "  </body>\n" +
    "</html>\n  "

    res.set('Content-Type', 'text/plain');
    res.send(html);
});

module.exports = router;
