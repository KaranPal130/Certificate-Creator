const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const certificateRoute = require('./certificate.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/certificate',
    route: certificateRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
