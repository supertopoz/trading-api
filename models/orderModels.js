//const db = require('../server/db.js')
const { databaseResponder } = require('./modelHelper.js')

module.exports.orderModels = {

  deleteAll: () =>{
    const sql = `DELETE FROM orders`;
    return databaseResponder(sql)
  },

  createNewOrder: (order) => {
    const sql = `INSERT INTO orders (order_id, company_name, customer_address, ordered_item, price, currency)` + 
    ` VALUES ("${order.orderId}","${order.companyName}","${order.customerAddress}","${order.orderItem}","${order.price}","${order.currency}")`;    
    return databaseResponder(sql)
  },

  getAllOneCompany: (company) => {   
    const sql = `SELECT * FROM orders WHERE company_name = "${company}"` 
    return databaseResponder(sql)
  },

  getAllOneAddress: (address) => {   
    const sql = `SELECT * FROM orders WHERE customer_address = "${address}"` 
    return databaseResponder(sql)
  },

  deleteOneOrder: (orderId) => {   
    const sql = `DELETE FROM orders WHERE order_id = "${orderId}"` 
    return databaseResponder(sql)
  },

  countAllProducts: () => {   
    const sql = `SELECT ordered_item, COUNT(*) AS Orders FROM orders GROUP BY ordered_item ORDER BY COUNT(*) DESC;` 
    return databaseResponder(sql)
  },

  companyPaidTotal :(companyName) => {
   const sql = `SELECT SUM(price) AS total FROM orders WHERE company_name = "SuperTrader"`; 
   return databaseResponder(sql)
  },

  companyOrderedItem : (item) => {
   const sql = `SELECT company_name FROM orders WHERE ordered_item = "${item}"`; 
   return databaseResponder(sql)
  },

}