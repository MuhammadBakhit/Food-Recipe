import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ViewComponent>
){}





}
