var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req, res, next) {
    let queryParams = req.query;
    let json_content = {};

    for (let x in queryParams) {
        if (queryParams.hasOwnProperty(x)) {
            json_content[x] = queryParams[x];
        }
    }


    fs.writeFile('params.json', JSON.stringify(json_content, null, 2), (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ ok: 'ok' });
        }
    });
});

module.exports = router;
