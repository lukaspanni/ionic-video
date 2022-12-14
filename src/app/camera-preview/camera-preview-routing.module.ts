import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraPreviewPage } from './camera-preview.page';

const routes: Routes = [
  {
    path: '',
    component: CameraPreviewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraPreviewPageRoutingModule {}
