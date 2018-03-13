import mysql from 'mysql';

let connectionProperty = {};
connectionProperty['host'] = 'localhost';
connectionProperty['user'] = 'root';
connectionProperty['password'] = '';
connectionProperty['database'] = 'db_bitcoin';

function getConnection() {
    let connectionProperty = {};
    connectionProperty['host'] = 'localhost';
    connectionProperty['user'] = 'root';
    connectionProperty['password'] = '';
    connectionProperty['database'] = 'db_bitcoin';
    const connection = mysql.createConnection(connectionProperty);
    return connection.connect();
}

function closeConnection(connection) {
    if (connection) {
        connection.end();
    }
}

export function insertRecord(record, tableName, cb) {
    let queryString = '';
    let fields = '';
    let values = '';
    const keys = Object.keys(record);
    console.log('ssss', keys, record);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = record[key];
        if (fields === '') {
            fields = `${key}`;
        } else {
            fields = `${fields}, ${key}`;
        }
        if (values === '') {
            values = `'${value}'`;
        } else {
            values = `${values}, '${value}'`
        }
    }
    queryString = `insert into ${tableName} (${fields}) values (${values})`;
    console.log('insert query ===============', queryString);
    const connection = mysql.createConnection(connectionProperty);
    connection.query(queryString, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });
    closeConnection(connection);
}

export function updateRecord(record, tableName, condition, cb) {
    let queryString = '';
    let columns = '';
    const keys = Object.keys(record);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = record[key];
        if (key === 'id') {
            continue;
        }
        if (columns === '') {
            if (typeof value === 'string') {
                columns = `${key}='${value}'`;
            } else {
                columns = `${key}=${value}`;
            }
        } else {
            if (typeof value === 'string') {
                columns = `${columns},${key}='${value}'`;
            } else {
                columns = `${columns},${key}=${value}`;
            }
        }
    }
    queryString = `UPDATE ${tableName} SET ${columns} WHERE ${condition}`;
    const connection = mysql.createConnection(connectionProperty);
    connection.query(queryString, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });
    closeConnection(connection);
}

export function deleteRecord(recordIds, tableName, cb) {
    let queryString = '';
    let columns = '';
    for (let i = 0; i < recordIds.length; i++) {
        const value = recordIds[i];
        if (columns === '') {
            columns = `${value}`;
        } else {
            columns = `${columns},${value}`;
        }
    }
    queryString = `DELETE from ${tableName} WHERE id IN (${columns})`;
    const connection = mysql.createConnection(connectionProperty);
    connection.query(queryString, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });
    closeConnection(connection);
}

export function selectRecord(tableName, where, fields = [], cb) {
    let queryString = '';
    let columns = '';
    for (let i = 0; i < fields; i++) {
        const field = fields[i];
        
        if (columns === '') {
            columns = `${field}`;
        } else {
            columns = `${columns},${field}`;
        }
    }
    queryString = `select ${columns === '' ? '*' : columns} FROM ${tableName}`;
    if (where && where !== '') {
        queryString= `${queryString}  WHERE ${where}`;
    }
    const connection = mysql.createConnection(connectionProperty);
    connection.query(queryString, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });
    closeConnection(connection);
}