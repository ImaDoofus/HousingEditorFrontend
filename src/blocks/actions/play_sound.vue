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
			soundPath: '',
			soundPitch: 1,
			workspace: null,
			sounds: {},
		}
	},
	methods: {
		playPreviewSound() {
			const soundData = soundMap[this.soundPath]
			const random = soundData.sounds[Math.floor(Math.random() * soundData.sounds.length)];
			let sound;
			if (this.sounds[random]) {	
				sound = this.sounds[random];
			} else {
				sound = new Audio(require(`@/assets/sounds/audio/${random}.ogg`));
				this.sounds[random] = sound;
			}
			sound.currentTime = 0;
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
		setWorkspace(workspace) {
			this.workspace = workspace;
			this.workspace.addChangeListener(this.workspaceChangeListener)
		},
		workspaceChangeListener(event) {
			if (event.type !== Blockly.Events.BLOCK_CHANGE) return;

			const block = this.workspace.getBlockById(event.blockId);

			if (block.type === 'play_sound') {
				const sound = housingSounds.find(sound => sound.name === block.getFieldValue('SOUND'));
				this.setSound(sound);
				this.setPitch(block.getFieldValue('PITCH'));
				if (event.name === 'SOUND') this.playPreviewSound();
			}
		}
	},
	mounted() {
		const component = this;

		Blockly.Blocks['play_sound'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Play Sound", "block_header"))
					.appendField(new Blockly.FieldImage('/assets/volume-high.svg', 24, 24, '*', () => {
						component.playPreviewSound();
					}))
				this.appendDummyInput()
					.appendField('Pitch')
					.appendField(new FieldSlider(1, 0.5, 2, 0.1, (newValue) => {
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
				this.setColour(170);
				this.setTooltip("Plays a sound<br><strong>Tip:</strong> Player may not hear the sound if you put a tp player action after it.<br><strong>Tip:</strong> 0.5 is the lowest pitch.");
				this.setHelpUrl("");
			}
		}
	},
}
</script>