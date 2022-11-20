import { Component, OnInit } from '@angular/core';
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions,
} from '@awesome-cordova-plugins/media-capture/ngx';

@Component({
  selector: 'app-media-capture',
  templateUrl: './media-capture.page.html',
  styleUrls: ['./media-capture.page.scss'],
})
export class MediaCapturePage implements OnInit {
  public videoUrl?: string;

  constructor(private mediaCapture: MediaCapture) {}

  ngOnInit() {}

  public captureImage() {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options).then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );
  }

  public captureVideo() {
    let options: CaptureImageOptions = { limit: 3 };
    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => {
        console.log(data);
        this.videoUrl = data[0].fullPath;
      },
      (err: CaptureError) => console.error(err)
    );
  }
}
