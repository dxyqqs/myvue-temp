// main css
import "./app.{{#if package.hasScss}}s{{/if}}css"

import Vue from "vue";
import App from "app/app.vue";

const appVM = new Vue({ render: h => h(App) })

appVM.$mount('#app')
