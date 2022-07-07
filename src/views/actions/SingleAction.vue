<template>
	<div>
		<NavigationBar />
		<v-row class="d-flex justify-center pt-5">
			<v-col cols="6">
				<ActionCard :action="action" />
			</v-col>
		</v-row>
	</div>

</template>

<script>
import NavigationBar from "@/components/misc/NavigationBar.vue";
import ActionCard from "@/components/actions/ActionCard.vue";

export default {
	name: 'SingleAction',
	metaInfo() {
		return {
			title: this.getTitle(),
			titleTemplate: '%s | Action',
		}
	},
	components: {
		ActionCard,
		NavigationBar,
	},
	data() {
		return {
			action: null,
			id: '',
		}
	},
	methods: {
		getAction() {
			fetch(`${this.$apiHostname}/actions/${this.id}`, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
			}).then(res => {
				return res.json();
			}).then(json => {
				this.action = json;
			});
		},
		getTitle() {
			return this.action?.post?.title  || 'Loading...';
		}
	},
	mounted() {
		this.id = this.$route.params.id;
		if (this.id) {
			this.getAction();
		} else {
			this.$router.push('/');
		}
	}
}
</script>