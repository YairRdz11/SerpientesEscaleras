import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomUserComponent } from "./views/custom-user/custom-user.component";
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
  },
  {
    path: 'custom-user',
    component: CustomUserComponent
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
