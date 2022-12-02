import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private file: File, private platform: Platform) {
    this.platform.ready().then(async () => {
      console.log(
        'File move from',
        this.file.tempDirectory,
        'to',
        this.file.documentsDirectory,
        ' works'
      );
    });
  }

  public async moveFile(
    sourcePath: string,
    destinationPath: string
  ): Promise<any> {
    console.debug('Moving file from', sourcePath, 'to', destinationPath);
    const [sourceFolder, sourceFilename] =
      this.extractFolderAndName(sourcePath);
    const [destinationFolder, destinationFilename] =
      this.extractFolderAndName(destinationPath);

    if (this.platform.is('ios')) {
      return this.file
        .moveFile(
          this.file.tempDirectory,
          sourceFilename,
          this.file.documentsDirectory,
          destinationFilename
        )
        .catch((err) => console.warn('Error while moving file', err));
    }
    //other implementation would not work on ios

    const exists = await this.file.checkDir(destinationFolder, '').then(
      (exists) => exists,
      () => false
    );
    if (!exists)
      await this.file
        .createDir(destinationFolder, '', false)
        .catch((err) => console.warn('Directory creation failed', err));

    return this.file
      .moveFile(
        sourceFolder,
        sourceFilename,
        destinationFolder,
        destinationFilename
      )
      .catch((err) => console.warn('File move failed', err));
  }

  public buildUserAccessiblePath(filename: string): string {
    if (this.platform.is('android'))
      return (
        this.file.externalRootDirectory + 'Documents/crossVideo/' + filename
      );
    return this.file.documentsDirectory + filename;
  }

  private extractFolderAndName(path: string): [string, string] {
    const parts = path.split('/');
    return [
      parts.slice(0, parts.length - 1).join('/'),
      parts[parts.length - 1],
    ];
  }
}
