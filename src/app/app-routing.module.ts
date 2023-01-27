import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardRoutingModule } from "./modules/dashboard/dashboard-routing.module";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' } // redirectTo: '/dashboard' => es del path del dashboard-routing.module.ts
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { enableTracing: false, useHash: true }
    ),
        DashboardRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }