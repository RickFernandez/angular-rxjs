import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, filter, debounceTime, distinctUntilChanged, catchError, throwError, EMPTY, of } from 'rxjs';
import { LivrosResultado } from 'src/app/models/LivroResultado';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';
import { LivroService } from 'src/app/services/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private livroService: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3 ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => {
      return this.livroService.buscar(valorDigitado);
    }),
    map ((res) => this.livrosResultado = res),
    map ((res) => res.items ?? []),
    map((items) =>  this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      console.error(erro)
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro... Recarregue a aplicação.'))
    })
  )

  livrosResultadoParaLivros(items): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    });
  }
}
