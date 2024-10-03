import { Token } from './Token';

export type Provider<T = any> = ValueProvider<T>;

export type ValueProvider<T = any> = {
  provide: Token;
  useValue: T;
};
