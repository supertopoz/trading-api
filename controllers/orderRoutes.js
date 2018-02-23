const express = require('express');
const ordersApiRoutes = express.Router();
const { orderModels } = require('../models/orderModels.js');
const { callAPIFunction } = require('./routeHelpers.js');

ordersApiRoutes.delete('/deleteall', (req, res) => { 
  callAPIFunction(orderModels.deleteAll, '', req, res);
});


ordersApiRoutes.post('/neworder', (req, res) => { 
  const order = req.body.data;
  callAPIFunction(orderModels.createNewOrder, order, req, res);
});

ordersApiRoutes.get('/getallonecompany', (req, res) => {
  const company = req.query.company;
  callAPIFunction(orderModels.getAllOneCompany, company, req, res)
  	
})

ordersApiRoutes.get('/getalloneaddress', (req, res) => {
  const address = req.query.address;
  callAPIFunction(orderModels.getAllOneAddress, address, req, res)
  	
})

ordersApiRoutes.delete('/deleteoneorder', (req, res) => {
  const orderId = req.query.orderId;
  callAPIFunction(orderModels.deleteOneOrder, orderId, req, res)
  	
})

ordersApiRoutes.get('/countallproducts', (req, res) => {
  const orderId = req.query.orderId;
  callAPIFunction(orderModels.countAllProducts, orderId, req, res)
})

ordersApiRoutes.get('/companypaidtotal', (req, res) => {

  const company = req.query.company;
  callAPIFunction(orderModels.companyPaidTotal, company, req, res)
})

ordersApiRoutes.get('/companyordereditem', (req, res) => {
  const item = req.query.item;
  callAPIFunction(orderModels.companyOrderedItem, item, req, res)
})




exports.ordersApiRoutes = ordersApiRoutes;