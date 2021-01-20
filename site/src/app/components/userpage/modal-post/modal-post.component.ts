import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.css']
})
export class ModalPostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalPostComponent>,) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
