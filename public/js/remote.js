// snek_case for vars
// camelCase for functions
const Remote = {
	ui: {
		volume_up: null,
		volume_down: null,
		play: null,
		pause: null,
		play_pause_ctr: null,
		fr: null,
		ff: null,
		turn_subtitles_on: null,
		turn_subtitles_off: null,
		subtitle_ctr: null
	},

	api: {
		call: function(uri, body={}) {
			fetch(uri, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body, null, '\t')
			})
				.then(res => console.log(res.statusText))
				.catch(res => console.log(res.statusText));
		},

		// TODO Consider adding an 'increment' value to the POST body for volume controls
		volumeUp: function() {
			console.log('Turning volume up');
			this.call('/volume/up');
		},
		volumeDown: function() {
			console.log('Turning volume down');
			this.call('/volume/down');
		},

		play: function() {
			console.log('Playing');
			this.call('/play');
		},
		pause: function() {
			console.log('Pausing');
			this.call('/pause');
		},

		fr: function() {
			console.log('Fast reversing');
			this.call('/speed/fr');
		},
		ff: function() {
			console.log('Fast forwarding');
			this.call('/speed/ff');
		},

		turnSubtitlesOn: function() {
			console.log('Turning subtitles on');
			this.call('/subtitles/on');
		},
		turnSubtitlesOff: function() {
			console.log('Turning subtitles off');
			this.call('/subtitles/off');
		}
	},

	assignUiElements: function() {
		this.ui.volume_up = document.getElementById('volume-up');
		this.ui.volume_down = document.getElementById('volume-down');
		this.ui.play = document.getElementById('play');
		this.ui.pause = document.getElementById('pause');
		this.ui.play_pause_ctr = document.getElementById('play-pause-ctr');
		this.ui.fr = document.getElementById('fr');
		this.ui.ff = document.getElementById('ff');
		this.ui.turn_subtitles_on = document.getElementById('turn-subtitles-on');
		this.ui.turn_subtitles_off = document.getElementById('turn-subtitles-off');
		this.ui.subtitle_ctr = document.getElementById('subtitle-ctr');
	},

	assignCallbacks: function() {
		this.ui.volume_up         .addEventListener('click', (evt) => { this.api.volumeUp(); });
		this.ui.volume_down       .addEventListener('click', (evt) => { this.api.volumeDown(); });
		this.ui.play              .addEventListener('click', (evt) => { this.api.play(); });
		this.ui.pause             .addEventListener('click', (evt) => { this.api.pause(); });
		this.ui.fr                .addEventListener('click', (evt) => { this.api.fr(); });
		this.ui.ff                .addEventListener('click', (evt) => { this.api.ff(); });
		this.ui.turn_subtitles_on .addEventListener('click', (evt) => { this.api.turnSubtitlesOn(); });
		this.ui.turn_subtitles_off.addEventListener('click', (evt) => { this.api.turnSubtitlesOff(); });
		
		// Toggle visibility of buttons that share space on the screen
		this.ui.play_pause_ctr.addEventListener('click', (evt) => {
			Util.toggleClasses(this.ui.play_pause_ctr, 'show-play', 'show-pause');
		});
		this.ui.subtitle_ctr.addEventListener('click', (evt) => {
			Util.toggleClasses(this.ui.subtitle_ctr, 'show-turn-on', 'show-turn-off');
		});
	},

	init: function() {
		console.log('Initializing interface...');
		this.assignUiElements();
		this.assignCallbacks();
		console.log('Initialized interface.');
	}
};

document.addEventListener('DOMContentLoaded', (evt) => { Remote.init(); });
