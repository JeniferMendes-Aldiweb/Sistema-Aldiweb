import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import {Leads,CreateLeads} from '../models/leads.model';
import { FormatsService } from './formats.service';
import { PessoaService } from './pessoa.service';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  private url = `${environment.api}/lead`;
  public qtdLeads: number | null = 0;

    private usuario = {
    usuario: '',
    nome: '',
    ativo: 2,
    perfil: 'cliente',
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    senha: '',
    email: 'cliente123',
  }
  private pessoa = {
    nome: '',
    cpf: '',
    dtnascimento: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    naturalidade: '',
    nacionalidade: '',
    usuario: '',
    nroidentidade: '',
    orgaoemissorident: '',
    estadoemissorident: '',
    zusuario_usuario: '',
    dtcriacao: '',
    dtalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: ''
  };

  private leadsSubject = new BehaviorSubject<Leads[]>([]);
  public allLeadsS$ = this.leadsSubject.asObservable();


  constructor(
    private httpClient: HttpClient,
    private formatService: FormatsService,
    private usuarioService: UsuariosService,
    private pessoaService: PessoaService,
  ) { }

  registerLeads(newLeads: CreateLeads) {
    console.log(newLeads)
    return this.httpClient.post<CreateLeads>(this.url, newLeads)
  }

  getLeadsWithHeaders(offset: number, limit: number): Observable<{ leads: Leads[], headers: HttpHeaders }> {
    return this.httpClient.get<Leads[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
      .pipe(
        map(response => {
          const leads = response.body || []; // Extrai o corpo da resposta corretamente
          this.leadsSubject.next(leads);
          const headers = response.headers;
          return { leads, headers };
        })
      );
  }

  Allleads() {
    return this.httpClient.get<Leads[]>(`${this.url}/all/`)
  }

  leadsCurrent(id: number) {
    return this.httpClient.get<Leads[]>(`${this.url}/${id}`)
  }

  editLeads(leads: CreateLeads) {
    return this.httpClient.put<Leads>(this.url, leads)
  }

  deleteLeads(id: string) {
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  editLeadsEtapa(etapa:number,id:string){
    return this.httpClient.put<Leads>(`${this.url}/Etapa/${id}`, {"etapa":etapa})
    }

  registerPessoaFisica(newLeads: CreateLeads, dtnascimento: string) {

    //POPULANDO USUARIO
    this.usuario.nome = newLeads.nome;
    this.usuario.email = newLeads.email;
    this.usuario.usuario = this.formatService.pegarUsuarioEmail(newLeads.email);
    this.usuario.ativo = 2;
    this.usuario.perfil = 'cliente';
    this.usuario.datacriacao = newLeads.dtcriacao;
    this.usuario.dataalteracao = newLeads.dtmodificacao;
    this.usuario.usuariocriacao = newLeads.usuariocriacao;
    this.usuario.usuarioalteracao = newLeads.usuarioalteracao;
    this.usuario.senha = 'cliente123';

    //POPULANDO PESSOA
    this.pessoa.nome = newLeads.nome;
    this.pessoa.cpf = newLeads.cgccfo;
    this.pessoa.dtnascimento = dtnascimento;
    this.pessoa.rua = newLeads.rua;
    this.pessoa.numero = newLeads.numero;
    this.pessoa.complemento = newLeads.complemento;
    this.pessoa.bairro = newLeads.bairro;
    this.pessoa.naturalidade = newLeads.cidade;
    this.pessoa.nacionalidade = newLeads.pais;
    this.pessoa.usuario = this.usuario.usuario;
    this.pessoa.nroidentidade = null!;
    this.pessoa.orgaoemissorident = null!;
    this.pessoa.estadoemissorident = newLeads.codetd;
    this.pessoa.zusuario_usuario = this.usuario.usuario;
    this.pessoa.dtcriacao = newLeads.dtcriacao;
    this.pessoa.dtalteracao = newLeads.dtmodificacao;
    this.pessoa.usuariocriacao = newLeads.usuariocriacao;
    this.pessoa.usuarioalteracao = newLeads.usuarioalteracao;



    //CRIAR USUARIO
    this.usuarioService.registerUser(this.usuario)
      .pipe(
        catchError(err => {
          console.error(err)
          return of();
        })
      ).subscribe((data) => {
        this.pessoaService.registerPessoa(this.pessoa)
          .pipe(
            catchError(err => {
              console.error(err)
              return of();
            })
          ).subscribe((data) => {
          })
      })

    return this.httpClient.post<CreateLeads>(this.url, newLeads)

  }
}