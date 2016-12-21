const mysql      = require('mysql');
let config = require('../user-pass.json');
let connection = null;


connect()
  .then(createDatabase)
  .then(connect)
  .then(createTable)
  .then(()=>{
    connection.end();
    console.log("Success");
  })
  .catch((err)=>{
    console.log(err);
    connection.end()
  });


function connect() {
  connection = mysql.createConnection(config.mysql);
  return new Promise((res, rej)=>{
    connection.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        rej(err);
        return;
      }
      res(connection)
    });
  })
}

function createDatabase() {
  return new Promise((resolve, reject)=>{
    connection.query('CREATE DATABASE IF NOT EXISTS `monitoring` CHARACTER SET utf8 COLLATE utf8_general_ci', (err, rows, field)=>{
      if(err) {
        console.log('Error createDatabase');
        reject(err);
      }else {
        config.mysql['database'] = 'monitoring';
        connection.end((err)=>{
          if(err){
            reject(err);
            return;
          }
          resolve(connection)
        });
      }
    });
  })
}

function createTable() {
  return new Promise((res, rej)=>{
    const query  = 'CREATE TABLE IF NOT EXISTS `monitoring`.`user` ' +
      '( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(16) NOT NULL , `pass` VARCHAR(16) NOT NULL , `opt` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;';
    connection.query(query, (err)=>{
      if(err){
        console.log('Error createTable');
        rej(err);
        return;
      }
      res(connection);
    })
  })
}