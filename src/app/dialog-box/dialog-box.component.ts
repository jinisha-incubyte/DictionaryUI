import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  word: String
  isDelete=false;
  isUpdate=false;
  dialogListener = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: {word: string, type: string}) {
    this.word = data.word;
    if(data.type === 'delete'){
      this.isDelete=true;
    }else if(data.type === 'update'){
      this.isUpdate=true;
    }
  }


  doUpdate(){
    this.dialogRef.close(this.dialogListener.value); 
  }

  doDelete(){
    this.dialogRef.close('DeleteConfirmed')
  }
  closeDialog() {
    this.dialogRef.close('Cancelled');
  }

}
