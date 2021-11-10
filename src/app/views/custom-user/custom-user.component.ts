import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-user',
  templateUrl: './custom-user.component.html',
  styleUrls: ['./custom-user.component.css']
})
export class CustomUserComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goPlay(){
    this.router.navigate(['game']);
  }

}
