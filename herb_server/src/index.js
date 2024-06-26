require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const { jwtMiddleware } = require('./lib/token');

const app = new Koa();
const router = new Router();
const api = require('./api');

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
}).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

const port = process.env.PORT

app.use(bodyParser());
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('heurm server is listening to port ' + port);
});