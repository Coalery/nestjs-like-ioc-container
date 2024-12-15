import { ClassProvider, Provider, ValueProvider } from '@lery/common/Provider';
import { Token } from '@lery/common/Token';

import {
  PARAMETER_INJECT_METADATA,
  PROPERTY_INJECT_METADATA,
  ParameterInjectMetadata,
  PropertyInjectMetadata,
} from '@lery/core/metadata/InjectMetadata';
import { InstanceContainer } from '@lery/core/container/InstanceContainer';
import { InstanceWrapper } from '@lery/core/instance/InstanceWrapper';

type PropertyResolveResult = {
  propertyKey: string | symbol;
  instance: any;
};

export class Resolver {
  private readonly instanceContainer: InstanceContainer;

  constructor(providers: Provider[]) {
    this.instanceContainer = new InstanceContainer();
    this.registerProviders(providers);
  }

  private registerProviders(providers: Provider[]): void {
    providers.forEach((provider) => {
      if ('useValue' in provider) {
        this.registerValueProvider(provider);
      } else if ('useClass' in provider) {
        this.registerClassProvider(provider);
      } else {
        this.registerClassProvider({ provide: provider, useClass: provider });
      }
    });
  }

  private registerValueProvider<T>(provider: ValueProvider<T>): void {
    const token = provider.provide;
    const instance = provider.useValue;

    const wrapper = new InstanceWrapper(token);
    wrapper.resolve(instance);

    this.instanceContainer.register(token, wrapper);
  }

  private registerClassProvider<T>(provider: ClassProvider<T>): void {
    const token = provider.provide;
    const ctor = provider.useClass;

    const wrapper = new InstanceWrapper(token, ctor);

    this.instanceContainer.register(token, wrapper);
  }

  resolve(): void {
    this.instanceContainer.wrappers.forEach((wrapper) => {
      this.loadProvider(wrapper);
    });
  }

  get<T>(token: Token<T>): T {
    const wrapper = this.instanceContainer.get(token);

    if (wrapper.instance === undefined) {
      throw new Error(
        `Instance of ${wrapper.token.toString()} is not resolved`
      );
    }

    return wrapper.instance;
  }

  private loadProvider<T>(wrapper: InstanceWrapper<T>): void {
    if (wrapper.isResolved) {
      return;
    }

    const ctorParams = this.resolveConstructorParameters(wrapper);
    const propParams = this.resolveProperties(wrapper);

    const instance = this.instantiate(wrapper, ctorParams);
    this.applyProperties(instance, propParams);

    wrapper.resolve(instance);
  }

  private resolveConstructorParameters<T>(wrapper: InstanceWrapper<T>): any[] {
    if (!wrapper.creatorFn) {
      return [];
    }

    const metadata: ParameterInjectMetadata[] =
      Reflect.getMetadata(PARAMETER_INJECT_METADATA, wrapper.creatorFn) ?? [];

    const result: any[] = [];
    metadata.forEach((m) => {
      const wrapper = this.instanceContainer.get(m.token);
      this.loadProvider(wrapper);

      result[m.index] = wrapper.instance;
    });

    return result;
  }

  private resolveProperties<T>(
    wrapper: InstanceWrapper<T>
  ): PropertyResolveResult[] {
    if (!wrapper.creatorFn) {
      return [];
    }

    const metadata: PropertyInjectMetadata[] =
      Reflect.getMetadata(PROPERTY_INJECT_METADATA, wrapper.creatorFn) ?? [];

    const result = metadata.map<PropertyResolveResult>((m) => {
      const wrapper = this.instanceContainer.get(m.token);
      this.loadProvider(wrapper);

      return { propertyKey: m.propertyKey, instance: wrapper.instance };
    });

    return result;
  }

  private applyProperties<T>(
    instance: T,
    properties: PropertyResolveResult[]
  ): void {
    properties.forEach((p) => {
      (instance as any)[p.propertyKey] = p.instance;
    });
  }

  private instantiate<T>(wrapper: InstanceWrapper<T>, ctorParams: any[]): T {
    const instance: T = new wrapper.creatorFn!(...ctorParams);
    wrapper.resolve(instance);

    return instance;
  }
}
