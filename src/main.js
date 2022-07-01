import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRellax from 'vue-rellax'
import VueTyperPlugin from 'vue-typer'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.config.productionTip = false

const production = false;
Vue.prototype.$apiHostname = production ? 'https://www.housingeditor.com' : 'http://localhost:3000'
Vue.prototype.$hostname = production ? 'https://www.housingeditor.com' : 'http://localhost:8080'

//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

Vue.use(VueMeta)
Vue.use(VueRellax)
Vue.use(VueTyperPlugin)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')

window.addEventListener('message', e => {
	if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
		console.log('Hot Reload!')
		console.clear()
	}
})
