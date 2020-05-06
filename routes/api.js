const logger = require('logger').get('frontend');

const { respond } = require('./util');

let player = null;
let media_dir = null;

const playNow = (req, res) => {
	let path = media_dir + req.body.path;
	player.playNow(path);
	respond(204, `Now playing ${req.body.path}`, res); // FIXME is this safe?
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

const play = (req, res) => {
	player.play();
	respond(204, 'Played', res);
};

const pause = (req, res) => {
	player.pause();
	respond(204, 'Paused', res);
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
