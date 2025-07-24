import { LucasCamposComponent } from './components/cardNFC/lucasCampos/lucasCampos.component';
import { RaphaelleRosaComponent } from './components/cardNFC/raphaelleRosa/raphaelleRosa.component';
import { WanessaComponent } from './components/cardNFC/wanessa/wanessa.component';
import { FabioTuratiComponent } from './components/cardNFC/fabioTurati/fabioTurati.component';
import { RafaelRamalhoComponent } from './components/cardNFC/rafaelRamalho/rafaelRamalho.component';
import { LuizaDuarteComponent } from './components/cardNFC/luizaDuarte/luizaDuarte.component';
import { RafaelGranjaComponent } from './components/cardNFC/rafaelGranja/rafaelGranja.component';
import { DriellyMarianyComponent } from './components/cardNFC/driellyMariany/driellyMariany.component';
import { HenriqueVasconcelosComponent } from './components/cardNFC/henriqueVasconcelos/henriqueVasconcelos.component';
import { FillippiComponent } from './components/cardNFC/fillippi/fillippi.component';
import { JoaoHenriqueComponent } from './components/cardNFC/joaoHenrique/joaoHenrique.component';
import { JeniferBarrosComponent } from './components/cardNFC/jeniferBarros/jeniferBarros.component';
import { KellyCardosoComponent } from './components/cardNFC/kellyCardoso/kellyCardoso.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { ClientsComponent } from './components/_Clientes/clients/clients.component';
import { ClientComponent } from './components/_Clientes/client/client.component';
import { SiteComponent } from './components/site/site.component';
import { UserComponent } from './components/user/user.component';
import { VendaComponent } from './components/_Contratos/venda/venda.component';
import { Client360Component } from './components/_Clientes/client360/client360.component';
import { ContratoComponent } from "./components/_Contratos/contrato/contrato.component";
import { ProjetoComponent } from "./components/_Projetos/projeto/projeto.component";
import { UsuarioComponent } from './components/_Usuarios/usuario/usuario.component';
import { UsuariosComponent } from './components/_Usuarios/usuarios/usuarios.component';
import { RecursoComponent } from './components/_Recursos/recurso/recurso.component';
import { HomeComponent } from './components/home/home.component';
import { TarefaComponent } from './components/_Tarefas/tarefa/tarefa.component';
import { TarefaStatusComponent } from './components/tarefa-status/tarefa-status.component';
import { ApontamentoComponent } from './components/apontamento/apontamento.component';
import { PessoaComponent } from './components/_Pessoas/pessoa/pessoa.component';
import { ProjetoTarefaComponent } from './components/projeto-tarefa/projeto-tarefa.component';
import { authorizedGuard } from './guard/authorized.guard';
import { PessoasComponent } from './components/_Pessoas/pessoas/pessoas.component';
import { ContratosComponent } from './components/_Contratos/contratos/contratos.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { ProjetoStatusComponent } from './components/projetoStatus/projetoStatus.component';
import { TarefasComponent } from './components/_Tarefas/tarefas/tarefas.component';
import { ProjetosComponent } from './components/_Projetos/projetos/projetos.component';
import { RecursosComponent } from './components/_Recursos/recursos/recursos.component';
import { ProjectsComponent } from './components/_Projetos/projects/projects.component';
import { TipoRecursoComponent } from './components/_TipoRecursos/tipoRecurso/tipoRecurso.component';
import { TipoRecursosComponent } from './components/_TipoRecursos/tipoRecursos/tipoRecursos.component';
import { VisaoProjetoComponent } from './components/visaoProjeto/visaoProjeto.component';
import { CriarPTComponent } from './components/criarPT/criarPTcomponent';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AldiwebsiteComponent } from './components/aldiwebsite/aldiwebsite.component';
import { TesteComponent } from './components/teste/teste.component';
import { ConsultoriaRMComponent } from './components/consultoriaRM/consultoriaRM.component';
import { ConsultoriaProtheusComponent } from './components/consultoriaProtheus/consultoriaProtheus.component';
import { ConsultoriaFluigComponent } from './components/consultoriaFluig/consultoriaFluig.component';
import { ConsultoriaBPOComponent } from './components/consultoriaBPO/consultoriaBPO.component';
import { CardComponent } from './components/cardNFC/card/card.component';
import { AldineiComponent } from './components/cardNFC/aldinei/aldinei.component';
import { TiagoBonutiComponent } from './components/cardNFC/tiagoBonuti/tiagoBonuti.component';
import { AlefPedrosaComponent } from './components/cardNFC/alefPedrosa/alefPedrosa.component';
import { TotvsAComponent } from './components/cardNFC/totvs-a/totvs-a.component';
import { TotvsBComponent } from './components/cardNFC/totvs-b/totvs-b.component';
import { TotvsCComponent } from './components/cardNFC/totvs-c/totvs-c.component';
import { LeadsComponent } from './components/_Leads/leads/leads.component';
import { VisaoLeadsComponent } from './components/_Leads/visaoLeads/visaoLeads.component';
import { KanbanLeadsComponent } from './components/_Leads/kanbanLeads/kanbanLeads.component';
import { ApresentacaoComponent } from './components/apresentacao/apresentacao.component';


