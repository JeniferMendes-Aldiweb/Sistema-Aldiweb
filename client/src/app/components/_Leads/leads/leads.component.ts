import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Optional } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { Subject, Observable, catchError, of } from 'rxjs';
import { Cidade } from '../../../models/cep/cidade.model';
import { Estado } from '../../../models/cep/estado.model';
import { Pais } from '../../../models/cep/pais.model';
import { CepService } from '../../../services/cep.service';
import { FormatsService } from '../../../services/formats.service';
import { LoginService } from '../../../services/login.service';
import { MensageriaService } from '../../../services/mensageria.service';
import { ProjectsComponent } from '../../_Projetos/projects/projects.component';
import { LeadsService } from '../../../services/leads.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterOutlet, 
  CommonModule, NgxMaskDirective, RouterLink, MatDialogModule],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {

  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;
  isModal: boolean;
  

  leads = {
    idleads: '',
    nomefantasia: '',
    nome: '',
    cgccfo: '',
    inscrestadual: '',
    pagrec: 0,
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    codetd: '',
    cep: '',
    telefone: '',
    ruapgto: '',
    numeropgto: '',
    complementopgto: '',
    bairropgto: '',
    cidadepgto: '',
    codetdpgto: '',
    ceppgto: '',
    telefonepgto: '',
    ruaentrega: '',
    numeroentrega: '',
    complementoentrega: '',
    bairroentrega: '',
    cidadeentrega: '',
    codetdentrega: '',
    cepentrega: '',
    telefoneentrega: '',
    email: '',
    ativo: 2,
    inscrmunicipal: '',
    pessoafisoujur: '',
    pais: '',
    paispgto: '',
    paisentrega: '',
    emailentrega: '',
    emailpgto: '',
    codmunicipiopgto: '',
    codmunicipioentrega: '',
    dtcriacao: '',
    dtmodificacao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    tipocliente: '',
    etapa:''
  }
  dadosFicticios = {
    tipocliente: 'P',
    etapa: '1'
  }
  dtnascimento = '';
  event = 'Cadastrar';

  //objetos para cep
  paises$ = new Observable<Pais[]>();
  estado$ = new Observable<Estado[]>();
  cidade$ = new Observable<Cidade[]>();

  paisesEntrega$ = new Observable<Pais[]>();
  estadoEntrega$ = new Observable<Estado[]>();
  cidadeEntrega$ = new Observable<Cidade[]>();

  paisesPgto$ = new Observable<Pais[]>();
  estadoPgto$ = new Observable<Estado[]>();
  cidadePgto$ = new Observable<Cidade[]>();

  constructor(
    private formatService: FormatsService,
    private leadsService: LeadsService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cep: CepService,
    private messageriaService: MensageriaService,
    @Optional() public dialogRef: MatDialogRef<ProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isModal: boolean },
  ) {
    console.log('Data recebido:', data);
    this.isModal = data.isModal;
    this.leads.idleads = this.route.snapshot.params['id']
  }

  ngAfterViewInit() {
    console.log(this.isModal); // deve imprimir true
  }

  onCloseClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  ngOnInit() {
    this.paises$ = this.cep.burcaCep('pais', null);
    this.paisesEntrega$ = this.paises$;
    this.paisesPgto$ = this.paises$;

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.leadsService
        .leadsCurrent(this.route.snapshot.params['id'])
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
        )
        .subscribe((datas) => {
          const data = datas[0];
          this.leads.idleads = data.IDLEADS!;
          this.leads.nomefantasia = data.NOMEFANTASIA;
          this.leads.nome = data.NOME;
          this.leads.cgccfo = data.CGCCFO;
          this.leads.inscrestadual = data.INSCRESTADUAL;
          this.leads.pagrec = data.PAGREC;
          this.leads.rua = data.RUA;
          this.leads.numero = data.NUMERO;
          this.leads.complemento = data.COMPLEMENTO;
          this.leads.bairro = data.BAIRRO;
          this.leads.cidade = data.CIDADE;
          this.leads.codetd = data.CODETD;
          this.leads.cep = data.CEP;
          this.leads.telefone = data.TELEFONE;
          this.leads.ruapgto = data.RUAPGTO;
          this.leads.numeropgto = data.NUMEROPGTO;
          this.leads.complementopgto = data.COMPLEMENTOPGTO;
          this.leads.bairropgto = data.BAIRROPGTO;
          this.leads.cidadepgto = data.CIDADEPGTO;
          this.leads.codetdpgto = data.CODETDPGTO;
          this.leads.ceppgto = data.CEPPGTO;
          this.leads.telefonepgto = data.TELEFONEPAGTO;
          this.leads.ruaentrega = data.RUAENTREGA;
          this.leads.numeroentrega = data.NUMEROENTREGA;
          this.leads.complementoentrega = data.COMPLEMENTOENTREGA;
          this.leads.bairroentrega = data.BAIRROENTREGA;
          this.leads.cidadeentrega = data.CIDADEENTREGA;
          this.leads.codetdentrega = data.CODETDENTREGA;
          this.leads.cepentrega = data.CEPENTREGA;
          this.leads.telefoneentrega = data.TELEFONEENTREGA;
          this.leads.email = data.EMAIL;
          this.leads.ativo = data.ATIVO;
          this.leads.inscrmunicipal = data.INSCRMUNICIPAL;
          this.leads.pessoafisoujur = data.PESSOAFISOUJUR;
          this.leads.pais = data.PAIS;
          this.leads.paispgto = data.PAISPGTO;
          this.leads.paisentrega = data.PAISENTREGA;
          this.leads.emailentrega = data.EMAILENTREGA;
          this.leads.emailpgto = data.EMAILPGTO;
          this.leads.codmunicipiopgto = data.CODMUNICIPIOPGTO;
          this.leads.codmunicipioentrega = data.CODMUNICIPIOENTREGA;
          this.leads.dtcriacao = this.formatService.format(data.DTCRIACAO!, null, "dateTime");
          this.leads.dtmodificacao = this.formatService.format(data.DTMODIFICACAO!, null, "dateTime");
          this.leads.usuariocriacao = data.USUARIOCRIACAO;
          this.leads.usuarioalteracao = data.USUARIOALTERACAO;
          this.leads.tipocliente = data.TIPOCLIENTE;
          this.leads.etapa = data.ETAPA;

          if (this.leads.pais) this.estado$ = this.cep.burcaCep('estado', this.leads.pais);
          if (this.leads.codetd) this.cidade$ = this.cep.burcaCep('cidade', this.leads.codetd);

          if (this.leads.paisentrega) this.estadoEntrega$ = this.cep.burcaCep('estado', this.leads.paisentrega);
          if (this.leads.codetdentrega) this.cidadeEntrega$ = this.cep.burcaCep('cidade', this.leads.codetdentrega);

          if (this.leads.paispgto) this.estadoPgto$ = this.cep.burcaCep('estado', this.leads.paispgto);
          if (this.leads.codetdpgto) this.cidadePgto$ = this.cep.burcaCep('cidade', this.leads.codetdpgto);

        })
      this.event = "Editar"
    }

    setTimeout(() => {
      if (typeof document !== 'undefined') {
        // alert("teste NG ONinit")
        this.formatService.ativo(this.leads.ativo);
      }
    }, 100);
  };

  registerLeads(form: NgForm) {

    //VALIDAÇÃO DE CAMPOS PREENCHIDOS

    if (!this.leads.cgccfo || !this.leads.nome || !this.leads.nomefantasia || !this.leads.telefone ||
      !this.leads.email || !this.leads.rua || !this.leads.numero || !this.leads.bairro 
      || !this.leads.cep || !this.leads.pagrec || !this.leads.cidade || !this.leads.codetd ||
      !this.leads.cep || !this.leads.email || !this.leads.pais //|| !this.leads.etapa
    ) {
      alert('preencha os campos');
      this.camposPreenchidos = (
        form.controls['pessoafisoujur'].valid &&
        form.controls['nome'].valid &&
        form.controls['nomefantasia'].valid &&
        form.controls['pagrec'].valid &&
        form.controls['rua'].valid &&
        form.controls['numero'].valid &&
        form.controls['bairro'].valid &&
        form.controls['cidade'].valid &&
        form.controls['codetd'].valid &&
        form.controls['cep'].valid &&
        form.controls['pais'].valid &&
        form.controls['email'].valid &&
        form.controls['telefone'].valid 
        // && form.controls['etapa'].valid
      );
      this.botaoClicado = true;
      return;
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {

      this.leads.dtcriacao = this.formatService.dateNow();
      this.leads.dtmodificacao = this.formatService.dateNow();
      this.leads.usuariocriacao = localStorage.getItem('user')!;
      this.leads.usuarioalteracao = localStorage.getItem('user')!;
      this.leads.tipocliente = this.dadosFicticios.tipocliente;
      this.leads.etapa = this.dadosFicticios.etapa;

      if (this.leads.pessoafisoujur === 'F') {
        this.leadsService.registerPessoaFisica(this.leads, this.dtnascimento)
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
          ).subscribe(() => { 
           this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
            this.router.navigate(['/user/leads']) 
          })

      } else {
        this.leadsService.registerLeads({
          nomefantasia: this.leads.nomefantasia,
          nome: this.leads.nome,
          cgccfo: this.leads.cgccfo,
          inscrestadual: this.leads.inscrestadual,
          pagrec: this.leads.pagrec,
          rua: this.leads.rua,
          numero: this.leads.numero,
          complemento: this.leads.complemento,
          bairro: this.leads.bairro,
          cidade: this.leads.cidade,
          codetd: this.leads.codetd,
          cep: this.leads.cep.replace(/[^\d]+/g, ''),
          telefone: this.leads.telefone.replace(/[^\d]+/g, '').substring(0, 11),
          ruapgto: this.leads.ruapgto,
          numeropgto: this.leads.numeropgto,
          complementopgto: this.leads.complementopgto,
          bairropgto: this.leads.bairropgto,
          cidadepgto: this.leads.cidadepgto,
          codetdpgto: this.leads.codetdpgto,
          ceppgto: this.leads.ceppgto.replace(/[^\d]+/g, ''),
          telefonepgto: this.leads.telefonepgto.replace(/[^\d]+/g, '').substring(0, 11),
          ruaentrega: this.leads.ruaentrega,
          numeroentrega: this.leads.numeroentrega,
          complementoentrega: this.leads.complementoentrega,
          bairroentrega: this.leads.bairroentrega,
          cidadeentrega: this.leads.cidadeentrega,
          codetdentrega: this.leads.codetdentrega,
          cepentrega: this.leads.cepentrega.replace(/[^\d]+/g, ''),
          telefoneentrega: this.leads.telefoneentrega.replace(/[^\d]+/g, '').substring(0, 11),
          email: this.leads.email,
          ativo: this.leads.ativo,
          inscrmunicipal: this.leads.inscrmunicipal,
          pessoafisoujur: this.leads.pessoafisoujur,
          pais: this.leads.pais,
          paispgto: this.leads.paispgto,
          paisentrega: this.leads.paisentrega,
          emailentrega: this.leads.emailentrega,
          emailpgto: this.leads.emailpgto,
          codmunicipiopgto: this.leads.codmunicipiopgto,
          codmunicipioentrega: this.leads.codmunicipioentrega,
          dtcriacao: this.leads.dtcriacao,
          dtmodificacao: this.leads.dtmodificacao,
          usuariocriacao: this.leads.usuariocriacao,
          usuarioalteracao: this.leads.usuarioalteracao,
          tipocliente: this.leads.tipocliente,
          etapa: this.leads.etapa
        }).pipe(
            catchError(err => {
              this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
              this.error$.next(true)
              if (err.statusText === "Unauthorized") {
                alert("Seu iToken foi expirado! Realize o login novamente")
                this.loginService.deslogar();
              }
              return of();
            })
          ).subscribe(() => {
            this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
            this.router.navigate(['/user/leads']) })
      }

    } else if (this.event === "Editar") {
      this.leads.dtmodificacao = this.formatService.dateNow();
      this.leads.usuarioalteracao = localStorage.getItem('user')!;
      this.leadsService.editLeads(this.leads)
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
        )
        .subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/leads'])
        })
    } else {
      alert("Error!")
    }
  };

  buscarCep(entidade: string, type: string, key: string,): void {
    if (key == '') return

    switch (type) {
      case 'estado':
        if (entidade === 'geral') {
          this.estado$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'entrega') {
          this.estadoEntrega$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'pgto') {
          this.estadoPgto$ = this.cep.burcaCep(type, key);
        }
        break;

      case 'cidade':
        if (entidade === 'geral') {
          this.cidade$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'entrega') {
          this.cidadeEntrega$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'pgto') {
          this.cidadePgto$ = this.cep.burcaCep(type, key);
        }
        break;

      default:
        break;
    }

  };

  consultarCNPJ() {
    this.cep.buscarCnpj(this.leads.cgccfo)
      .subscribe((data) => {
        this.popularCNPJ(data)
      }, error => {
        console.error(error),
          alert("cnpj invalido: '" + this.leads.cgccfo + "'")
      });

  };

  popularCNPJ(result: any) {
    if (result.message == 'CNPJ inválido') {
      alert("cnpj invalido: '" + this.leads.cgccfo + "'")
    } else {
      this.leads.nomefantasia = result.fantasia.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.leads.nome = result.nome.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.leads.rua = result.logradouro.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.leads.complemento = result.complemento.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.leads.bairro = result.bairro.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.leads.cidade = result.municipio.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.leads.numero = result.numero;
      this.leads.codetd = result.uf;
      this.leads.cep = result.cep.replace(/[^\d]+/g, '');
      this.leads.telefone = result.telefone;
      this.leads.email = result.email;
      this.leads.ruapgto = this.leads.rua;
      this.leads.numeropgto = this.leads.numero;
      this.leads.complementopgto = this.leads.complemento;
      this.leads.bairropgto = this.leads.bairro;
      this.leads.cidadepgto = this.leads.cidade;
      this.leads.codetdpgto = this.leads.codetd;
      this.leads.ceppgto = this.leads.cep.replace(/[^\d]+/g, '');
      this.leads.telefonepgto = this.leads.telefone;
      this.leads.paispgto = this.leads.pais;
      this.leads.emailpgto = this.leads.email;
      this.leads.codmunicipiopgto = this.leads.cidade;
      this.leads.ruaentrega = this.leads.rua;
      this.leads.numeroentrega = this.leads.numero;
      this.leads.complementoentrega = this.leads.complemento;
      this.leads.bairroentrega = this.leads.bairro;
      this.leads.cidadeentrega = this.leads.cidade;
      this.leads.codetdentrega = this.leads.codetd;
      this.leads.cepentrega = this.leads.cep.replace(/[^\d]+/g, '');
      this.leads.telefoneentrega = this.leads.telefone;
      this.leads.paisentrega = this.leads.pais;
      this.leads.emailentrega = this.leads.email;
      this.leads.codmunicipioentrega = this.leads.cidade;
      this.consultarCEP();
    }
  };
  popularEnderecoEntrega(){
    this.leads.cepentrega = this.leads.cep;
      this.leads.paisentrega = this.leads.pais;
      this.leads.codetdentrega = this.leads.codetd;
      this.leads.cidadeentrega = this.leads.cidade;
      this.leads.bairroentrega = this.leads.bairro;
      this.leads.ruaentrega = this.leads.rua;
      this.leads.numeroentrega = this.leads.numero;
      this.leads.complementoentrega = this.leads.complemento;
      this.leads.telefoneentrega = this.leads.telefone;
      this.leads.emailentrega = this.leads.email;
  }
  popularEnderecoPgto(){
    this.leads.ceppgto = this.leads.cep;
      this.leads.paispgto = this.leads.pais;
      this.leads.codetdpgto = this.leads.codetd;
      this.leads.cidadepgto = this.leads.cidade;
      this.leads.bairropgto = this.leads.bairro;
      this.leads.ruapgto = this.leads.rua;
      this.leads.numeropgto = this.leads.numero;
      this.leads.complementopgto = this.leads.complemento;
      this.leads.telefonepgto = this.leads.telefone;
      this.leads.emailpgto = this.leads.email;
  }

  consultarCEP() {
    this.cep.buscarCep(this.leads.cep.replace(/[^\d]+/g, ''))
      .subscribe((data) => {
        this.popularCEP(data)
      },
        error => {
          alert("cep invalido: '" + this.leads.cep + "'")
        });
  };

  popularCEP(result: any) {
    if (result.erro == 'true') {
      alert("CEP invalido: '" + this.leads.cep + "'")
    } else {
      this.leads.pais = 'BRA';
      this.leads.paisentrega = 'BRA';
      this.leads.paispgto = 'BRA';
      this.leads.codetd = result.uf;
      this.leads.codetdentrega = result.uf;
      this.leads.codetdpgto = result.uf;
      this.estado$ = this.cep.burcaCep('estado', this.leads.pais);
      this.estadoEntrega$ = this.estado$;
      this.estadoPgto$ = this.estadoEntrega$
      this.leads.cidade = result.localidade
      this.leads.cidadeentrega = result.localidade;
      this.leads.cidadepgto = result.localidade;
      this.cidade$ = this.cep.burcaCep('cidade', this.leads.codetd);
      this.cidadeEntrega$ = this.cidade$;
      this.cidadePgto$ = this.cidadeEntrega$;
      this.leads.rua = result.logradouro;
      this.leads.ruaentrega = result.logradouro;
      this.leads.ruapgto = result.logradouro;
      this.leads.complemento = result.complemento;
      this.leads.complementoentrega = result.complemento;
      this.leads.complementopgto = result.complemento;
      this.leads.bairro = result.bairro;
      this.leads.bairroentrega = result.bairro;
      this.leads.bairropgto = result.bairro;
      this.leads.codmunicipiopgto = result.localidade;
      this.leads.codmunicipioentrega = result.localidade;
    }
  };

  consultarCEP2(cep: string, etapa: string) {
    this.cep.buscarCep(cep).subscribe((data) => {
      switch (etapa) {
        case 'geral':
          this.leads.pais = 'BRA';
          this.estado$ = this.cep.burcaCep('estado', this.leads.pais);
          this.leads.codetd = data.uf;
          this.cidade$ = this.cep.burcaCep('cidade', this.leads.codetd);
          this.leads.cidade = data.localidade
          this.leads.rua = data.logradouro;
          this.leads.complemento = data.complemento;
          this.leads.bairro = data.bairro;
          this.leads.codmunicipioentrega = data.localidade;
          break;

        case 'entrega':
          this.leads.paisentrega = 'BRA';
          this.estadoEntrega$ = this.cep.burcaCep('estado', this.leads.paisentrega);
          this.leads.codetdentrega = data.uf;
          this.cidadeEntrega$ = this.cep.burcaCep('cidade', this.leads.codetdentrega);
          this.leads.cidadeentrega = data.localidade
          this.leads.ruaentrega = data.logradouro;
          this.leads.complementoentrega = data.complemento;
          this.leads.bairroentrega = data.bairro;
          this.leads.codmunicipioentrega = data.localidade;
          break;

        case 'financeiro':
          this.leads.paispgto = 'BRA',
          this.estadoPgto$ = this.cep.burcaCep('estado', this.leads.paispgto);
          this.leads.codetdpgto = data.uf;
          this.cidadePgto$ = this.cep.burcaCep('cidade', this.leads.codetdpgto);
          this.leads.cidadepgto = data.localidade;
          this.leads.ruapgto = data.logradouro;
          this.leads.complementopgto = data.complemento;
          this.leads.bairropgto = data.bairro;
          this.leads.codmunicipiopgto = data.localidade;
          
          break;

        default:
          break;
      }
    });
  }

  stage = 1;
  stageName = "GERAL";
  mudarEtapa(stage: number) {

    this.stage = stage;
    let element1 = document.querySelector('.stage_1') as HTMLLIElement
    let element2 = document.querySelector('.stage_2') as HTMLLIElement
    let element3 = document.querySelector('.stage_3') as HTMLLIElement
    let element4 = document.querySelector('.stage_4') as HTMLLIElement

    switch (stage) {
      case 1:
        element1.classList.add("current")
        element2.classList.remove("current")
        element3.classList.remove("current")
        element3.classList.remove("current")
        element4.classList.remove("current")
        this.stageName = "GERAL";
        break;
      case 2:
        element1.classList.remove("current")
        element2.classList.add("current")
        element3.classList.remove("current")
        element4.classList.remove("current")
        this.stageName = "ENDEREÇO";
        break;
      case 3:
        element1.classList.remove("current")
        element2.classList.remove("current")
        element3.classList.add("current")
        element4.classList.remove("current")
        this.stageName = "ENTREGA";
        break;
      case 4:
        element1.classList.remove("current")
        element2.classList.remove("current")
        element3.classList.remove("current")
        element4.classList.add("current")
        this.stageName = "FINANCEIRO";
        break;

      default:
        break;
    }

  }

}
