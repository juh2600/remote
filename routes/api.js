const logger = require('logger').get('frontend');

const { respond } = require('./util');

let player = null;
let media_dir = null;

const playNow = (req, res) => {
	let path = media_dir + req.body.path;
	player.playNow(path);
	respond(204, `Now playing ${req.body.path}`, res); // FIXME is this safe? // maybe you meant the uhh, playing a raw path thing
};

const getNowPlayingStats = (req, res) => {
	player.getStats().then((stats) => {
		//stats = JSON.stringify(stats, null, '\t');
		res.send(stats);
	}).catch((err) => {
		res.status(500).send(err);
	});
};

const volumeUp = (req, res) => {
	player.volumeUp();
	respond(204, 'Volume turned up', res);
};

const volumeDown = (req, res) => {
	player.volumeDown();
	respond(204, 'Volume turned down', res);
};

const volumeToggleMute = (req, res) => {
	player.toggleMute();
	respond(204, 'Volume mute toggled', res);
};

const volumeMute = (req, res) => {
	player.mute();
	respond(204, 'Volume muted', res);
};

const volumeUnmute = (req, res) => {
	player.unmute();
	respond(204, 'Volume unmuted', res);
};

const play = (req, res) => {
	player.play();
	respond(204, 'Played', res);
};

const pause = (req, res) => {
	player.pause();
	respond(204, 'Paused', res);
};

const stop = (req, res) => {
	player.stop();
	respond(204, 'Stopped', res);
};

const seek_seconds = (req, res) => {
	player.seek_seconds(req.body.count);
	respond(204, `Sought ${req.body.count} seconds`, res);
};

const seek_minutes = (req, res) => {
	player.seek_minutes(req.body.count);
	respond(204, `Sought ${req.body.count} minutes`, res);
};

const seek_hours = (req, res) => {
	player.seek_hours(req.body.count);
	respond(204, `Sought ${req.body.count} hours`, res);
};

const fr = (req, res) => {
	player.fr();
	respond(204, 'Fast reversed', res);
};

const ff = (req, res) => {
	player.ff();
	respond(204, 'Fast forwarded', res);
};

const turnSubtitlesOn = (req, res) => {
	player.turnSubtitlesOn();
	respond(204, 'Turned subtitles on', res);
};

const turnSubtitlesOff = (req, res) => {
	player.turnSubtitlesOff();
	respond(204, 'Turned subtitles off', res);
};


const routes = [
	{
		uri: '/play/now',
		methods: ['get'],
		handler: getNowPlayingStats
	},

	{
		uri: '/play/now',
		methods: ['post'],
		handler: playNow
	},

	{
		uri: '/volume/up',
		methods: ['get', 'post'],
		handler: volumeUp
	},

	{
		uri: '/volume/down',
		methods: ['get', 'post'],
		handler: volumeDown
	},

	{
		uri: '/volume/mute/on',
		methods: ['get', 'post'],
		handler: volumeMute
	},

	{
		uri: '/volume/mute/off',
		methods: ['get', 'post'],
		handler: volumeUnmute
	},

	{
		uri: '/volume/mute/toggle',
		methods: ['get', 'post'],
		handler: volumeToggleMute
	},

	{
		uri: '/play',
		methods: ['get', 'post'],
		handler: play
	},

	{
		uri: '/pause',
		methods: ['get', 'post'],
		handler: pause
	},

	{
		uri: '/stop',
		methods: ['get', 'post'],
		handler: stop
	},

	{
		uri: '/seek/seconds',
		methods: ['get', 'post'],
		handler: seek_seconds
	},

	{
		uri: '/seek/minutes',
		methods: ['get', 'post'],
		handler: seek_minutes
	},

	{
		uri: '/seek/hours',
		methods: ['get', 'post'],
		handler: seek_hours
	},

	{
		uri: '/speed/fr',
		methods: ['get', 'post'],
		handler: fr
	},

	{
		uri: '/speed/ff',
		methods: ['get', 'post'],
		handler: ff
	},

	{
		uri: '/subtitles/on',
		methods: ['get', 'post'],
		handler: turnSubtitlesOn
	},

	{
		uri: '/subtitles/off',
		methods: ['get', 'post'],
		handler: turnSubtitlesOff
	},
];


const configure = (options) => {
	player = options.player;
	media_dir = options.media_dir;
};

module.exports = { logger, routes, configure }
