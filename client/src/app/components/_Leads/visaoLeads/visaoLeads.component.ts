import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { Subject, Observable, catchError, of } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { MensageriaService } from '../../../services/mensageria.service';
import { Leads } from '../../../models/leads.model';
import { LeadsService } from '../../../services/leads.service';

@Component({
  selector: 'app-visao-leads',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink, NgxMaskPipe],
  templateUrl: './visaoLeads.component.html',
  styleUrl: './visaoLeads.component.scss'
})
export class VisaoLeadsComponent {
  error$ = new Subject<boolean>();
  allLeads$ = new Observable<Leads[]>();

  leadsExclude = '';

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas: number[] = [];
  qtdLeads = 0;
  qtdMostrado = 5;


  constructor(
    private leadsService: LeadsService,
    private loginService: LoginService,
    private messageriaService: MensageriaService) { }
  ngOnInit() {
    this.paginas = [];
    this.leadsService.getLeadsWithHeaders(this.offset, this.limit)
    .pipe(
      catchError(err => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
        this.error$.next(true)
        if (err.statusText === "Unauthorized") {
          alert("Seu iToken foi expirado! Realize o login novamente")
          this.loginService.deslogar();
        }
        return of();
      })
    ).subscribe({
      next: (result) => {
        this.allLeads$ = this.leadsService.allLeadsS$;
        this.qtdLeads = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdLeads / this.limit); index++) {
          this.paginas.push(index);
        }
        if (this.qtdMostrado > this.qtdLeads) this.qtdMostrado = this.qtdLeads

      },
      error: (err) => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
      }
    });
  }

  // event = "Excluir";
  excludeLeads(id: string, event: string | null) {
    if (!event) this.leadsExclude = id;
    if (event === 'clear') this.leadsExclude = '';
  }

  deletLeads(id:string) {
    this.leadsService.deleteLeads(id)
      .pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          return of();
        })
      ).subscribe(() => {
        this.messageriaService.messagesRequest('Sucesso!', 'Leads Excluído Com Sucesso!', 'messages', 'success')
        this.ngOnInit()
      })
  }

  buscar() {
    this.offset = 0;
    this.paginar(1)
  }

  paginar(pagina: number) {
    this.paginaAtual = pagina;
    let of = pagina - 1
    this.offset = (of * this.limit);
    this.qtdMostrado = (pagina * this.limit)
    if (this.qtdMostrado > this.qtdLeads) this.qtdMostrado = this.qtdLeads
    this.ngOnInit()
  }

  passar(type: string) {
    switch (type) {
      case 'next':
        if (this.paginaAtual >= this.paginas.length) return
        this.paginaAtual += 1;
        this.paginar(this.paginaAtual)
        break;
      case 'back':
        if (this.paginaAtual === 1) return
        this.paginaAtual -= 1;
        this.paginar(this.paginaAtual)
        break;
    }
  }


}
