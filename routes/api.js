var express = require('express');
var router = express.Router();

var fs = require('fs');

var Element = require('../models/element');

/* Insert element data to database. */
router.get('/push', (req, res, next) => {
  var raw = fs.readFileSync('./test.json', 'utf-8')
  var parsed = JSON.parse(raw)
  var arr = []
  arr.push(parsed.test)
  Element.insertMany(arr[0])
    .then(docs => res.json({success: true, docs: docs}))
    .catch(error => res.json({success: false, error: error}))
});

/* element search route */
router.get('/element', (req, res, next) => {

    var querytype = null;
    var query = null;

    var field = req.query.field || null;
    var name = req.query.name || null;
    var group = req.query.group || null;
    var sign = req.query.sign || null;
    var period = req.query.period || null;
    var block = req.query.block || null;
    var atomno = req.query.atomno || null;

    querytype = name ?  'name' :
                    group ?  'group' :
                        sign ?  'sign' :
                            period ?  'period' :
                                block ?  'block' :
                                    atomno ?  'atomno' : null;
    
    query = querytype === 'name' ? name :
                querytype === 'group' ? group :
                    querytype === 'sign' ? sign :
                        querytype === 'period' ? period :
                            querytype === 'block' ? block :
                                querytype === 'atomno' ? atomno : null;

    
    if(querytype === null && query === null){
        res.json({success: false, msg: 'Wrong EndPoint'})
    }

    // TODO: database search is slow
    var waitTime = 2000;

    /* wait for database */
    setTimeout(() => {
        Element.search(querytype, query, field)
        .then(data => {
            res.json({
                success: true,
                data: data
            })
        })
        .catch(error => {
            res.json({
                success: false,
                error: error
            })
        })
    }, waitTime);
});

/* test search route */
router.get('/test', (req, res, next) => {
    var main = req.query.main|| "";
    var sub = req.query.sub || ""
    Element.find({name: req.query.name}, `${main}.${sub}`, (err, info) => {
        if(err) res.json({err: err})
        res.json({info: info})
    })
});

module.exports = router;