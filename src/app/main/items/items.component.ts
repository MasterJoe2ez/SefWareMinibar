import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Item} from '../../shared/item';
import {ItemsService} from '../../shared/items.service';
import { ITdDataTableColumn } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import {MatDialog} from '@angular/material';
import {ItemDialogComponent} from './item-dialog/item-dialog.component';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'ID #', tooltip: 'Stock Keeping Unit'},
    { name: 'name', label: 'Name', width: 200 },
    { name: 'cost', label: 'Cost' },
    { name: 'sell', label: 'Sell' },
    { name: 'amount', label: 'Amount (US$)'},
  ];

  items: Item[];

  constructor(private itemService: ItemsService,
              private _dialogService: TdDialogService,
              private dialog: MatDialog) {
    // this.itemService.item = {
    //   $key: null,
    //   id: '',
    //   name: '',
    //   amount: 0,
    //   cost: 0,
    //   sell: 0,
    // };
  }
  addData() {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      disableClose: true,
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // this.msgs = [];
        // this.msgs.push({severity: 'success', detail: 'Data updated'});
      }
    });
  }
  editData(data: Item) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      disableClose: true,
      width: '80%',
      height: '80%',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // this.msgs = [];
        // this.msgs.push({severity: 'success', detail: 'Data updated'});
      }
    });
  }


  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.pin.length;
  }

  ngOnInit() {
    const x = this.itemService.getItemList();
    x.snapshotChanges().subscribe((item) => {
      this.items = [];
      item.forEach((element) => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.items.push(y as Item);
      });
    });
  }


  onSubmit(form: NgForm) {
    if (form.value.$key === null) {
      this.itemService.createItem(form.value);
    } else {
      this.itemService.updateItem(form.value);
    }
    // this.resetForm(form);
  }



  // resetForm(form: NgForm) {
  //   if (form !== null) {
  //     form.reset();
  //     this.itemService.item = {
  //       $key: '',
  //       id: '',
  //       name: '',
  //       amount: 0,
  //       cost: 0,
  //       sell: 0,
  //     };
  //   }
  // }

  onDelete(form: NgForm) {
    if (confirm('Are you sure to delete this record ?')) {
      this.itemService.deleteItem(form.value.$key);
      // this.resetForm(form);
    }
  }

  // onItemClick(item: Item) {
  //   this.itemService.item = Object.assign({}, item);
  // }

}
