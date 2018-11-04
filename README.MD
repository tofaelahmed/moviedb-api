# MovieDB Server

This is the API server for MovieDB task. It is a RESTful API written using [express](https://expressjs.com/). The Api will be accessed from web client application.

## Technology stack

- [MongoDB](https://www.mongodb.com)
- [mongoose](https://mongoosejs.com)
- [Express.js](http://expressjs.org)
- [passport.js](https://passportjs.org)
- [socket.io](http://socket.io)

## Setup

You need to run MongoDB on your development box or if you wish to use any remote url please update it in `database.js`.

```
git clone
npm install
npm start
```

## Source Tree

```
├──auth
│   └── jwt-helper.js
│   └── passport.js
│   └── strategies.js
├──bin
│   └── www
├──errors
│   └── base-error.js
│   └── conflict.js
│   └── not-found.js
│   └── unauthorized.js
├──middlewares
│   └── cors.js
│   └── error-handler.js
├──models
│   └── index.js
│   └── movie.js
│   └── user.js
├──routes
│   └── api
│        └── movie.js
│        └── user.js
│   └── validation
│        └── movie.js
│        └── user.js
├──services
│   └── movie-service.js
│   └── user-service.js
├──socket
│   └── index.js
│   └── socket-handler.js
├──spec
│   └── user.spec.js
│   └── movie.spec.js
├──.env
├──app.js
├──databse.js
├──logger.js
├──package-lock.json
├──package.json
├──README.md
├──ui-errors.md
```
