import { useState } from 'react';

export function getInputOnChange<T>(
  setValue: (value: null | undefined | T | ((current: T) => T)) => void
) {
  return (val: null | undefined | T | React.ChangeEvent<any> | ((current: T) => T)) => {
    if (!val) {
      setValue(val as T);
    } else if (typeof val === 'function') {
      setValue(val);
    } else if (typeof val === 'object' && 'nativeEvent' in val) {
      const { currentTarget } = val;

      if (currentTarget.type === 'checkbox') {
        setValue((currentTarget as any).checked as any);
      } else {
        setValue(currentTarget.value as any);
      }
    } else {
      setValue(val);
    }
  };
}

export type UseInputStateReturnValue<T> = [
  T,
  (value: null | undefined | T | React.ChangeEvent<any>) => void,
];

export function useInputState<T>(initialState: T): UseInputStateReturnValue<T> {
  const [value, setValue] = useState<T>(initialState);
  return [value, getInputOnChange<T>(setValue as any)];
}
