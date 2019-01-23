import { Injectable, HttpException } from '@nestjs/common'
import * as uuid from 'uuid'
import { db } from '../db/sqlite'

@Injectable()
export class DogsService {
  getAllDogs() {
    return new Promise((resolve, reject) => {
      console.log('=> Retrieving All Dogs')
      db.all(
          "SELECT * FROM dogs", function (err, rows) {
          return !err ?
              resolve(rows) :
              reject(new HttpException(err, 500))
      })
    })
  }

  getDog(id: String) {
    return new Promise((resolve, reject) => {
      console.log('=> Getting Dog : ' + id)
      db.get(
          "SELECT * FROM dogs WHERE id = ?", [id], (err, row) => {
              return !err ?
                  resolve(row) :
                  reject(new HttpException(err, 500))
      })
    })
  }

  deleteUserDogs(id: String) {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM userDogs WHERE idUser = ?", [id], (err) => {
          return !err ?
            resolve({'message':'Dogs for  ' + id + ' has been deleted'}) :
            reject(new HttpException(err, 500))
        })
    })
  }

  addUserDogs(id: String, userDogs: Array<any>) {
    let values = userDogs.map((dog) => `("${id}", "${dog.idDog}", ${dog.position})`).join(',')
    let request = 'INSERT INTO userDogs(idUser, idDog, position) VALUES ' + values
    return new Promise((resolve, reject) => {
      console.log('=> Adding User\'s Dogs : ' + id)
      db.run(request, (err, rows) => {
        return !err ?
          resolve({'message':'Dogs has been created'}) :
          reject(new HttpException(err, 500))
      })
    })
  }

  getUserDogs(id: String) {
    return new Promise((resolve, reject) => {
      console.log('=> Getting User\'s Dogs : ' + id)
      db.all(
        "SELECT idDog, position, dogs.name, dogs.img FROM userDogs INNER JOIN dogs ON dogs.id = userDogs.idDog WHERE idUser = ? ORDER BY position", [id], (err, rows) => {
              return !err ?
                  resolve(rows) :
                  reject(new HttpException(err, 500))
      })
    })
  }

  addUserDog(idUser: String, idDog: String) {
    let position
    return new Promise((resolve, reject) => {
      console.log('=> Adding UserDog')
      db.get("SELECT MAX(position) as position FROM userDogs WHERE idUser = ?", [idUser], (err, row) => {
        if (!err) {
          position = row.position ? row.position + 1 : 1
          db.run(
            "INSERT INTO userDogs (idUser, idDog, position)" +
            "VALUES (?, ?, ?)", [idUser, idDog, position], (err) => {
              return !err ?
                resolve({'message':'Dog has been added'}) :
                reject(new HttpException(err, 500))
          })

        } else {
          reject(new HttpException(err, 500))
        }
      })
    })
  }
}
