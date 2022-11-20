import { Component } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from '@awesome-cordova-plugins/camera-preview/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-camera-preview',
  templateUrl: 'camera-preview.page.html',
  styleUrls: ['camera-preview.page.scss'],
})
export class CameraPreviewPage {
  public contentClass = '';
  public videoCapturing = false;
  public videoFile?: string = undefined;

  private jsCameraPreview: any;

  constructor(private camera: CameraPreview, private file: File) {}

  startCamera() {
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapFocus: true,
      toBack: true,
      alpha: 1,
      storeToFile: false,
    };

    // start camera
    this.camera.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
        this.contentClass = 'hide';
        try {
          this.jsCameraPreview = (window as any).CameraPreview as any;
          this.jsCameraPreview.getSupportedWhiteBalanceModes(
            (modes) => console.log(`Supported white balance modes: ${modes}`),
            (e) => console.log(e)
          );
        } catch (e) {
          console.log(e);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public async stopCamera() {
    await this.camera.stopCamera();
    this.contentClass = '';
  }

  public async switchCamera() {
    await this.camera.switchCamera();
  }

  public async takePicture() {
    const picture = await this.camera.takePicture();
    console.log(picture);
  }

  public async captureVideo() {
    console.log('captureVideo');
    this.jsCameraPreview?.setWhiteBalanceMode('fluorescent');
    await this.camera
      .startRecordVideo({
        width: window.screen.width / 2,
        height: window.screen.height / 2,
        quality: 60,
        withFlash: false,
      })
      .catch((err) => {
        console.log(err);
      });
    this.videoCapturing = true;
  }

  public async stopCaptureVideo() {
    const video: string = await this.camera.stopRecordVideo();
    this.videoCapturing = false;
    const parts = video.split('/');
    const filename = parts[parts.length - 1];
    const targetPath = this.file.externalRootDirectory + 'Documents/test/';

    console.log(
      `move ${this.file.cacheDirectory}${filename} to ${targetPath}${filename}`
    );
    await this.file
      .moveFile(this.file.cacheDirectory, filename, targetPath, filename)
      .then(() => console.log('Copied'))
      .catch((err) => console.log(err));
    this.videoFile = targetPath + filename;
  }
}
