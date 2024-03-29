import { createSSRApp } from 'vue'
import memo from 'memo-ui';

import { router } from "./router"

import App from './App.vue'

const app = createSSRApp(App);
app.use(memo);

export {
    app,
    router
}
