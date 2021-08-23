import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InitComponent } from "./views/init/init.component";

const routes: Routes = [
  {
    path: '',
    component: InitComponent
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }