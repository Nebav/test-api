import * as sqlite3 from 'sqlite3'
import * as uuid from 'uuid'

let sqlite = new sqlite3.Database(':memory:');

let sql_users = 'CREATE TABLE IF NOT EXISTS users (' +
  'id VARCHAR PRIMARY KEY, username VARCHAR NOT NULL)'
let sql_cities = 'CREATE TABLE IF NOT EXISTS cities(' +
  'id VARCHAR PRIMARY KEY, name VARCHAR NOT NULL, population INTEGER NOT NULL)'
let sql_userCities = 'CREATE TABLE IF NOT EXISTS userCities(' +
  'idUser VARCHAR NOT NULL, idCity VARCHAR NOT NULL, position INTEGER NOT NULL)'

let sql_populate =

sqlite.serialize(function () {
  sqlite.run(sql_users)
  sqlite.run(sql_cities)
  sqlite.run(sql_userCities)
  sqlite.run('INSERT OR IGNORE INTO users(id, username) VALUES ("eb8814013b6c11e7b1a46b0d99a2ac51", "yahia")')

  sqlite.run('INSERT OR IGNORE INTO cities(id, name, population) VALUES ("' + uuid.v1().replace(/-/g, "") + '", "Paris", 12423)')
  sqlite.run('INSERT OR IGNORE INTO cities(id, name, population) VALUES ("' + uuid.v1().replace(/-/g, "") + '", "London", 54161)')
  sqlite.run('INSERT OR IGNORE INTO cities(id, name, population) VALUES ("' + uuid.v1().replace(/-/g, "") + '", "Beyrouth", 45332)')
  sqlite.run('INSERT OR IGNORE INTO cities(id, name, population) VALUES ("' + uuid.v1().replace(/-/g, "") + '", "Madrid", 985424)')
  sqlite.run('INSERT OR IGNORE INTO cities(id, name, population) VALUES ("' + uuid.v1().replace(/-/g, "") + '", "Dublin", 785213)')

})

export const db = sqlite