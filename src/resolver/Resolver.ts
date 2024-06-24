import { Type } from '@lery/common/Type';
import {
  PARAMETER_INJECT_METADATA,
  PROPERTY_INJECT_METADATA,
  ParameterInjectMetadata,
  PropertyInjectMetadata,
} from '@lery/core/metadata/InjectMetadata';
import {
  CalculatorToken,
  FileManagerToken,
  HelloWorldToken,
  LoggerToken,
} from '@lery/decorators/Inject';
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

  resolve<T>(ctor: Type<T>): T {
    const parameters = this.resolveConstructorParameters(ctor);
    const instance = new ctor(...parameters);
    this.resolveProperty(ctor, instance);

    return instance;
  }

  resolveConstructorParameters<T>(ctor: Type<T>): any[] {
    const metadata: ParameterInjectMetadata[] =
      Reflect.getMetadata(PARAMETER_INJECT_METADATA, ctor) ?? [];

    return metadata.map((m) => this.mapTokenToInstance(m.token));
  }

  resolveProperty<T>(ctor: Type<T>, instance: T): void {
    const metadata: PropertyInjectMetadata[] =
      Reflect.getMetadata(PROPERTY_INJECT_METADATA, ctor) ?? [];

    metadata.forEach((m) => {
      (instance as any)[m.propertyKey] = this.mapTokenToInstance(m.token);
    });
  }

  private mapTokenToInstance(token: string): any {
    switch (token) {
      case CalculatorToken:
        return this.instances.calculator;
      case LoggerToken:
        return this.instances.logger;
      case HelloWorldToken:
        return this.instances.helloWorld;
      case FileManagerToken:
        return this.instances.fileManager;
      default:
        throw new Error(`Token ${token} not found`);
    }
  }
}
