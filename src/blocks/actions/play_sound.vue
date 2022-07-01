<template>
	<div></div>
</template>

<script>
import housingSounds from '@/assets/sounds/soundHousingList.json';
import soundMap from '@/assets/sounds/soundMap.json';
import Blockly from 'blockly';
// import { FieldSlider } from '@blockly/field-slider';

export default {
	name: 'PlaySound',
	data() {
		return {
			soundPath: '',
			soundPitch: 1
		}
	},
	methods: {
		playPreviewSound() {
			const soundData = soundMap[this.soundPath]
			const random = soundData.sounds[Math.floor(Math.random() * soundData.sounds.length)];
			const sound = new Audio(require(`@/assets/sounds/audio/${random}.ogg`));
			sound.playbackRate = Math.max(0.5, this.soundPitch); // normalize to sound like minecraft pitch
			sound.preservesPitch = false;
			sound.mozPreservesPitch = false;
			sound.play();
		},
		setSound(sound) {
			this.soundPath = sound.path;
		},
		setPitch(pitch) {
			this.soundPitch = pitch;
		},
	},
	mounted() {
		const component = this;

		Blockly.Blocks['play_sound'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Play Sound", "block_header"))
					.appendField(new Blockly.FieldImage('/assets/sound.png', 20, 20, '*', () => {
						component.playPreviewSound();
					}))
				this.appendDummyInput()
					.appendField('Pitch')
					.appendField(new Blockly.FieldNumber(1, 0, 2, 0.0000001, (newValue) => {
						component.setPitch(newValue);
					}), "PITCH");

				const dropdown = new Blockly.FieldDropdown(() => {
					return housingSounds.map(sound => { return [sound.name, sound.name] });
				});
				dropdown.setValidator((newValue) => {
					component.setSound(housingSounds.find(sound => sound.name === newValue));
				})

				this.appendDummyInput()
					.appendField('Sound')
					.appendField(dropdown, 'SOUND');
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setColour(230);
				this.setTooltip("Plays a sound<br><strong>Tip:</strong> Player may not hear the sound if you put a tp player action after it.<br>");
				this.setHelpUrl("");
			}
		}
	},
}
</script>