import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-add-componanet',
  templateUrl: './edit-add-componanet.component.html',
  styleUrls: ['./edit-add-componanet.component.scss']
})
export class EditAddComponanetComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any,
public dialogRef: MatDialogRef<EditAddComponanetComponent>,
 ){}


onCloseDialog(): void {
  this.dialogRef.close({name: this.data.name});
}
} 
