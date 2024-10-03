import { Provider } from '@lery/common/Provider';
import { Token } from '@lery/common/Token';
import { Type } from '@lery/common/Type';
import {
  PARAMETER_INJECT_METADATA,
  PROPERTY_INJECT_METADATA,
  ParameterInjectMetadata,
  PropertyInjectMetadata,
} from '@lery/core/metadata/InjectMetadata';
import { InstanceContainer } from '../container/InstanceContainer';

export class Resolver {
  private readonly instanceContainer: InstanceContainer;

  constructor() {
    this.instanceContainer = new InstanceContainer();
  }

  registerProviders(providers: Provider[]): void {
    providers.forEach((provider) => {
      this.instanceContainer.register(provider.provide, provider.useValue);
    });
  }

  resolve<T>(ctor: Type<T>): T {
    const parameters = this.resolveConstructorParameters(ctor);
    const instance = new ctor(...parameters);
    this.resolveProperty(ctor, instance);

    return instance;
  }

  resolveConstructorParameters<T>(ctor: Type<T>): any[] {
    const metadata: ParameterInjectMetadata[] =
      Reflect.getMetadata(PARAMETER_INJECT_METADATA, ctor) ?? [];

    const result: any[] = [];
    metadata.map((m) => {
      result[m.index] = this.instanceContainer.get(m.token);
    });

    return result;
  }

  resolveProperty<T>(ctor: Type<T>, instance: T): void {
    const metadata: PropertyInjectMetadata[] =
      Reflect.getMetadata(PROPERTY_INJECT_METADATA, ctor) ?? [];

    metadata.forEach((m) => {
      (instance as any)[m.propertyKey] = this.instanceContainer.get(m.token);
    });
  }
}
