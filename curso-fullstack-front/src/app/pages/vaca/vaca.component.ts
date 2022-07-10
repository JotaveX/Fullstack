import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Vaca } from 'app/models/vaca';
import { VacaService } from 'app/services/vaca.service';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'vaca',
  styleUrls: ['vaca.component.scss'],
  templateUrl: './vaca.component.html',
})
export class VacaComponent implements OnInit {
  @ViewChild('ng2TbVaca') ng2TbVaca: Ng2SmartTableComponent;
  @ViewChild('dialogVaca') dialogVaca: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbVacaData: Vaca[];
  tbVacaConfig: Object;
  vacaSelected: Vaca;

  formVaca = this.formBuilder.group({
    nome: [null],
    brinco: [null],
    born: [null],
  });

  constructor(private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private vacaService: VacaService) { }

  ngOnInit(): void {
    this.setConfigTbVaca();
    this.setDataTbVaca();
  }

  private setConfigTbVaca() {
    this.tbVacaConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum usuário cadastrado.',
      columns: {
        name: {
          title: 'Nome',
        },
        brinco: {
          title: 'Brinco',
        },
        born: {
          title: 'born',
        },
      },
    };
  }

  private setDataTbVaca() {
    this.vacaService.list().subscribe((res) => {
      this.tbVacaData = res.body;
    });
  }

  public openModalVaca(event: Row) {
    this.formVaca.reset();

    if (event) {
      const vaca: Vaca = event.getData();
      this.vacaService.findById(vaca.name).subscribe((res) => {
        this.formVaca.patchValue(res.body);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogVaca);
  }

  public openModalExclusion(event: Row) {
    this.vacaSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.vacaSelected.name });
  }

  public btnSave() {
    if (this.formVaca.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addVaca();
    else this.editVaca();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formVaca.get('name').markAsTouched();
    this.formVaca.get('brinco').markAsTouched();
    this.formVaca.get('born').markAsTouched();
  }

  private isAdd(): boolean {
    return !this.formVaca.get('name').value;
  }

  private addVaca() {
    this.vacaService.create(this.findFormAdd()).subscribe((res) => {
      this.tbVacaData.push(res.body);
      this.ng2TbVaca.source.refresh();
      this.toastrService.success('Usuário criado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  private findFormAdd() {
    const vaca = this.formVaca.value;
    delete vaca._id;

    return vaca;
  }

  private editVaca() {
    this.vacaService.edit(this.formVaca.value).subscribe((res) => {
      this.tbVacaData = this.tbVacaData.map((vaca: Vaca) => {
        if (vaca.name === this.formVaca.value.name) return this.formVaca.value;
        return vaca;
      });
      this.toastrService.success('Usuário editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    this.vacaService.delete(this.vacaSelected.name).subscribe((res) => {
      this.tbVacaData = this.tbVacaData.filter(((vaca) => vaca.name !== this.vacaSelected.name));
      this.toastrService.success('Usuário excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
