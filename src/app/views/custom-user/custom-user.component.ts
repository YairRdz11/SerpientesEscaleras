import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasService } from 'src/app/canvas.service';
import { Player } from 'src/app/models/player';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-custom-user',
  templateUrl: './custom-user.component.html',
  styleUrls: ['./custom-user.component.css']
})
export class CustomUserComponent implements OnInit {
  playerList: Player[] = [];
  playerCount: number = 0;
  sizeBoard: number = 0;

  constructor(private router:Router, private _canvasService: CanvasService) { }

  ngOnInit(): void {
  }

  buildTextInputs(){
    this.playerList = [];
    for(let i = 0; i < this.playerCount; i++){
      let player = new Player();
      this.playerList.push(player);
    }

  }

  showNames(){
    console.log(this.playerList);
  }
  goGame(){
    if(this.playerList.length > 0 && this.playerList.every(x=> x.name.trim().length > 0)
      && this.sizeBoard > 0){
      this._canvasService.initPlayer(this.playerList);
      this._canvasService.setSizeBoard(this.sizeBoard);
      this.router.navigate(['game']);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa los datos necesarios'
      });
    }
  }
  goBack(){
    this.router.navigate(['']);
  }

}
