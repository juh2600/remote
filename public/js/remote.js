// snek_case for vars
// camelCase for functions
const Remote = {
	ui: {
		volume_up: null,
		volume_down: null,
		play: null,
		pause: null,
		play_pause_ctr: null,
		fr_1h: null,
		fr_10m: null,
		fr_30s: null,
		ff_30s: null,
		ff_10m: null,
		ff_1h: null,
		turn_subtitles_on: null,
		turn_subtitles_off: null,
		cycle_subtitles: null,
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
		volumeToggleMute: function() {
			console.log('Toggling mute');
			this.call('/volume/mute/toggle');
		},

		play: function() {
			console.log('Playing');
			this.call('/play');
		},
		pause: function() {
			console.log('Pausing');
			this.call('/pause');
		},
		stop: function() {
			console.log('Stopping');
			this.call('/stop');
		},

		seek_seconds: function(count = 0) {
			console.log(`Seeking ${count} seconds`);
			this.call('/seek/seconds', {count});
		},

		seek_minutes: function(count = 0) {
			console.log(`Seeking ${count} minutes`);
			this.call('/seek/minutes', {count});
		},

		seek_hours: function(count = 0) {
			console.log(`Seeking ${count} hours`);
			this.call('/seek/hours', {count});
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
		},
		cycleSubtitles: function() {
			console.log('Cycling subtitles');
			this.call('/subtitles/cycle');
		}
	},

	assignUiElements: function() {
		this.ui.volume_up = document.getElementById('volume-up');
		this.ui.volume_down = document.getElementById('volume-down');
		this.ui.volume_toggle_mute = document.getElementById('volume-toggle-mute');
		this.ui.play = document.getElementById('play');
		this.ui.pause = document.getElementById('pause');
		this.ui.stop = document.getElementById('stop');
		this.ui.play_pause_ctr = document.getElementById('play-pause-ctr');
		this.ui.fr_1h = document.getElementById('fr-1h');
		this.ui.fr_10m = document.getElementById('fr-10m');
		this.ui.fr_30s = document.getElementById('fr-30s');
		this.ui.ff_30s = document.getElementById('ff-30s');
		this.ui.ff_10m = document.getElementById('ff-10m');
		this.ui.ff_1h = document.getElementById('ff-1h');
		this.ui.turn_subtitles_on = document.getElementById('turn-subtitles-on');
		this.ui.turn_subtitles_off = document.getElementById('turn-subtitles-off');
		this.ui.cycle_subtitles = document.getElementById('cycle-subtitles');
		this.ui.subtitle_ctr = document.getElementById('subtitle-ctr');
	},

	assignCallbacks: function() {
		this.ui.volume_up         .addEventListener('click', (evt) => { this.api.volumeUp(); });
		this.ui.volume_down       .addEventListener('click', (evt) => { this.api.volumeDown(); });
		this.ui.volume_toggle_mute.addEventListener('click', (evt) => { this.api.volumeToggleMute(); });
		this.ui.play              .addEventListener('click', (evt) => { this.api.play(); });
		this.ui.pause             .addEventListener('click', (evt) => { this.api.pause(); });
		this.ui.stop              .addEventListener('click', (evt) => { this.api.stop(); });
		this.ui.fr_1h             .addEventListener('click', (evt) => { this.api.seek_hours(-1); });
		this.ui.fr_10m            .addEventListener('click', (evt) => { this.api.seek_minutes(-10); });
		this.ui.fr_30s            .addEventListener('click', (evt) => { this.api.seek_seconds(-30); });
		this.ui.ff_30s            .addEventListener('click', (evt) => { this.api.seek_seconds(30); });
		this.ui.ff_10m            .addEventListener('click', (evt) => { this.api.seek_minutes(10); });
		this.ui.ff_1h             .addEventListener('click', (evt) => { this.api.seek_hours(1); });
		this.ui.turn_subtitles_on .addEventListener('click', (evt) => { this.api.turnSubtitlesOn(); });
		this.ui.turn_subtitles_off.addEventListener('click', (evt) => { this.api.turnSubtitlesOff(); });
		this.ui.cycle_subtitles   .addEventListener('click', (evt) => { this.api.cycleSubtitles(); });
		
		// Toggle visibility of buttons that share space on the screen
		this.ui.play_pause_ctr.addEventListener('click', (evt) => {
			Util.toggleClasses(this.ui.play_pause_ctr, 'show-play', 'show-pause');
		});
		for (let subtitle_toggle of ['on', 'off'])
		this.ui['turn_subtitles_' + subtitle_toggle].addEventListener('click', (evt) => {
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
