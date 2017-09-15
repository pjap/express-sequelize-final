const express = require('express')
const route = express.Router()
const models = require('../models')


// READ DATA TABLE FROM SUBJECT
// route.get('/', function(req,res) {
//   models.Subject.findAll({
//     include: [
//       {
//         model: models.Teacher
//       }
//     ]
//   })
//   .then(subjects => {
//     //res.send(subjects)
//     res.render('subjects', {data: subjects, pageTitle: 'Express Sequelize'})
//   })
//   .catch(err => {
//     res.send(err)
//   })
// })


//READ DATA TABLE FROM SUBJECT
route.get('/', function(req,res) {
  models.Item.findAll()
  .then(dataItems => {
    res.render('items', {dtItem: dataItems})
  })
  .catch(err => {
    res.send(err)
  })
})

// CREATE DATA
route.get('/addItems/', function(req,res) {
  models.Item.findAll()
  .then(items => {
    res.render('addItems')
  })
  .catch(err => {
    res.send(err)
  })
})

// CREATE DATA TABLE FROM SUBJECT
route.post('/addItems', function(req,res) {
  models.Item.build({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .save()
  .then(items => {
    res.redirect('/items')
  })
})

// DELETE DATA TABLE FROM SUBJECT
route.get('/delete/:id', function(req,res) {
  models.Item.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/items')
  })
})

// EDIT DATA TABLE FROM MODULE SUBJECTS
route.get('/edit/:id', function(req,res) {
  models.Item.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(dataItem => {
    res.render('editItems', {dtItem: dataItem[0]})
  })
})

route.post('/edit/:id', function(req,res) {
  models.Item.update(
    {
      name: req.body.name
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(dataItem =>
    res.redirect('/items')
  )
})


module.exports = route
