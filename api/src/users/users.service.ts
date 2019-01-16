import { Injectable, HttpException } from '@nestjs/common'
import * as uuid from 'uuid'
import { db } from '../db/sqlite'

@Injectable()
export class UsersService {

  create(username: String) {
    return new Promise((resolve, reject) => {
      console.log('=> Creating User : ' + username)
      db.run(
          "INSERT INTO users (id, username)" +
          "VALUES (?, ?)", [uuid.v1().replace(/-/g, ""), username], (err) => {
              return !err ?
                  resolve({'message':'User has been registered'}) :
                  reject(new HttpException(err, 500))
      })
  })
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      console.log('=> Retrieving All Users')
      db.all(
          "SELECT * FROM users", function (err, rows) {
          return !err ?
              resolve(rows) :
              reject(new HttpException(err, 500))
      })
    })
  }

  getUser(username: String) {
    return new Promise((resolve, reject) => {
      console.log('=> Getting User : ' + username)
      db.get(
          "SELECT * FROM users WHERE username = ?", [username], (err, row) => {
              return !err ?
                  resolve(row) :
                  reject(new HttpException(err, 500))
      })
    })
  }
}
