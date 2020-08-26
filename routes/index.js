import Router from "koa-router";
import phoneBookController from '../controller/phoneBookController';
import config from '../config/app';

export default () => {
    const router = new Router();

    router.get('/', async ctx => {
        ctx.body = config.DEFAULT_LIVE_MESSAGE;
    });
    /* contact apis */

    router.get('/api/phone-book/', phoneBookController.findAll);
    router.post('/api/phone-book/', phoneBookController.create);
    router.get(`/api/phone-book/:mobile`, phoneBookController.findByMobile);
    router.put(`/api/phone-book/:id`, phoneBookController.update);
    router.delete(`/api/phone-book/:mobile`, phoneBookController.remove);
    // router.delete(`/api/phone-book/:id`, phoneBookController.deleteById);

    return router.routes();
}