var express = require('express');
const {getData} = require("../DBoperations");
var router = express.Router();


router.get('/contact-messages', async function (req, res, next) {
    const {getAllData} = require('../DBoperations');

    try {
        const allMessages = await getAllData();

        res.json(allMessages);
    } catch (e) {
        console.log(e);
        throw e;
    }
});

router.get('/contact-messages/:id', async function (req, res, next) {
    const {id} = req.params;
    const {getData} = require('../DBoperations');

    try{
        const message = await getData(id);
        res.json(message);
    }
    catch (e){
        console.log(e);
        throw e;
    }

})


module.exports = router;
