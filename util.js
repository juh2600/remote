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
	let name = uri.split('/').pop().split(/[._-]/);
	name.pop();
	name = name.filter((token) => {
		out = true;
		out &= !/1080/.test(token);
		out &= !/BluRay/i.test(token);
		out &= !/^x?\d{3}$/i.test(token);
		out &= !/yify/i.test(token);
		out &= !/yts/i.test(token);
		out &= !/]/i.test(token);
		out &= !/AAC/i.test(token);
		out &= !/(WEB|Br)Rip/i.test(token);
		return out;
	});
	if(/^\d{4}$/.test(name[name.length-1])) {
		name.unshift(name.pop());
		name[0] = `(${name[0]})`;
	}
	return name.join(' ');
};

// https://stackoverflow.com/questions/32210057/how-to-read-metadata-from-mp4-using-mp4-js-node-module#comment52337180_32210299
const findMovies = (dir, exts) => {
	let paths = findByExtension(dir, exts);
	let movies = [];

	paths.forEach((path) => {
		path = path.split(dir)[1];
		let title = convertPathToTitle(path);
		let year = /\d{4}/.test(title) ? ~~(title.match(/\d{4}/))[0] : 0 ;
		let movie = {
			path,
			title,
			year
		};
		movies.push(movie);
	});

	movies.sort((a, b) => {
		let left = a.year, right = b.year;
		if(left && right) {
			if(left < right) return -1;
			if(left > right) return  1;
		}
		// give up lol
		return 0;
	});

	return movies;
};

module.exports = { findByExtension, findMovies };
