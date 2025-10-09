import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// CORREÇÃO:
// 1. Usamos a classe PaginaInicialComponent.
// 2. Removemos a extensão '.ts' do import.
// 3. Assumimos o caminho 'pagina-inicial/pagina-inicial' com base no seu erro anterior.
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    CommonModule,
    PaginaInicialComponent // Adicionado o componente de Página Inicial
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('maquina-virtual');
}