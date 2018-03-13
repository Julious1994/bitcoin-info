import React from 'react';
  
class Service {
    constructor(props) {
        this.state = {
            baseUrl: 'http://coincap.io'
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        this.headers = headers;    
    }

    fetch(url, options = {}) {
        return fetch(url, options);
    }    

    request(url, data = {}, config = {}) {
        const options = Object.assign({
          method: 'POST',
          mode: 'cors',
          headers: this.headers,
          body: JSON.stringify(data),
        }, config);
    
        if (options.method === 'GET') {
          delete options.body;
        }
        return this.fetch(url, options);
      }
    

    get(apiUrl) {
        const config = {
            method: 'GET',
        };
        const url = `${this.state.baseUrl}${apiUrl}`;
        return this.request(url, {}, config);
    }
}

export default Service;