let logger = require('logger').get('backend');

let mpv = new (require('node-mpv'))();

module.exports = {
	name: 'mpv',
	object: mpv,

	setVolume: function(newVolume) { mpv.volume(newVolume); },
	volumeUp: function() { mpv.unmute(); mpv.adjustVolume(5); },
	volumeDown: function() { mpv.unmute(); mpv.adjustVolume(-5); },
	mute: function() { mpv.mute(); },
	unmute: function() { mpv.unmute(); },
	toggleMute: function() { mpv.toggleMute(); },

	play: function() { this.resetSpeed(); mpv.play(); },
	pause: function() { this.resetSpeed(); mpv.pause(); },
	togglePause: function() { this.resetSpeed(); mpv.togglePause(); },
	stop: function() { mpv.stop(); },

	// seek
	seek_seconds: function(s) { mpv.seek(s); },
	seek_minutes: function(m) { mpv.seek(m*60); },
	seek_hours: function(h) { mpv.seek(h*60*60); },

	// fast forward/reverse
	// jump back: there's no true rewind; see https://github.com/mpv-player/mpv/issues/4000
	fr: function() { this.seek_seconds(-10); },
	ff: function() { mpv.multiplyProperty('speed', 2); },
	resetSpeed: function() { mpv.speed(1); },

	turnSubtitlesOn: function() { mpv.showSubtitles(); },
	turnSubtitlesOff: function() { mpv.hideSubtitles(); },

	addToQueue: function(uri) {
		mpv.load(uri, 'append-play');
	},
	playNow: function(uri) {
		mpv.load(uri, 'replace');
	},
	// getters are promises, so use e.g. getStats().then((stats) => {})
	getStats: async function() {
		return {};
	}

};
