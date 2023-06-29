import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  
  colecaoDogs: any[] = [];
  key = 'dogs';

  constructor() { }

  Salvar(nomes: string, idades: string, imagens: string) {
    const dados = { nome: nomes, idade: idades, imagem: imagens };

    const values = localStorage.getItem(this.key);

    if (!values) {
      this.colecaoDogs.push(dados);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoDogs));
    } else {
      const colecao: any[] = this.listar()!;
      colecao.push(dados);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }

  listar() {
    const values = localStorage.getItem(this.key);

    if (!values) return;

    const colecao: any[] = JSON.parse(values);
    return colecao;
  }

  deletar(param: any){
    const values = this.listar();
    const result = values?.filter(dog => dog.imagem !== param);

    localStorage.setItem(this.key, JSON.stringify(result))
  }
  
}
