import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaces: Definição de tipos clara
interface VmConfiguration {
  name: string;
  os: string;
  sizePreset: string;
  
  networkType: 'public' | 'private';
}

interface SelectOption {
    label: string;
    value: string;
}

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.html', 
  standalone: true, 
  imports: [CommonModule], 
  styleUrls: ['./pagina-inicial.scss'] 
})
export class PaginaInicialComponent { 
  
  vmConfig = signal<VmConfiguration>({
    name: '',
    os: 'ubuntu',
    sizePreset: 'standard_1_2', 
    networkType: 'public'
  });

  sizeOptions: SelectOption[] = [
    { label: '1 vCPU, 2GB RAM', value: 'standard_1_2' },
    { label: '2 vCPU, 4GB RAM', value: 'standard_2_4' },
    { label: '4 vCPU, 8GB RAM', value: 'standard_4_8' },
    { label: '8 vCPU, 16GB RAM', value: 'performance_8_16' },
  ];

  /**
   * Função auxiliar que extrai o valor de forma segura de qualquer input/select/radio.
   * Isso resolve os erros de 'Object is possibly null' e 'Property value does not exist on EventTarget'.
   */
  extractValue(event: Event): string {
      // Faz o type casting seguro para garantir que 'value' exista.
      const target = event.target as HTMLInputElement | HTMLSelectElement | null; 
      
      // Retorna o valor ou uma string vazia se for nulo
      return target?.value || ''; 
  }

  /**
   * Função de atualização principal. Recebe a chave a ser alterada e o Event completo.
   */
  updateVmConfig(key: keyof VmConfiguration, event: Event): void {
    const value = this.extractValue(event); // Usa a função segura para obter o valor

    // Tipagem explícita para currentConfig 
    this.vmConfig.update((currentConfig: VmConfiguration) => ({
      ...currentConfig,
      [key]: value as any 
    }));
  }

  // Validação
  isFormValid = computed(() => {
    // A validação verifica se o nome tem pelo menos 3 caracteres
    return this.vmConfig().name.length >= 3;
  });

  createVm(): void {
    if (this.isFormValid()) {
      console.log('Criando VM com config:', this.vmConfig()); 
      alert('Máquina Virtual criada com sucesso!');
    } else {
      alert('Por favor, preencha o Nome da Máquina (mínimo 3 caracteres).');
    }
  }
}