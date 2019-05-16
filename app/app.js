import Vue from "nativescript-vue";

import List from "./components/List";

new Vue({

    template: `
        <Frame>
            <List />
        </Frame>`,

    components: {
        List
    }
}).$start();
