import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    board: any[] = [];
    
  constructor() { }

  ngOnInit() {
      for(let i = 0; i < 100; i++)
          this.board.push(0);
  }

}
