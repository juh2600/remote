#!/usr/bin/node

process.env.NODE_ENV = 'debug';
const package = require('./package.json');

console.log(`Starting ${package.name} v${package.version}`);

require('dotenv').config();

const logger = require('logger').get('main');

logger.info('Requiring packages...');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
logger.info('Required packages.');

logger.info('Configuring Express...');
const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
logger.info('Configured Express.');

logger.info('Instantiating player...');
// Other files under ./api/ may expose an identical interface
let player = require('./api/mpv');
// TODO remove
//player.addToQueue('test.mp4');
logger.info('Instantiated player.');

logger.info('Configuring routes...');
let routeFiles = ['frontend', 'api'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
	logger.info(`Adding ${file} routes...`);
	let component = require(`./routes/${file}`);
	if(component.configure) component.configure({
		player,
		media_dir: process.env.MEDIA_DIR
	});
	routeManager.apply(app, component);
	logger.info(`Added ${file} routes.`);
});
logger.info('Configured routes.');


logger.info(`Listening on port ${process.env.PORT}`);
app.listen(process.env.PORT);
