import { Component, DoCheck } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {CdkDragDrop,CdkDrag,CdkDropList,CdkDropListGroup,moveItemInArray,transferArrayItem,DragDropModule,} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LeadsService } from '../../../services/leads.service';
import { Observable, catchError, of } from 'rxjs';
import { Leads } from '../../../models/leads.model'
import {LeadsComponent} from '../../_Leads/leads/leads.component'
import { RouterLink,Router } from '@angular/router';
import { ClientComponent } from '../../_Clientes/client/client.component';


export class DialogContentExampleDialog {
}

@Component({
  selector: 'app-kanban-leads',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule,
    DragDropModule, CommonModule, MatIconModule, MatDialogModule, RouterLink],
  templateUrl: './kanbanLeads.component.html',
  styleUrl: './kanbanLeads.component.scss'
})
export class KanbanLeadsComponent implements DoCheck {

  leads$ = new Observable<Leads[]>();

  todo: Array<Leads> = [];
  emAndamento: Array<Leads> = [];
  concluido: Array<Leads> = [];
  impedidos: Array<Leads> = [];
  naoPlanejados: Array<Leads> = [];
  client: Array<Leads> = [];

  newTodo: string = '';
  newEmAndamento: string = '';
  newConcluido: string = '';
  newImpedidos: string = '';
  newNaoPlanejados: string = '';
  newClient: string ='';

  LeadsEscolhido ={
    idleads: 0,
    nome:''
  }


  //teste: string[] = ['Cadastrar Clientes', 'Cadastrar Pessoas', 'Cadastrar Objetos']

  constructor(public dialog: MatDialog,
    private leadsService: LeadsService,
    private router: Router
  ){}


  ngOnInit() {
    // this.SeparaTarefasPorEtapa(this.projetoTarefa);
    // this.client$ = this.clienteService.Allclients();
    // this.Projetos$ = this.projetoService.allProjects();

    this.leads$ = this.leadsService.Allleads();

    this.leadsService.Allleads().subscribe((data) => {
      this.SeparaTarefasPorEtapa(data)
      
    });
  }

  recarregar() {
    this.todo = [];
    this.emAndamento = [];
    this.concluido = [];
    this.impedidos = [];
    this.naoPlanejados = []
    this.client =[]
  }

  buscarLeadsFiltro() {
    this.recarregar();

    if(this.LeadsEscolhido.idleads !=0) {
      this.BuscarLeadsID(this.LeadsEscolhido.idleads);
    }else{
      this.ngOnInit();
    }
  }

  BuscarLeadsID(idleads:number){
    this.leads$ =this.leadsService.leadsCurrent(idleads);
    this.leadsService.leadsCurrent(idleads).subscribe((data)=>{
      this.SeparaTarefasPorEtapa(data)
    })
  }

  //   tarefasBuscaCliente(idleads: number) {
  //   if (this.LeadsEscolhido.idleads != 0) this.leads$ = this.projetoService.projectsWithClients(idCliente)
  //   else this.Projetos$ = this.projetoService.allProjects();
  // }
  
  SeparaTarefasPorEtapa(data: Leads[]) {

    data.forEach(element => {
      switch (element.ETAPA.toString()) {
        case '1':
          this.todo.push(element);
          break;
        case '2':
          this.emAndamento.push(element);
          break;
        case '3':
          this.concluido.push(element);
          break;
        case '4':
          this.impedidos.push(element);
          break;
        case '5':
          this.naoPlanejados.push(element);
          break;
        case '6':
          this.client.push(element);
          break;
        default:
          break;
      }
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(LeadsComponent, {
      width: '900px',
      height: '450px',
      panelClass: 'dialog-with-scrollbar',
      data: { isModal: true },
    });
    dialogRef.componentInstance.isModal = true;
  }

  ngDoCheck() {
    // Força a detecção de alterações para atualizar a visualização quando novas tarefas são adicionadas
    // Esta não é a abordagem mais eficiente, mas funciona para este caso simples
    // Em um cenário real, você usaria um método mais eficiente, como Observables
    // ou o pipe assíncrono
    this.todo = [...this.todo];
  }

  TrocarEtapa(etapa: number, id: string) {
    this.leadsService.editLeadsEtapa(etapa, id)
      .pipe(
        catchError(err => {
          console.log(err)
          return of();
        })
      ).subscribe((data) => {
        // this.recarregar();
      })
  }

  drop(event: CdkDragDrop<Array<Leads>>) {

    if (event.previousContainer === event.container) {
      // Se o item for descartado na mesma lista, basta reordenar a lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Se o item for descartado em uma lista diferente, transfere o item
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let idTroca = event.container.data[event.currentIndex].IDLEADS!;
      switch (event.container.id) {
        case "cdk-drop-list-0":
          this.TrocarEtapa(1, idTroca)
          break;
        case "cdk-drop-list-1":
          this.TrocarEtapa(2, idTroca)
          break;
        case "cdk-drop-list-2":
          this.TrocarEtapa(3, idTroca)
          break;
        case "cdk-drop-list-3":
          this.TrocarEtapa(4, idTroca)
          //this.openDialog();
          break;
        case "cdk-drop-list-4":
          this.TrocarEtapa(5, idTroca)
          break;
        case "cdk-drop-list-5":
          this.TrocarEtapa(6, idTroca)
          const lead = event.container.data[event.currentIndex];
          this.converterLeadParaCliente(lead);
          break;
        default:
          console.log(event.container.id)
          //alert("error!")
          break;
      }
    }
  }

converterLeadParaCliente(lead: Leads) {
  const dialogRef = this.dialog.open(ClientComponent, {
   width: '900px',
      height: '450px',
      panelClass: 'dialog-with-scrollbar',
      data: { isModal: true, lead: lead }
    });
   dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // se precisar, salva ou atualiza algo
    }
  });
}
}