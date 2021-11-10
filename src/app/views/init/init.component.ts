import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasService } from 'src/app/canvas.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styles: [
  ]
})
export class InitComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onPlay(){
    this.router.navigate(['game']);
  }

  goCustomUser(){
    this.router.navigate(['custom-user'])
  }
}
