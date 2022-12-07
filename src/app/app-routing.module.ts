import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'camera-preview',
    loadChildren: () =>
      import('./camera-preview/camera-preview.module').then(
        (m) => m.CameraPreviewPageModule
      ),
  },
  {
    path: 'media-capture',
    loadChildren: () =>
      import('./media-capture/media-capture.module').then(
        (m) => m.MediaCapturePageModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
