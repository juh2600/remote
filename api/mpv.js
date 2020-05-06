let logger = require('logger').get('backend');

let mpv = new (require('node-mpv'))();

module.exports = {
	name: 'mpv',
	object: mpv,
	SEEK_INCREMENT: 10, // seconds

	setVolume: function(newVolume) { mpv.volume(newVolume); },
	volumeUp: function() { mpv.adjustVolume(5); },
	volumeDown: function() { mpv.adjustVolume(-5); },
	mute: function() { mpv.mute(); },
	unmute: function() { mpv.unmute(); },
	toggleMute: function() { mpv.toggleMute(); },

	play: function() { this.resetSpeed(); mpv.play(); },
	pause: function() { this.resetSpeed(); mpv.pause(); },
	togglePause: function() { this.resetSpeed(); mpv.togglePause(); },
	stop: function() { mpv.stop(); },

	// jump back: there's no true rewind; see https://github.com/mpv-player/mpv/issues/4000
	fr: function() { mpv.seek(-this.SEEK_INCREMENT); },
	// if paused, jump ahead
	// otherwise, speed up
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
