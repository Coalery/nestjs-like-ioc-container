import { ICalculator } from '@lery/instances/calculator/ICalculator';
import { IFileManager } from '@lery/instances/fileManager/IFileManager';
import { IHelloWorld } from '@lery/instances/helloWorld/IHelloWorld';
import { ILogger } from '@lery/instances/logger/ILogger';

type Instances = {
  calculator: ICalculator;
  logger: ILogger;
  helloWorld: IHelloWorld;
  fileManager: IFileManager;
};

export class Resolver {
  constructor(private readonly instances: Instances) {}
}
