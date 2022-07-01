import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import AboutPage from '../views/home/AboutPage.vue'
import LinkAccount from '../views/login/LinkAccount.vue'
import EditAction from '../views/actions/EditAction.vue'
import ActionCatalog from '../views/actions/ActionCatalog.vue'
import HomePage from '../views/home/HomePage.vue'
import DashboardPage from '../views/profile/DashboardPage.vue'
import EditItem from '../views/items/EditItem.vue'
import ItemCatalog from '../views/items/ItemCatalog.vue'
import SingleAction from '../views/actions/SingleAction.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomePage
	},
	{
		path: '*',
		redirect: '/dashboard'
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView
	},
	{
		path: '/about',
		name: 'about',
		component: AboutPage
	},
	{
		path: '/link-account',
		name: 'link-account',
		component: LinkAccount
	},
	{
		path: '/edit-action',
		name: 'edit-action',
		component: EditAction
	},
	{
		path: '/actions',
		name: 'action-catalog',
		component: ActionCatalog
	},
	{
		path: '/action/:id',
		name: 'action',
		component: SingleAction
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: DashboardPage
	},
	{
		path: '/edit-item',
		name: 'edit-item',
		component: EditItem,
	},
	{
		path: '/items',
		name: 'item-catalog',
		component: ItemCatalog
	},
]

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (to.name === 'about') {
			return { top: 0 };
		}
		return savedPosition;
	}
})

export default router
