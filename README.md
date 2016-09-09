# Amazon MWS NodeJS API
This is a NodeJS implementation of Amazon's Merchant Web Services API, inspired by and based on https://github.com/eibbors/mws-js.

It contains a NodeJS MWSClass, callable from within NodeJS, as well as a collection of POST routes providing API access.

The following MWS APIs are implemented (though not all are in complete working order):
  * Feeds
  * Finances
  * Fulfillment Inbound Shipment
  * Fulfillment Inventory
  * Fulfillment Outbound Shipment
  * Merchant Fulfillment
  * Orders
  * Products
  * Recommendations
  * Reports
  * Sellers
  * Subscriptions

## Usage
(from within NodeJS)
```javascript
var
  MyMWS = require('libs/mymws'),
  body = {
    MarketplaceId : 'ATVPDKIKX0DER',
    Query : 'Stephen King'
  };

MyMWS.Products.ListMatchingProducts(body)
.then (function (response) {
  console.log( JSON.stringify(response) );         
})
.catch(function (error) {
  console.log( JSON.stringify(error) );  
});
```
(from an external API call, e.g. jquery)
```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8080/mymws/products/ListMatchingProducts",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "MarketplaceId": "ATVPDKIKX0DER",
    "Query": "Stephen King"
  }
}

$.ajax(settings)
.done(function (response) {
  console.log( JSON.stringify(response) );
})
.fail(function (error) {
  console.log( JSON.stringify(error) );
});
```

## Features

## Setup

## TO DO
