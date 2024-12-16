var express = require('express');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');


router.get('*', function(req, res, next) {

    var path = require('path');
    let filePath = path.join(__dirname, '../assets/' + req.url.substring(1) );


    if (fs.existsSync(filePath)) {
        res.set('content-type', mime.getType(filePath));
        res.sendFile(filePath);
    }
    else{
        res.status(404).json({ error: 'Not Found' });
        res.end();
    }



});

module.exports = router;
