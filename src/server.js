import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

import App from './app';
import News from './app/News';
import template from './template';

const server = express();

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		console.log(file)
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});

const upload = multer({ storage: storage}).single('image');

// for parsing application/json
server.use(bodyParser.json()); 

// for parsing application/xwww-
server.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
// server.use(upload.single('image')); 
server.use(express.static('public'));

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const isMobile = true;
  const initialState = { isMobile, baseUrl: req.get('host'), params: {module: '/'}};
  const appString = renderToString(<App {...initialState} />);

  res.send(template({
    body: appString,
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
});

server.post('/upload', (req, res) => {
  // console.log('upload call', req.file.path);
  upload(req, res, function(err) {
    res.send({ url: 'test.png'});
  });
  // const initialState = { params: req.params, baseUrl: req.get('host') };
  // const appString = renderToString(<App {...initialState}/>);
})

server.get('/:module?/:news_url?', (req, res) => {
  console.log(req.get('host'));
  const initialState = { params: req.params, baseUrl: req.get('host') };
  const appString = renderToString(<App {...initialState}/>);
  res.send(template({
    body: appString,
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
})

server.listen(8080);
console.log('listening');
