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

class Hello {
  @Inject(CalculatorToken)
  calculator!: ICalculator;

  @Inject(LoggerToken)
  logger!: ILogger;

  constructor(
    @Inject(HelloWorldToken)
    readonly helloWorld: IHelloWorld,
    @Inject(FileManager)
    readonly fileManager: FileManager
  ) {}
}

class Something {
  constructor(
    @Inject(Hello)
    private readonly hello: Hello
  ) {}

  addOneAndTwo(): number {
    return this.hello.calculator.add(1, 2);
  }
}

function main() {
  const resolver = new Resolver([
    { provide: CalculatorToken, useValue: new Calculator() },
    { provide: LoggerToken, useValue: new Logger() },
    { provide: HelloWorldToken, useClass: HelloWorld },
    FileManager,
    { provide: Hello, useClass: Hello },
    Something,
  ]);
  resolver.resolve();

  const hello = resolver.get(Hello);

  console.log(hello.calculator.add(1, 2)); // 3
  hello.logger.log('Hello from logger'); // Hello from logger
  hello.helloWorld.sayHello(); // Hello, World!
  hello.fileManager.write('some.txt', 'Hello!'); // Writing file to some.txt with content: Hello!

  const something = resolver.get(Something);
  console.log(something.addOneAndTwo()); // 3
}

main();
