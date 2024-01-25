import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './core/models/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', desc: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', desc: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', desc: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', desc: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', desc: 'Trabalhos como freelancer' },
    ];

    return { categories };
  }
}
