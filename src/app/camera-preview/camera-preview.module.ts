import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CameraPreviewPage } from './camera-preview.page';

import { CameraPreviewPageRoutingModule } from './camera-preview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPreviewPageRoutingModule,
  ],
  declarations: [CameraPreviewPage],
})
export class CameraPreviewPageModule {}
