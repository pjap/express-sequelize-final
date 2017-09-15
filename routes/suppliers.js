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
  models.Suppliers.findAll()
  .then(dataSupplier => {
    res.render('suppliers', {dtSupplier: dataSupplier})
  })
  .catch(err => {
    res.send(err)
  })
})

// CREATE DATA
route.get('/addSuppliers/', function(req,res) {
  models.Suppliers.findAll()
  .then(suppliers => {
    res.render('addSuppliers')
  })
  .catch(err => {
    res.send(err)
  })
})

// CREATE DATA TABLE FROM SUBJECT
route.post('/addSuppliers', function(req,res) {
  models.Suppliers.build({
    name: req.body.name,
    kota: req.body.kota,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .save()
  .then(dataSupplier => {
    res.redirect('/suppliers')
  })
})

// DELETE DATA TABLE FROM SUBJECT
route.get('/delete/:id', function(req,res) {
  models.Suppliers.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/suppliers')
  })
})

// EDIT DATA TABLE FROM MODULE SUBJECTS
route.get('/edit/:id', function(req,res) {
  models.Suppliers.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(dataSupplier => {
    res.render('editSuppliers', {dtSupplier: dataSupplier[0]})
  })
})

route.post('/edit/:id', function(req,res) {
  models.Suppliers.update(
    {
      name: req.body.name,
      kota: req.body.kota
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(dataSupplier =>
    res.redirect('/suppliers')
  )
})


module.exports = route
