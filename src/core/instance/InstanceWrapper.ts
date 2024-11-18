import { Token } from '@lery/common/Token';
import { Type } from '@lery/common/Type';

export class InstanceWrapper<T = any> {
  private readonly _token: Token<T>;
  private _instance: T | undefined = undefined;

  private _creatorFn: Type<T> | undefined;
  private _isResolved = false;

  constructor(token: Token, creatorFn?: Type<T>) {
    this._token = token;
    this._creatorFn = creatorFn;
  }

  get token(): Token<T> {
    return this._token;
  }

  get instance(): T | undefined {
    return this._instance;
  }

  get creatorFn(): Type<T> | undefined {
    return this._creatorFn;
  }

  get isResolved(): boolean {
    return this._isResolved;
  }

  public resolve(instance: T): void {
    if (this._isResolved) {
      return;
    }

    this._instance = instance;
    this._isResolved = true;
  }
}
