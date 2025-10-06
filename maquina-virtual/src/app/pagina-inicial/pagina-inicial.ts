import { Component, OnInit, signal, computed } from '@angular/app';

interface VmConfiguration {
  name: string;
  os: string;
  sizePreset: string;
  diskSize: string;
  networkZone: string;
  networkType: 'public' | 'private';
}

interface SelectOption {
    label: string;
    value: string;
}

@Component({
  selector: 'app-create-vm-compact',
  templateUrl: './create-vm-compact.component.html',
  styleUrls: ['./create-vm-compact.component.scss'],
  standalone: true, // Componente standalone (sem a necessidade de AppModule)
  // O CommonModule é necessário para o @for. Se for uma versão v17+, é importado automaticamente
  // imports: [CommonModule]
})
export class CreateVmCompactComponent implements OnInit {

  // 1. Definição do Signal para o estado do formulário
  vmConfig = signal<VmConfiguration>({
    name: '',
    os: 'ubuntu',
    sizePreset: 'standard_1_2', 
    diskSize: '20gb',
    networkZone: 'us-east',
    networkType: 'public'
  });

  sizeOptions: SelectOption[] = [
    { label: '1 vCPU, 2GB RAM', value: 'standard_1_2' },
    { label: '2 vCPU, 4GB RAM', value: 'standard_2_4' },
    { label: '4 vCPU, 8GB RAM', value: 'standard_4_8' },
    { label: '8 vCPU, 16GB RAM', value: 'performance_8_16' },
  ];

  constructor() { }

  ngOnInit(): void { }

  // 2. Função para atualizar o Signal (imutabilidade)
  updateVmConfig(key: keyof VmConfiguration, value: string): void {
    // Usamos o update para garantir a imutabilidade do objeto Signal
    this.vmConfig.update(currentConfig => ({
      ...currentConfig,
      [key]: value
    }));
  }

  // 3. Validação reativa com Computed Signal
  isFormValid = computed(() => {
    // Acessa o valor do Signal com vmConfig()
    const config = this.vmConfig();
    
    // Validação mínima: Verifica se o nome tem pelo menos 3 caracteres
    return config.name.length >= 3;
    // Adicione mais regras de validação aqui:
    // && !!config.os && !!config.sizePreset
  });

  // 4. Lógica de Criação
  createVm(): void {
    if (this.isFormValid()) {
      // Pega o valor atual do Signal para o payload
      console.log('Criando VM com config:', this.vmConfig()); 
      alert('Máquina Virtual criada com sucesso!');
    } else {
      alert('Por favor, preencha o Nome da Máquina.');
    }
  }
}