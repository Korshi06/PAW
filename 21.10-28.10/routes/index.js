var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Strona Główna'});
});

router.get('/o-nas', function(req, res, next) {

  res.render('o-nas', { title: 'O nas' });
});

router.get('/oferta', function(req, res, next) {

  res.render('oferta', { title: 'Oferta'});
});

router.get('/kontakt', function(req, res, next) {

  res.render('kontakt', { title: 'Kontakt' });
});


router.post('/wyslano', function(req, res, next) {
  var { firstName, lastName, email, message } = req.body;

  const {insertData} = require('../DBoperations');

  try{
    insertData(firstName, lastName, email, message);
  }
  catch(e){
    console.log(e);
    throw e;
  }

  res.render('index', { title: 'Strona Główna'});
});


module.exports = router;
