import { IHelloWorld } from '@lery/instances/helloWorld/IHelloWorld';

export class HelloWorld implements IHelloWorld {
  sayHello(): void {
    console.log('Hello, World!');
  }
}
