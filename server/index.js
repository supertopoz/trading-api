const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const { ordersApiRoutes } = require('../controllers/orderRoutes.js')
const { companyApiRoutes } = require('../controllers/companyRoutes.js')
const db = require('../models/db.js')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }));

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */
app.use('/ordersapi', ordersApiRoutes);
app.use('/companyapi', companyApiRoutes);

app.get('*', (req, res) => res.send('Missed All Routes!'))

app.listen(3000, () => console.log('listening on port 3000!'))