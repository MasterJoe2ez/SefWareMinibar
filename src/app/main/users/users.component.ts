import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import { ITdDataTableColumn } from '@covalent/core';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'pin', label: 'PIN #', tooltip: 'Stock Keeping Unit'},
    { name: 'name', label: 'Name', width: 200 },
    { name: 'tel', label: 'Tel' },
  ];

  users: User[];

  constructor(private userService: UserService,
              private _dialogService: TdDialogService) {
    this.userService.user = {
      $key: null,
      pin: '',
      name: '',
      tel: '',
    };
  }


  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.pin.length;
  }

  ngOnInit() {

    let x = this.userService.getUserList();
    x.snapshotChanges().subscribe(item => {
      this.users = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.users.push(y as User);
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.value.$key === null) {
      this.userService.createUser(form.value);
    } else {
      this.userService.updateUser(form.value);
    }
    this.resetForm(form);
  }



  resetForm(form: NgForm) {
    if (form !== null) {
      form.reset();
      this.userService.user = {
        $key: null,
        pin: '',
        name: '',
        tel: '',
      };
    }
  }

  onDelete(form: NgForm) {
    if (confirm('Are you sure to delete this record ?')) {
      this.userService.deleteUser(form.value.$key);
      this.resetForm(form);
    }
  }

  onItemClick(user: User) {
    this.userService.user = Object.assign({}, user);
  }

}
