var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* database schema */
var elementSchema = new Schema({
    name: String,
    image: String,
    sign: String,
    atomicweigth: Number,
    appearance: String,
    general:{},
    physical: {},
    atomic: {},
    misc: {},
    history: {},
    isotopes: []
});

/* database model */
var Element = mongoose.model('Element', elementSchema);

module.exports = Element;

/**
 * Fix for lowercase entries
 * @param {string} name 
 * @returns {string}
 */
var formatIt = string => (string.slice(0,1).toUpperCase()) + (string.slice(1,));

/**
 * Element search logic
 * @param {string} querytype search type
 * @param {string} query searched string
 * @param {string} field searched individual field
 */
module.exports.search = (querytype='name', query, field) => {
    console.log(querytype, query, field)
    if(querytype === 'name') query = formatIt(query)
    if(querytype === 'sign') query = formatIt(query)
    return new Promise((resolve, reject) => {
        switch(querytype){
            case 'name':
                if(field !== null){
                    Element.find({ name : query}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({ name : query})
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }
            case 'group':
                if(field !== null){
                    Element.find({ 'general.group' : parseInt(query)}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({ 'general.group' : parseInt(query)})
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }
            case 'sign':
                if(field !== null){
                    Element.find({ sign: query}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({ sign : query})
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }
            case 'period':
                if(field !== null){
                    Element.find({'general.period': parseInt(query)}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({'general.period': parseInt(query)})
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }
            case 'block':
                if(field !== null){
                    Element.find({ 'general.block' : `${query}-block`}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({ 'general.block' : `${query}-block`})
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }
            case 'atomno':
                if(field !== null){
                    Element.find({ 'general.atomno' : parseInt(query)}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({ 'general.atomno' : parseInt(query)})
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }
        }
    });
}