import { Component } from "@angular/core";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.html',
    styleUrl: './main-page.scss'
})
export class MainPage {
    navItems = ["Inicio", "Sobre", "Soluções e Serviços", "Parceiros", "Contato", "Trabalhe Conosco"]
}