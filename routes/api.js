var express = require('express');
var router = express.Router();

var fs = require('fs');


var Element = require('../models/element');

/* dump test data to db. */
// router.get('/push', (req, res, next) => {
//   var raw = fs.readFileSync('./test.json', 'utf-8')
//   var parsed = JSON.parse(raw)
//   var arr = []
//   arr.push(parsed.test)
//   console.log(typeof parsed.test)
//   Element.insertMany(arr[0], (err, docs) => {
//       if(err) res.json({err: err})
//       res.json({docs: docs})
//   })
// })

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

    console.log(req.query)
    console.log(query, querytype)

    
    if(querytype === null && query === null){
        res.json({success: false, msg: 'Wrong EndPoint'})
    }

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
    }, 200)
})

router.get('/test', (req, res, next) => {
    var main = req.query.main|| "";
    var sub = req.query.sub || ""
    Element.find({name: req.query.name}, `${main}.${sub}`, (err, info) => {
        if(err) res.json({err: err})
        res.json({info: info})
    })
})

module.exports = router;