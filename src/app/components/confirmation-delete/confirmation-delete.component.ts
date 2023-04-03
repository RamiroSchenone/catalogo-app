import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete',
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.scss']
})
export class ConfirmationDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();
  }

  onDelete(){
    this.dialogRef.close(true);
  }
}
