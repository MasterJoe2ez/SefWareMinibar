import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import {User} from './user';


@Injectable()
export class UserService {


  users: AngularFireList<any> = null;
  user: User = new User();

  constructor(private db: AngularFireDatabase) { }

  getUserList() {
    this.users = this.db.list('users');
    return this.users;
  }


  createUser(user: User) {
    this.users.push({
      pin: user.pin,
      name: user.name,
      tel: user.tel,
    });
  }

  updateUser(user: User) {
      this.users.update(user.$key, {
        pin: user.pin,
        name: user.name,
        tel: user.tel,
      });
  }

  deleteUser(key: string) {
    this.users.remove(key);
  }


}
