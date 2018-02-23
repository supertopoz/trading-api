# trading-api

## COMPANY ORDERS API

A simple API that takes orders and updates them to a MySQL Database. 


## Build Instructions

### Prerequistes 

Prerequisites 

* MySql Server
* MySql DB
* Node v8.5.0
* NPM v5.6.0
* Postman

## Install

* Fork and clone
* Run 
```
npm install
```


## API Start up

* Create one file in the your directory called config.js - 
Modify the code depending on your MySql set database. 

```
let dbConfig;
if (process.env.NODE_ENV !== 'test') {
  dbConfig = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'minteger',
    charset  : 'utf8'
  }
}
if (process.env.NODE_ENV === 'test') {
    dbConfig = {
       host     : 'localhost',
       user     : 'root',
       password : '',
       database : 'test',
       charset  : 'utf8'
    }

}

module.exports = dbConfig;   

```

* Start your MySql server database

* To start the API server - Recomended - use postman to call routes. 
```
npm start
```
## Testing

* Start Test server - Test server will should have it's own database and tables - as seen in the config file. 

```
npm start-test-server 
```

* To run tests 

Option 1 - Windows PC

```
npm run windows-test 
```

Option 2 - Mac

```
npm run test 
```


# Routes



## Add new order

### POST

#### Route

```
/ordersapi/neworder
```

#### Body

```
{"data":{
  "orderId": "009",
  "companyName":"SuperTrader",
  "companyId" : 1,
  "customerAddress":"Sternstrasse 125",
  "orderItem":"Book \\\"Cooking 101\\\"",
  "price":10,
  "currency":"EUR"
}
}
```

## Show all orders from a particular company

### GET

#### Route

```
/ordersapi/getallonecompany
```

#### Params

```
company=Company Name
```

#### Example 

```
http://localhost:3000/ordersapi/getallonecompany?company=SuperTrader
```

#### Output

```
[
    {
        "order_id": "001",
        "company_name": "SuperTrader",
        "company_id": "1",
        "customer_address": "Steindamm 80",
        "ordered_item": "MacBook",
        "price": 1700,
        "currency": "EUR"
    },
    {
        "order_id": "004",
        "company_name": "SuperTrader",
        "company_id": "1",
        "customer_address": "Sternstrasse 125",
        "ordered_item": "Book \"Cooking 101\"",
        "price": 10,
        "currency": "EUR"
    }
]
```


## Show all orders to a particular address

### GET

#### Route

```
/ordersapi/getalloneaddress
```

#### Params

```
address=Address
```

#### Example 

```
http://localhost:3000/ordersapi/getalloneaddress?address=Steindamm%2080
```

#### Output

```
[
    {
        "order_id": "001",
        "company_name": "SuperTrader",
        "customer_address": "Steindamm 80",
        "ordered_item": "MacBook",
        "price": 1700,
        "currency": "EUR"
    },
    {
        "order_id": "003",
        "company_name": "MegaCorp",
        "customer_address": "Steindamm 80",
        "ordered_item": " Book \"Guide to Hamburg\"",
        "price": 20,
        "currency": "EUR"
    }
]
```

## Delete a particular order given an OrderId

### DELETE

#### Route

```
/ordersapi/deleteoneorder
```

#### Params

```
orderId=Order Number as a string
```

#### Example 

```
http://localhost:3000/ordersapi/deleteoneorder?orderId=004
```


## Delete a particular order given an order id

### GET

#### Route

```
/ordersapi/countallproducts
```

#### Params

```
NONE - v1 does not allow filtering
```

#### Example 

```
http://localhost:3000/ordersapi/countallproducts
```

##### OUTPUT

```
[
    {
        "ordered_item": "MacBook",
        "Orders": 2
    },
    {
        "ordered_item": "Inline Skates",
        "Orders": 1
    },
    {
        "ordered_item": "Flux compensator",
        "Orders": 1
    }
]
```

## Add new company

### POST

#### Route

```
/ordersapi/newcompany
```

#### Body

```
{"data": {
  "companyName": "JBSXrrrrY",
  "city": "London",
  "phoneContact": "01708226061",
  "email": "jason@jbs.com",
  "address": "123 Clay Tye Road"
  }
}
```

#### Example 

```
http://localhost:3000/companyapi/newcompany
```

## Get company info

### GET

#### Route

```
/companyapi/getallcompany
```

#### Params

```
NONE - v1 does not allow filtering
```

#### Example 

```
http://localhost:3000/companyapi/getallcompany
```

#### Output 

```
[
    {
        "company_id": 1,
        "company_name": "SuperTrader",
        "city": "Era",
        "phone_contact": "935-404-5334",
        "email": "gsiemandl0@wiley.com",
        "address": "21936 Truax Court"
    },
    {
        "company_id": 2,
        "company_name": "Cheapskates",
        "city": "Chwaszczyno",
        "phone_contact": "438-777-1624",
        "email": "tpoulton1@tiny.cc",
        "address": "09574 Russell Pass"
    }
 ]
```

## Update company info

### POST

#### Route

```
/ordersapi/neworder
```

#### Body

```
{"data": {
  "companyId": 5,	
  "companyName": "JBSAX",
  "city": "Paris",
  "phoneContact": "01708226061",
  "email": "jason@jbs.com",
  "address": "123 Clay Tye Road"
  }
}
```

### Example

```
http://localhost:3000/companyapi/updatecompany
```

## Delete a particular company

### DELETE

#### Route

```
/companyapi/updatecompany
```

#### Params

```
company=Company name
```

#### Example 

```
http://localhost:3000/companyapi/deletecompany?company=JBSAX
```

## Get all order bought by one company - See "Show all orders from a particular company"

## Get the amount of money paid by a company

### GET

#### Route

```
/ordersapi/companypaidtotal
```

#### Params

```
company=Company name
```

#### Example 

```
http://localhost:3000/ordersapi/companypaidtotal?company=SuperTrader
```

#### Output 

```
[
    {
        "SUM(price)": 1870
    }
]
```

## Get all companies that bought a certain orderItem

### GET

#### Route

```
/ordersapi/companyordereditem
```

#### Params

```
item=Item name
```

#### Example 

```
http://localhost:3000/ordersapi/companyordereditem?item=MacBook
```

#### Output 

```
[
    {
        "company_name": "SuperTrader"
    },
    {
        "company_name": "Cheapskates"
    }
]
```
