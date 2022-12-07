import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaCapturePageRoutingModule } from './media-capture-routing.module';

import { MediaCapturePage } from './media-capture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaCapturePageRoutingModule
  ],
  declarations: [MediaCapturePage]
})
export class MediaCapturePageModule {}
