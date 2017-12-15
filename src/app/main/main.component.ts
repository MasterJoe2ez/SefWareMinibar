import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TdMediaService} from '@covalent/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  routes: Object[] = [{
    title: 'Home',
    route: '/main',
    icon: 'home',
  }, {
    title: 'Items',
    route: '/main/items',
    icon: 'book',
  }, {
    title: 'Users',
    route: '/main/users',
    icon: 'book',
  }, {
    title: 'Report',
    route: '/main/reports',
    icon: 'book',
  },
  ];

  constructor(public _media: TdMediaService,
              public router: Router) { }

  ngOnInit() {
  }

}
