import { Injectable, HttpException } from '@nestjs/common'
import * as uuid from 'uuid'
import { db } from '../db/sqlite'

@Injectable()
export class CitiesService {
  create(name: String, population: Number) {
    return new Promise((resolve, reject) => {
      console.log('=> Creating City : ' + name)
      db.run(
          "INSERT INTO cities (id, name, population)" +
          "VALUES (?, ?, ?)", [uuid.v1().replace(/-/g, ""), name, population], (err) => {
              return !err ?
                  resolve({'message':'City has been created'}) :
                  reject(new HttpException(err, 500))
      })
    })
  }

  getAllCities() {
    return new Promise((resolve, reject) => {
      console.log('=> Retrieving All Cities')
      db.all(
          "SELECT * FROM cities", function (err, rows) {
          return !err ?
              resolve(rows) :
              reject(new HttpException(err, 500))
      })
    })
  }

  getCity(name: String) {
    return new Promise((resolve, reject) => {
      console.log('=> Getting City : ' + name)
      db.get(
          "SELECT * FROM cities WHERE name = ?", [name], (err, row) => {
              return !err ?
                  resolve(row) :
                  reject(new HttpException(err, 500))
      })
    })
  }

  deleteUserCities(id: String) {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM userCities WHERE idUser = ?", [id], (err) => {
          return !err ?
            resolve({'message':'Cities for  ' + id + ' has been deleted'}) :
            reject(new HttpException(err, 500))
        })
    })
  }

  addUserCities(id: String, userCities: Array<any>) {
    let values = userCities.map((city) => `("${id}", "${city.id}", ${city.position})`).join(',')
    let request = 'INSERT INTO userCities(idUser, idCity, position) VALUES ' + values
    console.log('REQUEST IS == ', request)
    return new Promise((resolve, reject) => {
      console.log('=> Adding User\'s Cities : ' + id)
      db.run(request, (err, rows) => {
        return !err ?
          resolve({'message':'Cities has been created'}) :
          reject(new HttpException(err, 500))
      })
    })
  }

  getUserCities(id: String) {
    return new Promise((resolve, reject) => {
      console.log('=> Getting User\'s Cities : ' + id)
      db.all(
          "SELECT * FROM userCities WHERE idUser = ?", [id], (err, rows) => {
              return !err ?
                  resolve(rows) :
                  reject(new HttpException(err, 500))
      })
    })
  }

  addUserCity(idUser: String, idCity: String, position: Number) {
    return new Promise((resolve, reject) => {
      console.log('=> Adding UserCity')
      db.run(
          "INSERT INTO userCities (idUser, idCity, position)" +
          "VALUES (?, ?, ?)", [idUser, idCity, position], (err) => {
              return !err ?
                  resolve({'message':'City has been added'}) :
                  reject(new HttpException(err, 500))
      });
    })
  }
}
