
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
should = chai.should()
chai.use(chaiHttp);
//Our parent block
describe('Orders', () => {
   const data = [{ data : {
              "orderId": "0010",
              "companyName":"SuperTrader",
              "companyId" : 1,
              "customerAddress":"Sternstrasse 125",
              "orderItem":"Book \\\"Cooking 101\\\"",
              "price":10,
              "currency":"EUR"
              }
            },
              {data:{
              "orderId": "0011",
              "companyName":"SuperTrader",
              "companyId" : 1,
              "customerAddress":"Sternstrasse 125",
              "orderItem":"Book \\\"Cooking 101\\\"",
              "price":10,
              "currency":"EUR"
              }
            }
            ]
    const dataSecond =  {data:{
              "orderId": "0012",
              "companyName":"SuperTrader",
              "companyId" : 1,
              "customerAddress":"Sternstrasse 125",
              "orderItem":"Book \\\"Cooking 101\\\"",
              "price":10,
              "currency":"EUR"
              }
            }       
  console.log(`The process environment is:`,process.env.NODE_ENV,'!')
  beforeEach((done) => { //Before each test we empty the database
    chai.request('http://localhost:3000').delete('/ordersapi/deleteall').end((err, res) => {
      chai.request('http://localhost:3000').post('/ordersapi/neworder').send(data[0]).end((err, res) =>{
        chai.request('http://localhost:3000').post('/ordersapi/neworder').send(data[1]).end((err, res) =>{
          done();
            })
        })
    }) 
  });    

   afterEach((done) => { //Before each test we empty the database
    chai.request('http://localhost:3000').delete('/ordersapi/deleteall').end((err, res) => {
     if(err) console.log(err)
     done();  
    }) 
  });  

  describe('checks order routes', () => {
      it('should get an empty order structure', (done) => {
        chai.request('http://localhost:3000').get('/ordersapi/getallonecompany').end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done()
        })
            
      });
      it('should post data and return 200 status', (done) => {
        chai.request('http://localhost:3000').post('/ordersapi/neworder').send(dataSecond).end((err, res) =>{
          res.should.have.status(200);
          done()
        })
            
      });
      it('should get all orders from one company', (done) => {
        chai.request('http://localhost:3000').get('/ordersapi/getallonecompany').query({company:'SuperTrader'}).end((err, res) =>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done()
        })
      });
      it('should get all orders from one address', (done) => {
        chai.request('http://localhost:3000').get('/ordersapi/getalloneaddress').query({address:'Sternstrasse 125'}).end((err, res) =>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done()
        })
      });
      it('should delete one order based on order id', (done) => {
        chai.request('http://localhost:3000').delete('/ordersapi/deleteoneorder').query({orderId:'0011'}).end((err, res) =>{
          res.should.have.status(200);
          done()
        })
      });
      it('should count all products', (done) => {
        chai.request('http://localhost:3000').get('/ordersapi/countallproducts').end((err, res) =>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          expect(res.body[0].Orders).to.be.eql(2);
          done()
        })
      });      
      it('should get a companies paid total', (done) => {
        chai.request('http://localhost:3000').get('/ordersapi/companypaidtotal').send({company: "SuperTrader"}).end((err, res) =>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          expect(res.body[0].total).to.be.eql(20);
          done()
        })
      });
      it('should get all companies that ordered an item', (done) => {
        chai.request('http://localhost:3000').get('/ordersapi/companyordereditem').query({item: "Book \\\"Cooking 101\\\""}).end((err, res) =>{
          res.should.have.status(200);
          expect(res.body.length).to.be.eql(2);
          done()
        })
      });
    });
    
});

describe('Companies', () => {
   const data = [{"data": {
                  "companyName": "SuperTrader",
                  "city": "London",
                  "companyId": 1,
                  "phoneContact": "01708226061",
                  "email": "jason@jbs.com",
                  "address": "123 Clay Tye Road"
                 }
                 },
                 {"data": {
                  "companyName": "CheapSkates",
                  "city": "Hamburg",
                  "companyId": 2,
                  "phoneContact": "01708336061",
                  "email": "jason@cs.com",
                  "address": "12 Cordover Road"
                 }
                 } 
               ] 

    const companyData = {"data": {
                  "companyName": "MegaCorp",
                  "city": "London",
                  "companyId": 3,
                  "phoneContact": "01708226061",
                  "email": "jason@jbs.com",
                  "address": "123 Clay Tye Road"
                 }
                 } 
    const updateCompanyData = {"data": {
                  "companyName": "MegaCorp",
                  "city": "London",
                  "companyId": 3,
                  "phoneContact": "01708226061",
                  "email": "jason@jbs.com",
                  "address": "1234 Clay Tye Street"
                 }
                 } 

  console.log(`The process environment is:`,process.env.NODE_ENV,'!')
  beforeEach((done) => { 
    chai.request('http://localhost:3000').delete('/companyapi/deleteall').end((err, res) => {
      chai.request('http://localhost:3000').post('/companyapi/newcompany').send(data[0]).end((err, res) => {
        chai.request('http://localhost:3000').post('/companyapi/newcompany').send(data[1]).end((err, res) => {
          done();
            })
        })
    }) 
  });    

   afterEach((done) => { 
    chai.request('http://localhost:3000').delete('/companyapi/deleteall').end((err, res) => {
     if(err) console.log(err)
     done();  
    }) 
  });

describe('checks company routes', () => {            
      it('should get all companies', (done) => {
        chai.request('http://localhost:3000').get('/companyapi/getallcompany').end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
          done()
        })
            
      });
      it('should create one company in the database', (done) => {
        chai.request('http://localhost:3000').post('/companyapi/newcompany').send(companyData).end((err, res) =>{
            res.should.have.status(200);
          done()
        })            
      });
      it('should update one company in the database', (done) => {
        chai.request('http://localhost:3000').post('/companyapi/updatecompany').send(updateCompanyData).end((err, res) =>{
            res.should.have.status(200);
          done()
        })            
      });
      it('should delete one company in the database', (done) => {
        chai.request('http://localhost:3000').delete('/companyapi/deletecompany').send({companyName: 'SuperTrader' }).end((err, res) =>{
            res.should.have.status(200);
          done()
        })            
      });
    });
});

