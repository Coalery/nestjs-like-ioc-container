import 'reflect-metadata';
import { Resolver } from '@lery/resolver/Resolver';
import { Calculator } from '@lery/instances/calculator/Calculator';
import { Logger } from '@lery/instances/logger/Logger';
import { HelloWorld } from '@lery/instances/helloWorld/HelloWorld';
import { FileManager } from '@lery/instances/fileManager/FileManager';
import {
  InjectCalculator,
  InjectFileManager,
  InjectHelloWorld,
  InjectLogger,
} from './decorators/Inject';
import { ICalculator } from './instances/calculator/ICalculator';
import { ILogger } from './instances/logger/ILogger';
import { IHelloWorld } from './instances/helloWorld/IHelloWorld';
import { IFileManager } from './instances/fileManager/IFileManager';

class Hello {
  @InjectCalculator()
  calculator!: ICalculator;

  @InjectLogger()
  logger!: ILogger;

  constructor(
    @InjectHelloWorld()
    readonly helloWorld: IHelloWorld,
    @InjectFileManager()
    readonly fileManager: IFileManager
  ) {}
}

function main() {
  const resolver = new Resolver({
    calculator: new Calculator(),
    logger: new Logger(),
    helloWorld: new HelloWorld(),
    fileManager: new FileManager(),
  });

  const hello = resolver.resolve(Hello);
  console.log(hello);
}

main();
