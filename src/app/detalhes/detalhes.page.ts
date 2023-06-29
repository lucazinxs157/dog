import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DogService } from 'src/environments/services/dog-service.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  dog = { nome: '', idade: '', imagem: '' };
  public dogs: any[] = [];

  constructor(
    public nav: NavController,
    public alerta: AlertController,
    public servicos: DogService
  ) {}

  ngOnInit() {
    this.carregaDados();
  }

  carregaDados() {
    if (this.servicos.listar()) {
      this.dogs = this.servicos.listar()!;

      if (this.dogs.length == 0) {
        this.voltar();
      }
    }
  }

  Deletar(imagem: string) {
    this.servicos.deletar(imagem);
    this.carregaDados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO!',
      message: 'Nenhum cachorro encontrado, cadastre um novo!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.navigateBack('/');
          },
        },
      ],
    });

    await voltando.present();
  }

  async novo() {
    const adicionando = await this.alerta.create({
      header: 'ATENÇÃO!',
      message: 'Deseja adicionar um novo endereço?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.navigateRoot('/');
          },
        },
        {
          text: 'Cancelar',
          handler: () => {},
        },
      ],
    });

    await adicionando.present();
  }
}
