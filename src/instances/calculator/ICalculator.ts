export const CalculatorToken = Symbol('Calculator');

export interface ICalculator {
  add: (a: number, b: number) => number;
}
