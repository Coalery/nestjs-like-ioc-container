export const FileManagerToken = Symbol('FileManager');

export interface IFileManager {
  read: (path: string) => string;
  write: (path: string, content: string) => void;
}
