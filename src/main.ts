import 'reflect-metadata';

import { Resolver } from '@lery/core/resolver/Resolver';
import { Calculator } from '@lery/instances/calculator/Calculator';
import { Logger } from '@lery/instances/logger/Logger';
import { HelloWorld } from '@lery/instances/helloWorld/HelloWorld';
import { FileManager } from '@lery/instances/fileManager/FileManager';
import { Inject } from '@lery/decorators/Inject';
import {
  CalculatorToken,
  ICalculator,
} from '@lery/instances/calculator/ICalculator';
import { ILogger, LoggerToken } from '@lery/instances/logger/ILogger';
import {
  HelloWorldToken,
  IHelloWorld,
} from '@lery/instances/helloWorld/IHelloWorld';
import {
  FileManagerToken,
  IFileManager,
} from '@lery/instances/fileManager/IFileManager';

class Hello {
  @Inject(CalculatorToken)
  calculator!: ICalculator;

  @Inject(LoggerToken)
  logger!: ILogger;

  constructor(
    @Inject(HelloWorldToken)
    readonly helloWorld: IHelloWorld,
    @Inject(FileManagerToken)
    readonly fileManager: IFileManager
  ) {}
}

function main() {
  const resolver = new Resolver();
  resolver.registerProviders([
    { provide: CalculatorToken, useValue: new Calculator() },
    { provide: LoggerToken, useValue: new Logger() },
    { provide: HelloWorldToken, useValue: new HelloWorld() },
    { provide: FileManagerToken, useValue: new FileManager() },
  ]);

  const hello = resolver.resolve(Hello);

  console.log(hello.calculator.add(1, 2)); // 3
  hello.logger.log('Hello from logger'); // Hello from logger
  hello.helloWorld.sayHello(); // Hello, World!
  hello.fileManager.write('some.txt', 'Hello!'); // Writing file to some.txt with content: Hello!
}

main();
