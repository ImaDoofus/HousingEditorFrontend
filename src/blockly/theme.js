import Blockly from 'blockly/core';

Blockly.Theme.defineTheme('custom_theme', {
	'base': Blockly.Themes.Classic,
	'componentStyles': {
		'workspaceBackgroundColour': '#E3F2FD',
		'toolboxBackgroundColour': '#e9e9e9',
		'toolboxForegroundColour': '#000',
		'flyoutBackgroundColour': '#fff',
		'flyoutForegroundColour': '#000',
		'flyoutOpacity': 0.7,
	},
	'categoryStyles' : {
		"text_components_category": {
			"colour": "#8eaac1"
		},
		"potion_effects_category": {
			"colour": "#987cdc"
		},
		"messages_category": {
			"colour": "#35bb98"
		},
		"teleportation_category": {
			"colour": "#90c454"
		},
		"parkour_category": {
			"colour": "#f8bc44"
		},
		"stats_category": {
			"colour": "#2596be"
		},
		"health_category": {
			"colour": "#e04454"
		},
		"inventory_category": {
			"colour": "#e87c24"
		},
		"miscellaneous_category": {
			"colour": "#d874ac"
		},

		"right_click_actions_category": {
			"colour": "#3f51b5"
		},
		"customize_item_category": {
			"colour": "#9c27b0"
		}
	},
	'startHats': true
});