import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				background: '#FFF',
				primary: colors.blue.accent2,
				secondary: colors.blue.lighten4,
				error: colors.red,
				info: colors.yellow.darken1,
				success: colors.green.darken1,
				warning: colors.deepOrange.darken1,
			},
			dark: {
				background: colors.grey.darken4,
				primary: colors.blue.darken3,
				secondary: colors.blue.darken2,
				error: colors.red,
				info: colors.yellow.lighten1,
				success: colors.green.lighten1,
				warning: colors.deepOrange.lighten1,
			},
		},
	},
});