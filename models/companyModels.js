const { databaseResponder } = require('./modelHelper.js')

module.exports.companyModels = {

  deleteAll : () => {
   const sql = `DELETE FROM company_list` 
   return databaseResponder(sql)
  },

  getAllCompany : () => {
   const sql = `SELECT * FROM company_list` 
   return databaseResponder(sql)
  },

  createNewCompany : (company) => {
    const sql = `INSERT INTO company_list (company_id, company_name, city, phone_contact, email, address)` + 
  ` VALUES ("${company.companyId}","${company.companyName}","${company.city}","${company.phoneContact}","${company.email}","${company.address}")`;    
   return databaseResponder(sql)
  },

  updateCompany : (company) => {
  const sql = `UPDATE company_list` +
  ` SET company_name = "${company.companyName}", city = "${company.city}", phone_contact = "${company.phoneContact}", email = "${company.email}", address = "${company.address}"` +
  ` WHERE company_id = "${company.companyId}"`   
   return databaseResponder(sql)
  }, 

  deleteCompany :(companyName) => {
   const sql = `DELETE FROM company_list WHERE company_name = "${companyName}"` 
   return databaseResponder(sql)
  }
}