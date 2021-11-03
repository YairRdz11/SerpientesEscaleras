import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameComponent } from "./views/game/game.component";
import { InitComponent } from "./views/init/init.component";

const routes: Routes = [
  {
    path: '',
    component: InitComponent
  },
  {
    path: 'game',
    component: GameComponent
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
