import { ICalculator } from '@lery/instances/calculator/ICalculator';

export class Calculator implements ICalculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
