import { Token } from '@lery/common/Token';
import { InstanceWrapper } from '@lery/core/instance/InstanceWrapper';

export class InstanceContainer {
  private readonly instanceMap: Map<Token, InstanceWrapper<any>> = new Map();

  register<T>(token: Token<T>, wrapper: InstanceWrapper<T>): void {
    this.instanceMap.set(token, wrapper);
  }

  get<T>(token: Token<T>): InstanceWrapper<T> {
    if (!this.instanceMap.has(token)) {
      throw new Error(`No instance found for token ${token.toString()}`);
    }

    return this.instanceMap.get(token) as InstanceWrapper<T>;
  }

  get wrappers(): InstanceWrapper<any>[] {
    return Array.from(this.instanceMap.values());
  }
}
