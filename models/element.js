var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Element = mongoose.model('Element', elementSchema);

module.exports = Element;

var formatIt = name => (name.slice(0,1).toUpperCase()) + (name.slice(1,));

module.exports.search = (querytype='name', query, field) => {
    console.log(field)
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
                    Element.find({ group : query}, `${field}`)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                }else{
                    Element.find({ group : query})
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

{

}