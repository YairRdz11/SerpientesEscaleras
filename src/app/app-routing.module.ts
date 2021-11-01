import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameComponent } from "./views/game/game.component";
import { InitComponent } from "./views/init/init.component";
import { ManageTestComponent } from "./views/manage-test/manage-test.component";

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
    path: 'manage-test',
    component: ManageTestComponent
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