export const routes: Routes = [
    // {
    //     path: 'home',
    //     component: AldiwebsiteComponent
    // },
        {
        path: 'apresentacao',
        component: ApresentacaoComponent
    },
    {
        path: 'jarise',
        component: CardComponent
    },
                        {
        path: 'jarise/1247408109',
        component: TotvsCComponent
    },
                    {
        path: 'jarise/1246464685',
        component: TotvsBComponent //Bruna
    },
                {
        path: 'jarise/1247365341',
        component: TotvsAComponent //richardMKT
    },
            {
        path: 'jarise/1245896029',
        component: TiagoBonutiComponent
    },
        {
        path: 'jarise/1244749837',
        component: AlefPedrosaComponent
    },
    {
        path: 'jarise/lucas',
        component: LucasCamposComponent
    },
    {
        path: 'jarise/1248475533',
        component: RaphaelleRosaComponent
    },
    {
        path: 'jarise/1248495325',
        component: WanessaComponent
    },
    {
        path: 'jarise/FabioTurati',//1246464717
        component: FabioTuratiComponent
    },
    {
        path: 'jarise/1246856813',
        component: RafaelRamalhoComponent
    },
    {
        path: 'jarise/1246556045',
        component: LuizaDuarteComponent
    },
    {
        path: 'jarise/1248033501',
        component: RafaelGranjaComponent
    },
    {
        path: 'jarise/1246542461',
        component: DriellyMarianyComponent
    },
    {
        path: 'jarise/1248261709',
        component: HenriqueVasconcelosComponent
    },
    {
        path: 'jarise/1246325101',
        component: FillippiComponent
    },
    {
        path: 'jarise/joao',
        component: JoaoHenriqueComponent
    },
    {
        path: 'jarise/1247401213',
        component: JeniferBarrosComponent
    },
    {
        path: 'jarise/1247051341',
        component: KellyCardosoComponent
    },
    {
        path: 'jarise/aldinei',//1247194477
        component: AldineiComponent
    },
    {
        path: 'home',
        component: AldiwebsiteComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: 'teste',
    //     component: AldiwebsiteComponent
    // },
    {
        path: 'rm',
        component: ConsultoriaRMComponent
    },
    {
        path: 'protheus',
        component: ConsultoriaProtheusComponent
    },
    {
        path: 'fluig',
        component: ConsultoriaFluigComponent
    },
    {
        path: 'bpo',
        component: ConsultoriaBPOComponent
    },
    {
        path: 'cartao',
        component: TesteComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate:[authorizedGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'lead',
                component: LeadsComponent,
            },
             {
                 path: 'leads',
                 component: VisaoLeadsComponent,
             },
             {
                 path: 'leads/:id',
                 component: LeadsComponent,
             },
            {
                path: 'kanbanLeads',
                component: KanbanLeadsComponent,
            },
            {
                path: 'kanban',
                component: KanbanComponent,
            },
            {
                path: 'kanban/:id',
                component: KanbanComponent,
            },
            {
                path: 'clients',
                component: ClientsComponent
            },
            {
                path: 'client',
                component: ClientComponent,
            },
            {
                path: 'client360/:id',
                component: Client360Component
            },
            {
                path: 'client/:id',
                component: ClientComponent
            },
            {
                path: 'clientes/vendas/:event/:id',
                component: VendaComponent
            },
            {
                path: 'venda/:id',
                component: VendaComponent
            },
            {
                path: 'contratos',
                component: ContratosComponent
            },
            {
                path: 'contrato/:id',
                component: ContratoComponent
            },
            {
                path: 'c/projeto/:id',
                component: ProjetoComponent
            },
            {
                path: 'visaoProjeto',
                component: VisaoProjetoComponent
            },
            {
                path: 'visaoProjeto/:id',
                component: VisaoProjetoComponent
            },
            {
                path: 'projeto/:event/:id',
                component: ProjectsComponent
            },
            {
                path: 'projetos',
                component: ProjetosComponent
            },
            {
                path: 'projeto',
                component: ProjectsComponent
            },
            {
                path:'usuarios',
                component: UsuariosComponent
            },
            {
                path:'usuario',
                component: UsuarioComponent
            },
            {
                path:'usuario/:event/:user',
                component: UsuarioComponent
            },
            {
                path: 'pessoas',
                component: PessoasComponent
            },
            {
                path: 'pessoa',
                component: PessoaComponent
            },
            {
                path: 'pessoa/:id',
                component: PessoaComponent
            },
            {
                path: 'recurso',
                component: RecursoComponent
            },
            {
                path: 'recurso/:id',
                component: RecursoComponent
            },
            {
                path: 'recursos',
                component: RecursosComponent
            },
            {
                path: 'tipoRecurso',
                component: TipoRecursoComponent
            },
            {
                path: 'tipoRecursos',
                component: TipoRecursosComponent
            },
            {
                path: 'tipoRecurso/:id',
                component: TipoRecursoComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'tarefas',
                component: TarefasComponent
            },
            {
                path: 'tarefa',
                component: TarefaComponent
            },
            {
                path: 'tarefa/:id',
                component: TarefaComponent
            },
            {
                path: 'tarefaStatus',
                component: TarefaStatusComponent
            },
            {
                path: 'tarefaStatus/:id',
                component: TarefaStatusComponent
            },
            {
                path: 'apontamento',
                component: ApontamentoComponent
            },
            {
                path: 'apontamento/:id',
                component: ApontamentoComponent
            },          
            {
                path: 'projetoTarefa',
                component: ProjetoTarefaComponent
            },
            {
                path: 'projetoTarefa/:id',
                component: ProjetoTarefaComponent
            },
            {
                path: 'projetoStatus',
                component: ProjetoStatusComponent
            },
            {
                path: 'criarPT',
                component: CriarPTComponent
            },
            {
                path: 'aldiwebsite',
                component: AldiwebsiteComponent
            },
            {
                path: 'agenda',
                component: AgendaComponent
            },
            // {
            //     path: 'projetoStatus/:id',
            //     component: ProjetoStatusComponent
            // },
            {
                path: '**',
                component: HomeComponent
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'home'
    },
];