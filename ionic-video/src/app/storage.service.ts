import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private file: File, private platform: Platform) {}

  public async moveFile(
    sourcePath: string,
    destinationPath: string
  ): Promise<any> {
    console.debug('Moving file from', sourcePath, 'to', destinationPath);
    const [sourceFolder, sourceFilename] =
      this.extractFolderAndName(sourcePath);
    const [destinationFolder, destinationFilename] =
      this.extractFolderAndName(destinationPath);

    const exists = await this.file.checkDir(sourceFolder, '').then(
      (exists) => exists,
      () => false
    );
    if (!exists)
      await this.file
        .createDir(sourceFolder, '', false)
        .catch((err) => console.warn('Directory creation failed', err));

    return this.file.moveFile(
      sourceFolder,
      sourceFilename,
      destinationFolder,
      destinationFilename
    );
  }

  public buildUserAccessiblePath(filename: string): string {
    if (this.platform.is('android'))
      return (
        this.file.externalRootDirectory + 'Documents/crossVideo/' + filename
      );
    return this.file.documentsDirectory + 'crossVideo/' + filename;
  }

  private extractFolderAndName(path: string): [string, string] {
    const parts = path.split('/');
    return [
      parts.slice(0, parts.length - 1).join('/'),
      parts[parts.length - 1],
    ];
  }
}
