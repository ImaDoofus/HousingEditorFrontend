<template>
	<div></div>
</template>

<script>
import housingSounds from '@/assets/sounds/soundHousingList.json';
import SOUND_VARIANTS_LATEST from '@/assets/sounds/sounds.json';
import SOUND_VARIANTS_LEGACY from '@/assets/sounds/sounds_legacy.json';
import Blockly, { FieldNumber } from 'blockly';
import { FieldSlider } from '@blockly/field-slider';

const LATEST_VERSION_SOUNDS = Object.keys(SOUND_VARIANTS_LATEST).map(sound => {
	return [sound + ' 1.20', sound];
});
const SOUNDS_LEGACY = housingSounds.map(sound => {
	return [sound.name + ' 1.8.9', sound.path];
});
const dropdownData = SOUNDS_LEGACY.concat(LATEST_VERSION_SOUNDS);

export default {
	name: 'PlaySound',
	data() {
		return {
			currentSound: null
		}
	},
	methods: {
		playPreviewSound(soundKey, pitch, volume) {
			// reverse lookup
			const text = dropdownData.find(sound => sound[1] === soundKey)[0];
			const IS_LATEST_VERSION = text.endsWith('1.20');

			let soundData;
			if (IS_LATEST_VERSION) soundData = SOUND_VARIANTS_LATEST[soundKey] // 1.20
			else soundData = SOUND_VARIANTS_LEGACY[soundKey] // 1.8.9

			let random = soundData.sounds[Math.floor(Math.random() * soundData.sounds.length)];
			let soundVariant = typeof random === 'string' ? random : random.name; // The sound array can contain either a string or an object with a name property
			let soundPath = (IS_LATEST_VERSION ? "LATEST/" : "LEGACY/") + soundVariant + ".ogg";
			let sound = new Audio(require(`@/assets/sounds/audio/${soundPath}`));
			sound.volume = volume / 2;
			sound.currentTime = 0;
			sound.playbackRate = pitch;
			sound.preservesPitch = sound.mozPreservesPitch = false;
			if (this.currentSound) this.currentSound.pause();
			this.currentSound = sound;
			sound.play();
		},
		getImagePath(type, meta, extra = false) {
			if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		},
	},
	mounted() {
		const component = this;

		function coordinateInputValidatorXZ(newValue) {
			if (newValue.startsWith("~")) newValue = newValue.substring(1);
			const number = parseFloat(newValue);
			if (isNaN(number) || number < -190 || number > 190) return null;

			const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
			if (!coordinateRegex.test(newValue)) return null;
		}

		function coordinateInputValidatorY(newValue) {
			if (newValue.startsWith("~")) newValue = newValue.substring(1);
			const number = parseFloat(newValue);
			if (isNaN(number) || number < -50 || number > 300) return null;

			const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
			if (!coordinateRegex.test(newValue)) return null;
		}
		
		Blockly.Blocks['play_sound'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(25, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Play Sound", "block_header"))
					.appendField(new Blockly.FieldImage('/assets/volume-high.svg', 24, 24, '*', () => {
						component.playPreviewSound(this.getFieldValue('SOUND'), this.getFieldValue('PITCH'), this.getFieldValue('VOLUME'));
					}))

				this.appendDummyInput()
					.appendField('Volume')
					.appendField(new FieldNumber(0.7, 0.1, 2, 0.00001), "VOLUME");
				this.appendDummyInput()
					.appendField('Pitch')
					.appendField(new FieldNumber(1, 0.5, 2, 0.00001), "PITCH");


				const dropdown = new Blockly.FieldDropdown(dropdownData);

				this.appendDummyInput()
				.appendField('Sound')
				.appendField(dropdown, 'SOUND');
					
				const locationDropdown = new Blockly.FieldDropdown([
					["Current Location", "current_location"],
					["Custom Coordinates", "custom_coordinates"],
					["Invokers Location", "invokers_location"],
					["Housing Spawn", "house_spawn"],
				]);
				locationDropdown.setValidator((newValue) => {
				if (this.getInput("COORDINATES")) this.removeInput("COORDINATES");
				if (this.getInput("ROTATION")) this.removeInput("ROTATION");
				if (newValue === "custom_coordinates") {
					this.appendDummyInput("COORDINATES")
					.appendField("X:")
					.appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "X")
					.appendField("Y:")
					.appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorY), "Y")
					.appendField("Z:")
					.appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "Z");
				}
				});
				this.appendDummyInput().appendField("Location:").appendField(locationDropdown, "LOCATION");
					
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setColour(170);
				this.setTooltip("Plays a sound<br><strong>Tip:</strong> Player may not hear the sound if you put a tp player action after it.<br><strong>Tip:</strong> 0.5 is the lowest pitch.");
				this.setHelpUrl("");
			}
		}
	}
}
</script>