const mysql = require('mysql');
const dbConfig = require('../config.js')
const database = mysql.createConnection(dbConfig);

database.connect((error) => {
  if(error) console.log(error)
  database.query(`SHOW TABLES LIKE "orders"`,(err, res) => {
  	if(res.length === 0) {
  	  setupNewOrderTable()
      console.log('Setting up orders table')
  	} 
  	if(err) console.log(err)
    database.query(`SHOW TABLES LIKE "company_list"`,(err, res) => {
  	  if(res.length === 0) {
  	  setupNewCompanyTable()
      console.log('Setting up company table')
  	} 
  	if(err) console.log(err)
  })	

  })	
})

const setupNewOrderTable = () => {

	const createTable = `CREATE TABLE orders (
	  order_id varchar(20) NOT NULL,
	  company_name varchar(500) NOT NULL,
	  customer_address longtext NOT NULL,
	  ordered_item varchar(500) NOT NULL,
	  price decimal(10,0) NOT NULL,
	  currency longtext NOT NULL
	)`;

	const setIndex = `ALTER TABLE orders ADD UNIQUE (order_id)`
	const sql = createTable;

	database.query(sql, (err, result) => {
		if (err) console.log(err);
			return;	
	database.query(setIndex, (err, result) => {
		if (err) throw err;
	 		console.log(result)
	}) 
	}) 	


}

const setupNewCompanyTable = () => {

	const createCompanyTable = `CREATE TABLE company_list (
	  company_id INT NOT NULL AUTO_INCREMENT,
	  company_name VARCHAR(100) NULL,
	  city VARCHAR(45) NULL,
	  phone_contact VARCHAR(45) NULL,
	  email VARCHAR(45) NULL,
	  address VARCHAR(500) NULL,
	  PRIMARY KEY (company_id),
	  UNIQUE INDEX company_id_UNIQUE (company_id ASC))`;

 const sql = createCompanyTable;
  database.query(sql, (err, result) => {
    if (err){
      console.log(err);
      //console.log('Company table already exists!');
      return; 
    } 
  }) 
}




