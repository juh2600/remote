const path = require('path')
const fs = require('fs')
const child_process = require('child_process');
const logger = require('logger').get('util');

// https://gist.github.com/victorsollozzo/4134793
const findByExtension = (base, exts, files, result) => {
	files = files || fs.readdirSync(base);
	result = result || [];

	files.forEach((file) => {
		var newbase = path.join(base,file)
		if(fs.statSync(newbase).isDirectory())
			try {
				result = findByExtension(newbase, exts, fs.readdirSync(newbase), result);
			} catch(err) {
				logger.error(err);
			}
		else
			exts.forEach((ext) => { if(file.substr(-1*(ext.length+1)) == '.' + ext) result.push(newbase); });
	});
	return result;
};

const convertPathToTitle = (uri) => {
	return uri.split('/').pop().split('.').filter((token) => {
		out = true;
		out &= !/1080/.test(token);
		out &= !/BluRay/i.test(token);
		out &= !/x\d{3}/i.test(token);
		out &= !/yify/i.test(token);
		out &= !/mp4/i.test(token);
		return out;
	}).join(' ');
};

// https://stackoverflow.com/questions/32210057/how-to-read-metadata-from-mp4-using-mp4-js-node-module#comment52337180_32210299
const findMovies = (dir, exts) => {
	let paths = findByExtension(dir, exts);
	let movies = [];

	paths.forEach((path) => {
		let movie = {
			path: path.split(dir)[1],
			title: convertPathToTitle(path)
		};
		movies.push(movie);
	});

	return movies;
};

module.exports = { findByExtension, findMovies };
