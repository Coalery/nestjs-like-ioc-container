import { ILogger } from '@lery/instances/logger/ILogger';

export class Logger implements ILogger {
  log(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
