'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const { name, version } = require("../package.json");

Route
    .get("/", () => {
        return {
            name,
            version
        };
    });

Route
    .post('api/v1/login', 'UserController.login')
    
Route
    .post('api/v1/signup', 'UserController.signup')

Route
    .get('api/v1/user/:userId', 'UserController.show')
    .middleware('auth')