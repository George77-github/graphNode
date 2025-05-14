import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

export const routes: Routes = [
    {path:'', redirectTo:'graph', pathMatch:'full'},
    {path:'graph', component:GraphComponent}
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    providers:[
        provideAnimations()
    ]
  })

  export class AppModule{}
