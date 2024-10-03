import { Type } from './Type';

export type Token<T = any> = string | symbol | Type<T>;
