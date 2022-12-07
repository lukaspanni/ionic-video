import { Component } from '@angular/core';
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions,
  CaptureVideoOptions,
} from '@awesome-cordova-plugins/media-capture/ngx';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-media-capture',
  templateUrl: './media-capture.page.html',
  styleUrls: ['./media-capture.page.scss'],
})
export class MediaCapturePage {
  public videoUrl?: string;

  constructor(
    private mediaCapture: MediaCapture,
    private storage: StorageService
  ) {}

  public captureImage() {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options).then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );
  }

  public async captureVideo() {
    let options: CaptureVideoOptions = { limit: 1 };
    await this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => {
        console.log(data);
        this.storeVideo(data[0])
          .then((path) => {
            this.videoUrl = path;
          })
          .catch((e) => console.warn(e));
      },
      (err: CaptureError) => console.error(err)
    );
  }

  private async storeVideo(file: MediaFile): Promise<string> {
    const targetPath = this.storage.buildUserAccessiblePath(file.name);
    await this.storage.moveFile(file.fullPath, targetPath);
    return targetPath;
  }
}
