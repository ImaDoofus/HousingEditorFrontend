<template>
	<div></div>
</template>

<script>
import housingSounds from '@/assets/sounds/soundHousingList.json';
import soundMap from '@/assets/sounds/soundMap.json';
import Blockly from 'blockly';
import { FieldSlider } from '@blockly/field-slider';

export default {
	name: 'PlaySound',
	data() {
		return {
		}
	},
	methods: {
		playPreviewSound(mcName, pitch) {
			let soundMapPath = housingSounds.find(sound => sound.name === mcName).path;
			let soundData = soundMap[soundMapPath];
			let random = soundData.sounds[Math.floor(Math.random() * soundData.sounds.length)];
			let soundPath = typeof random === 'string' ? random : random.name; // The sound array can contain either a string or an object with a name property
			let sound = new Audio(require(`@/assets/sounds/audio/${soundPath}.ogg`));
			sound.currentTime = 0;
			sound.playbackRate = pitch;
			sound.preservesPitch = false;
			sound.mozPreservesPitch = false;
			sound.play();
		},
		getImagePath(type, meta, extra = false) {
			if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		},
	},
	mounted() {
		const component = this;

		Blockly.Blocks['play_sound'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(25, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Play Sound", "block_header"))
					.appendField(new Blockly.FieldImage('/assets/volume-high.svg', 24, 24, '*', () => {
						component.playPreviewSound(this.getFieldValue('SOUND'), this.getFieldValue('PITCH'));
					}))
				this.appendDummyInput()
					.appendField('Pitch')
					.appendField(new FieldSlider(1, 0.5, 2, 0.1), "PITCH");

				const dropdown = new Blockly.FieldDropdown(() => {
					return housingSounds.map(sound => { return [sound.name, sound.name] });
				});

				this.appendDummyInput()
					.appendField('Sound')
					.appendField(dropdown, 'SOUND');
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setColour(170);
				this.setTooltip("Plays a sound<br><strong>Tip:</strong> Player may not hear the sound if you put a tp player action after it.<br><strong>Tip:</strong> 0.5 is the lowest pitch.");
				this.setHelpUrl("");
			}
		}
	},
}
</script>