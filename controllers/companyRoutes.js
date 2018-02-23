const express = require('express');
const companyApiRoutes = express.Router();
const { companyModels } = require('../models/companyModels.js');
const { callAPIFunction } = require('./routeHelpers.js');

companyApiRoutes.delete('/deleteall', (req, res) => {
 callAPIFunction(companyModels.deleteAll, '', req, res);
});

companyApiRoutes.post('/newcompany', (req, res) => {
 const company = req.body.data;
 callAPIFunction(companyModels.createNewCompany, company, req, res);
});

companyApiRoutes.get('/getallcompany', (req, res) => { 
  callAPIFunction(companyModels.getAllCompany, "", req, res);
});

companyApiRoutes.post('/updatecompany', (req, res) => { 
  const company = req.body.data;
  callAPIFunction(companyModels.updateCompany, company, req, res);
});

companyApiRoutes.delete('/deletecompany', (req, res) => { 
  const companyName = req.query.company;
  callAPIFunction(companyModels.deleteCompany, companyName, req, res);
});

exports.companyApiRoutes = companyApiRoutes;	  