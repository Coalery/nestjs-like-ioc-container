import { Token } from '@lery/common/Token';

export class InstanceContainer {
  private readonly instanceMap: Map<Token, any> = new Map();

  register<T>(token: Token<T>, instance: T): void {
    this.instanceMap.set(token, instance);
  }

  get<T>(token: Token<T>): T {
    if (!this.instanceMap.has(token)) {
      throw new Error(`No instance found for token ${token.toString()}`);
    }

    return this.instanceMap.get(token);
  }
}
