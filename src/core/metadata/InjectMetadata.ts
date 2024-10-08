import { Token } from '@lery/common/Token';

export const PARAMETER_INJECT_METADATA = 'PARAMETER_INJECT_METADATA' as const;
export const PROPERTY_INJECT_METADATA = 'PROPERTY_INJECT_METADATA' as const;

export type ParameterInjectMetadata = {
  token: Token;
  index: number;
};

export type PropertyInjectMetadata = {
  token: Token;
  propertyKey: string | symbol;
};
