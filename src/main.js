import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import naive from "naive-ui";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

createApp(App).use(naive).use(Antd).use(store).use(router).mount("#app");
