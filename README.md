# SmartBrain - BACKEND
My version of the final project for the [Zero To Mastery](https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/) course

## Description
This project provides the backend for the SmartBrain app

## Features
* Register & Signin function
* Detect 1-X faces in an image these will be highlighted with blue squares. 

## Installation guide for local development

1. clone this repo and also [this](https://github.com/crowbarcode/SmartBrain) repo
2. run `yarn` in both of them
3. run `yarn dev` in the **SmartBrain-API** repo first and then `yarn start` in the SmartBrain repo.
4. pass the api key via an process.env variable
5. set the db to this parameters
```const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'SmartBrainDB'
  }
```
6. create a postgress db called `SmartBrainDB` with the following tables:
```
CREATE TABLE login (
	id serial PRIMARY KEY,
	HASH varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
);
```
```
CREATE TABLE users (
    id serial PRIMARY KEY,
	name varchar(100) NOT NULL,
	email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0
);
```


## The backend was build with:
* `node.js`
* `express.js`
* `postgres`
* `clarifai`
* `knex`
* `bcrypt`
