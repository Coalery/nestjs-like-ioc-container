export interface IFileManager {
  read: (path: string) => string;
  write: (path: string, content: string) => void;
}
