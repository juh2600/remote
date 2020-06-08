const logger = require('logger').get('frontend');
const { findMovies } = require('../util');


const finder = (req, res) => {
	let movies = findMovies(process.env.MEDIA_DIR, require('../formats'));
	res.render('finder', {
		dir: process.env.MEDIA_DIR,
		movies: movies
	});
};

const remote = (req, res) => {
	res.render('remote', {});
};


const routes = [
	{
		uri: '/',
		methods: ['get'],
		handler: finder
	},

	{
		uri: '/remote',
		methods: ['get'],
		handler: remote
	}
];


module.exports = { logger, routes }
