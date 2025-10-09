import { Routes } from '@angular/router';
// Importe o componente que você quer exibir na página inicial
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial'; 
// OBS: Ajuste o caminho conforme a sua estrutura de pastas!

export const routes: Routes = [
  { 
    path: '', 
    component: PaginaInicialComponent, // Diz ao Angular para carregar este componente na URL base (/)
    title: 'Criar Máquina Virtual' 
  },
  // Você adicionará a rota para a página de detalhes aqui depois:
  // { path: 'detalhes/:id', component: DetalhesVmComponent, title: 'Detalhes da VM' },
  // Rota de fallback para erros 404
  { path: '**', redirectTo: '' } 
];