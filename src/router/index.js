import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import TrailerPage from '../views/home/TrailerPage.vue'
import LinkAccount from '../views/login/LinkAccount.vue'
import EditAction from '../views/actions/EditAction.vue'
import ActionCatalog from '../views/actions/ActionCatalog.vue'
import HomePage from '../views/home/HomePage.vue'
import DashboardPage from '../views/profile/DashboardPage.vue'
import EditItem from '../views/items/EditItem.vue'
import ItemCatalog from '../views/items/ItemCatalog.vue'
import SingleAction from '../views/actions/SingleAction.vue'
import SingleItem from '../views/items/SingleItem.vue'
import ProfilePage from '../views/profile/ProfilePage.vue'
import ContactPage from '../views/home/ContactPage.vue'
import HousingLimits from '../views/home/HousingLimits.vue'
import PrivacyPolicy from '../views/home/PrivacyPolicy.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomePage
	},
	{
		path: '*',
		redirect: '/'
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView
	},
	{
		path: '/trailer',
		name: 'trailer',
		component: TrailerPage
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
	{
		path: '/item/:id',
		name: 'item',
		component: SingleItem
	},
	{
		path: '/profile/:userId',
		name: 'profile',
		component: ProfilePage
	},
	{
		path: '/contact',
		name: 'contact',
		component: ContactPage
	},
	{
		path: '/housing-limits',
		name: 'housing-limits',
		component: HousingLimits
	},
	{
		path: '/privacy-policy',
		name: 'privacy-policy',
		component: PrivacyPolicy
	}
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
