import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from '../core/interceptors/global.interceptor';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

@NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true
      }
    ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DeleteItemComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    NgxDropzoneModule
  ],
  exports: [
    ViewProfileComponent,
    SidebarComponent,
    NavbarComponent,
    RouterModule,
    DeleteItemComponent,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    NgxDropzoneModule
  ]
})
export class SharedModule { }
