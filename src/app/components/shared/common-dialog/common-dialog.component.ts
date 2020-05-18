import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public modalData: any) {

    console.log(this.modalData);
  }

  ngOnInit() { }
  
  cancelModal() {
    this.dialogRef.close('CANCEL');
  }

  acceptModal() {
    this.dialogRef.close('ACCEPT');
  }
}
