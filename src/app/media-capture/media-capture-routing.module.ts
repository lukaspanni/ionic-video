import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaCapturePage } from './media-capture.page';

const routes: Routes = [
  {
    path: '',
    component: MediaCapturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaCapturePageRoutingModule {}
