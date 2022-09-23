<template>
	<v-dialog v-model="dialog" width="unset" transition="dialog-bottom-transition">
		<CustomSnackbar ref="snackbar"/>
		<v-card class="pa-5 darken-2">
			<div class="text-center">
				<p class="text-h4 mb-0">Select an Inventory slot</p>
				<p class="text-h6">that will have the item you want to use</p>
			</div>
			<div id="inventory-background" class="pa-4 pt-2">
				<p id="inventory-title">Inventory</p>
				<div v-for="inventoryRow in 4" :key="inventoryRow">
					<div v-if="inventoryRow === 4" id="inventory-spacer"></div>
					<div class="d-flex">
						<div v-for="slotNum in 9" :key="slotNum" flat tile>
							<div :ref="`slot-${((inventoryRow - 1) * 9) + slotNum}`" @click="slotClicked(((inventoryRow - 1) * 9) + slotNum)"
								class="inventory-slot"
								:id="getIsActive(((inventoryRow - 1) * 9) + slotNum)">
								<div class="slot-in-use" v-if="[18,27,36].indexOf(((inventoryRow - 1) * 9) + slotNum) > -1">
									<img v-if="((inventoryRow - 1) * 9) + slotNum === 18" src="@/assets/minecraft-items/items/166-0.png" alt="*">
									<img v-if="((inventoryRow - 1) * 9) + slotNum === 27" src="@/assets/minecraft-items/items/380-0.png" alt="*">
									<img v-if="((inventoryRow - 1) * 9) + slotNum === 36" src="@/assets/minecraft-items/items/399-0.png" alt="*">
								</div>
								<p v-else>{{ ((inventoryRow - 1) * 9) + slotNum }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="error" @click="dialog = false">Cancel</v-btn>
				<v-btn color="success" @click="doneWasClicked">OK</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import CustomSnackbar from '../misc/CustomSnackbar.vue';

export default {
	name: 'InventorySlotSelector',
	components: {
		CustomSnackbar
	},
	data() {
		return {
			dialog: false,
			selection: null,
		}
	},
	methods: {
		slotClicked(slot) {
			if (slot === 36) return this.$refs.snackbar.show('Sorry, you can\'t use the menu slot!', 'error', );
			if (slot === 27) return this.$refs.snackbar.show('Sorry, you can\'t use the trashcan slot!', 'error', );
			if (slot === 18) return this.$refs.snackbar.show('Sorry, this slot is reserved for other stuff while loading an action!', 'error', );

			// mark previous selection as not used
			if (this.selection !== 'NONE') this.$refs[`slot-${this.selection}`][0].id = '';

			// mark new selection as used
			this.$refs[`slot-${slot}`][0].id = 'selected-slot';
			this.selection = slot;
		},
		doneWasClicked() {
			if (this.selection === 'NONE') return this.$refs.snackbar.show('Please select a slot', 'error');
			this.dialog = false;
			this.$emit('select', this.selection);
		},
		getIsActive(slot) {
			return this.selection === slot ? 'selected-slot' : '';
		},
		open(selectedSlot) {
			// remove the last selected slot
			if (this.$refs[`slot-${this.selection}`]) this.$refs[`slot-${this.selection}`][0].id = '';
			if (this.$refs[`slot-${selectedSlot}`]) this.$refs[`slot-${selectedSlot}`][0].id = 'selected-slot';
			this.selection = selectedSlot;
			this.dialog = true;
		},
	},
}
</script>

<style>
#selected-slot {
	background-color: #93FF88;
}

.inventory-slot {
	width: 40px;
	height: 40px;
	background-color: #8B8B8B;
	box-shadow: 1px 1px 0px 1px #FFF,
    -1px -1px 0px 1px #373737,
	0 0 0 2px #888;
	margin: 2px;
	user-select: none;
	position: relative;
}

.inventory-slot p {
	font-family: 'Minecraft';
	color: #FFF;
	position: absolute;
	bottom: 0;
	right: 0;
	margin: 0;
}

.inventory-slot:hover:not(.slot-in-use)  {
	background-color: #a0a0a0;
	cursor: pointer;
}

.slot-in-use img {
	position: absolute;
	top: 4px;
	left: 4px;
}

.slot-in-use {
	background-color: #F67;
	width: 100%;
	height: 100%;
}

#inventory-spacer {
	width: 100px;
	height: 10px;
}

#inventory-background {
	background-color: #c6c6c6;
	box-shadow: 2px 2px 0px #555, inset 2px 2px #FEFEFE;
	border: 1px solid black;
	border-radius: 2px;
}

#inventory-title {
	font-family: 'Minecraft';
	margin-bottom: 0.5rem;
	color: #3F3F3F;
}
</style>