import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public app_header: string = 'my app_header';


  constructor() {
    console.log('header says hello');
  }

  ngOnInit(): void {
  }

}
