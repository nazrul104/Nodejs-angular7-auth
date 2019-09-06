# Nodejs-angular7-auth
Nodejs, Angular 7, MongoDB

#API deployed in AWS:

http://3.9.171.225:3000

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm start` to start the local server

To get the Angular app running locally:


## Prerequisite

* [NodeJS >= 11.1.0](https://nodejs.org): runtime environment
* [MongoDB](https://www.mongodb.com): database
* [Angular CLI](https://cli.angular.io): frontend scaffolding

## Uses

* [Angular 7+](https://angular.io): frontend framework
* [Material](https://v7.material.angular.io/): layout and styles

## Prerequisites

1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI by running the following command:
  ```bash
  npm i -g @angular/cli
  ```
3. From project root folder install all the dependencies by running the following command inside your terminal:
  ```bash
  npm install
  ```

## Run the app

### Development mode

By running the following command a window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

```bash
ng serve | npm run dev
```

### Production mode

To run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) run the following command:

```bash
npm run prod
```