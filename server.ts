const Koa = require("koa");
const fs = require("fs");
const path = require('path')

const app = new Koa();


const resolve = (p: string) => path.resolve(__dirname, p)

async function start() {
    const root = process.cwd();
    const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
    const vite = await require('vite').createServer({
        root,
        logLevel: isTest ? 'error' : 'info',
        server: {
            middlewareMode: 'ssh',
            watch: {
                // During tests we edit the files too fast and sometimes chokidar
                // misses change events, so enforce polling for consistency
                usePolling: true,
                interval: 100
            }
        }
    })
    app.use(async ({ req, res }, next) => {
        // vite.middlewares(req, res)
        console.log('🐑1：', req.url);
        await new Promise((resolve) => console.log(vite.middlewares(req, res, resolve))) //? 中间建接管后 会中断下面操作
        console.count('🐑2：');
        await next();
    })

    app.use(async (ctx) => {
        // let template, render
        console.count('🐑：');
        const { request: req, response: res } = ctx
        const render = (await vite.ssrLoadModule('/src/SSREntry.ts')).render;
        const url = req.url

        // always read fresh template in dev
        let template: string = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)

        const html = template
            .replace(`<!--app-html-->`, await render())

        res.status = 200
        res.set('Content-Type', 'text/html')
        res.body = html
    })
    app.listen(9000);
    console.log("assess on:" + "http://localhost:9000/");
}

start()