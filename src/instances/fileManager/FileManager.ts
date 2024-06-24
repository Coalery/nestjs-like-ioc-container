import { IFileManager } from '@lery/instances/fileManager/IFileManager';

export class FileManager implements IFileManager {
  read(path: string): string {
    return `Reading file from ${path}`;
  }

  write(path: string, content: string): void {
    console.log(`Writing file to ${path} with content: ${content}`);
  }
}
