import { Token } from '@lery/common/Token';
import { Type } from '@lery/common/Type';

export type Provider<T = any> =
  | ConstructorProvider<T>
  | ValueProvider<T>
  | ClassProvider<T>;

export type ConstructorProvider<T = any> = Type<T>;

export type ValueProvider<T = any> = {
  provide: Token;
  useValue: T;
};

export type ClassProvider<T = any> = {
  provide: Token;
  useClass: Type<T>;
};
