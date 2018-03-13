import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';
import session from 'express-session';
import multer from 'multer';
import mysql from 'mysql';
import path from 'path';

import App from './app';
import AdminApp from './admin';
import News from './app/News';
import template from './template';
import adminTemplate from './admin-template';

import { insertRecord, updateRecord, selectRecord, deleteRecord } from './mysql_db';

const server = express();
server.use(session({secret: "BTC#CTB"}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_bitcoin',
});

var storage = multer.diskStorage({
	destination: './uploads',
	filename: function(req, file, callback) {
    console.log('multer', file.originalname);
    callback(null, file.originalname)
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

server.use('/assets',express.static('assets'));
server.use('/uploads',express.static('uploads'));
server.use('/favicon.ico', express.static('favicon.ico'));

server.get('/', (req, res) => {
  const isMobile = true;
  const initialState = { isMobile, baseUrl: 'http://' + req.get('host'), params: {module: '/'}};
  const appString = renderToString(<App {...initialState} />);
  console.log('xxxxx');
  res.send(template({
    body: appString,
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
});

// server.get('/admin', (req, res) => {
//   const initialState = { baseUrl: 'http://' + req.get('host'), params: {module: '/admin'}};
//   const appString = renderToString(<AdminApp {...initialState} />);

//   res.send(adminTemplate({
//     body: appString,
//     title: 'Hello World from the server',
//     initialState: JSON.stringify(initialState)
//   }));
// });

server.post('/upload', (req, res) => {
  upload(req, res, function(err) {
    const originalFileName = req.file.filename
    res.send({ url: originalFileName});
  });
});

// server.post('/rest/news/search?', (req, res) => {
  
// });

server.delete('/rest/news', (req, res) => {
  const ids = req.body.ids || [];
  const table = 'tbl_news';
  if (ids.length > 0) {
    deleteRecord(ids, table, (result) => {
      res.send(result);
    });
  }
});

server.post('/rest/news/:id?', (req, res) => {
  const data = req.body.data;
  const table = 'tbl_news';
  if (req.params.id) {
    const condition = 'id='+req.params.id;
    updateRecord(data, table, condition, (result) => {
      res.send(result);
    });
  } else {
    insertRecord(data, table, (result) => {
      res.send(result);
    });
  }
});

server.get('/favicon.ico', function(req, res) {
  res.status(204);
});

server.get('/admin/logout', function(req,res) {
  req.session.destroy(function(){
    res.redirect('/admin');
  });
});

server.post('/admin/login', function(req,res) {
  const data = req.body;
  const where = `username='${data.userName}' and password='${data.password}'`;
  const table = 'tbl_user';
  const fields = ['id', 'username', 'password'];
  selectRecord(table, where, fields, function(record) {
    if (record.length > 0) {
      const auth = record[0];
      if (auth.password === data.password) {
        req.session.user = auth;
        res.redirect('/admin/post');
      }
    } else {

    }
  });
});

server.get('/admin/', function(req, res) {
  const params = Object.assign({}, req.params, {
    module: 'login',
  });
  const initialState = { params, siteType: 'admin', baseUrl: 'http://' + req.get('host') };
  const appString = renderToString(<AdminApp {...initialState}/>);
  res.send(adminTemplate({
    body: appString,
    title: 'Login',
    initialState: JSON.stringify(initialState)
  }));
});

server.get('/admin/post/:artical?', function(req, res) {
  if (!req.session.user) {
    res.redirect('/admin');
  }
  const params = Object.assign({}, req.params, {
    module: 'post',
  });
  const initialState = { params, siteType: 'admin', baseUrl: 'http://' + req.get('host') };
  const appString = renderToString(<AdminApp {...initialState}/>);
  if (req.params.artical) {
    if (req.params.artical === 'create-post') {
      initialState.data = { artical: null, isNew: true };
      res.send(adminTemplate({
        body: appString,
        title: 'bitcoin news',
        initialState: JSON.stringify(initialState)
      }));
    } else {
      getArtical(req.params.artical).then(result => {
        initialState.data = { artical: result, isNew: false };
        res.send(adminTemplate({
          body: appString,
          title: 'bitcoin news',
          initialState: JSON.stringify(initialState)
        }));
      });
    }
  } else {
    getNewsList().then(result => {
      initialState.data = { newsList: result };
      res.send(adminTemplate({
        body: appString,
        title: 'bitcoin news',
        initialState: JSON.stringify(initialState)
      }));
    });
  }
});

server.get('/market/:coin?', (req, res) => {
  const params = Object.assign({}, req.params, {
    module: 'market',
  });
  const initialState = { params, baseUrl: 'http://' + req.get('host') };
  const appString = renderToString(<App {...initialState}/>);
  res.send(template({
    body: appString,
    title: 'Crypto Market',
    initialState: JSON.stringify(initialState)
  }));
});

server.get('/calculator/:coin?', (req, res) => {
  const params = Object.assign({}, req.params, {
    module: 'calculator',
  });
  const initialState = { params, baseUrl: 'http://' + req.get('host') };
  const appString = renderToString(<App {...initialState}/>);
  res.send(template({
    body: appString,
    title: 'Crypto Calculator',
    initialState: JSON.stringify(initialState)
  }));
});

server.get('/upcoming-icos/:coin?', (req, res) => {
  const params = Object.assign({}, req.params, {
    module: 'upcoming-icos',
  });
  const initialState = { params, baseUrl: 'http://' + req.get('host') };
  const appString = renderToString(<App {...initialState}/>);
  res.send(template({
    body: appString,
    title: 'Crypto ICOs',
    initialState: JSON.stringify(initialState)
  }));
});

server.get('/news/:artical?', (req, res) => {
  const params = Object.assign({}, req.params, {
    module: 'news',
  });
  const initialState = { params, baseUrl: 'http://' + req.get('host') };
  const appString = renderToString(<App {...initialState}/>);
  if (req.params.artical) {
    getArtical(req.params.artical).then(result => {
      initialState.data = { artical: result };
      res.send(template({
        body: appString,
        title: 'bitcoin news',
        initialState: JSON.stringify(initialState)
      }));
    });
  } else {
    getNewsList().then(result => {
      console.log(res);
      initialState.data = { newsList: result };
      res.send(template({
        body: appString,
        title: 'bitcoin news',
        initialState: JSON.stringify(initialState)
      }));
    });
  }
});

function getNewsList() {
  return new Promise((resolve, reject) => {
    selectRecord('tbl_news', '', null, (records) => {
      // console.log(records);
      resolve(records || []); 
    });
  });
}

function getArtical(artical) {
  return new Promise((resolve, reject) => {
    const where = `slug_url='${artical}'`;
    selectRecord('tbl_news', where, null, (records) => {
      // console.log(records);
      resolve(records || []); 
    });
  });
}

// server.get('/:module?/:news_url?', (req, res) => {
//   const initialState = { params: req.params, baseUrl: 'http://' + req.get('host') };
//   const appString = renderToString(<App {...initialState}/>);
//   res.send(template({
//     body: appString,
//     title: 'Hello World from the server',
//     initialState: JSON.stringify(initialState)
//   }));
// })

server.listen(8080);
console.log('listening');
