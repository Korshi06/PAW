var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let returning_json = {
    "ok": "ok"
  };
  let stringified = JSON.stringify(returning_json);

  res.render('json', {stringified});
});

module.exports = router;
