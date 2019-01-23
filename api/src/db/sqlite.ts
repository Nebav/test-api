import Axios from 'axios'
import * as sqlite3 from 'sqlite3'
import * as uuid from 'uuid'

let sqlite = new sqlite3.Database(':memory:');

let sql_users = 'CREATE TABLE IF NOT EXISTS users (' +
  'id VARCHAR PRIMARY KEY, username VARCHAR NOT NULL)'
let sql_dogs = 'CREATE TABLE IF NOT EXISTS dogs(' +
  'id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, img VARCHAR)'
let sql_userDogs = 'CREATE TABLE IF NOT EXISTS userDogs(' +
  'idUser VARCHAR NOT NULL, idDog INTEGER NOT NULL, position INTEGER NOT NULL)'

let dogs = []

async function getDogImg(dog) {
  let res = await Axios.get(`https://dog.ceo/api/breed/${dog}/images/random`)
  if (res.status === 200) {
    return res.data.message
  }
}

async function getDogs() {
  let res = await Axios.get('https://dog.ceo/api/breeds/list/all')
  if (res.status === 200) {
    Object.keys(res.data.message).forEach((dog) => {
      if (res.data.message[dog].length === 0) {
        dogs.push({ name: dog, img: ''})
      }
    })
    return dogs
  }
}

getDogs().then(async (res) => {
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  let img = ''
  const start = async () => {
    await asyncForEach(dogs, async (dog, index) => {
      img = await getDogImg(dog.name)
      dogs[index].img = img
    })

    // DO THE REQUESTS HERE
    sqlite.serialize(function () {
      sqlite.run(sql_users)
      sqlite.run(sql_dogs)
      sqlite.run(sql_userDogs)
      sqlite.run('INSERT OR IGNORE INTO users(id, username) VALUES ("eb8814013b6c11e7b1a46b0d99a2ac51", "yahia")')
      dogs.forEach((dog, index) => {
        sqlite.run(`INSERT OR IGNORE INTO dogs(id, name, img) VALUES (${index}, "${dog.name}", "${dog.img}")`)
      })
    })

    console.log('Server is ready')
  }
  start()


})

export const db = sqlite