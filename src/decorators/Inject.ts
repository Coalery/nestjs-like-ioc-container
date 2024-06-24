import {
  PARAMETER_INJECT_METADATA,
  PROPERTY_INJECT_METADATA,
  ParameterInjectMetadata,
  PropertyInjectMetadata,
} from '@lery/core/metadata/InjectMetadata';

export const Inject =
  (token: string) =>
  (
    target: object,
    propertyKey: string | symbol | undefined,
    index?: number
  ) => {
    const appendMetadata = <T>(key: string, metadata: T, target: object) => {
      const prevMetadata: T[] = Reflect.getMetadata(key, target) ?? [];
      Reflect.defineMetadata(key, prevMetadata.concat(metadata), target);
    };

    if (index !== undefined) {
      const metadata: ParameterInjectMetadata = { token, index };
      appendMetadata(PARAMETER_INJECT_METADATA, metadata, target);
    }

    if (propertyKey !== undefined) {
      const metadata: PropertyInjectMetadata = { token, propertyKey };
      appendMetadata(PROPERTY_INJECT_METADATA, metadata, target.constructor);
    }
  };

export const CalculatorToken = 'Calculator';
export const InjectCalculator = () => Inject(CalculatorToken);

export const LoggerToken = 'Logger';
export const InjectLogger = () => Inject(LoggerToken);

export const HelloWorldToken = 'HelloWorld';
export const InjectHelloWorld = () => Inject(HelloWorldToken);

export const FileManagerToken = 'FileManager';
export const InjectFileManager = () => Inject(FileManagerToken);
