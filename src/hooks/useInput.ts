import { useState } from 'react';

type HookPropsType = {
  value: '';
  onChange: (e: any) => void;
};
type ResetValueType = () => void;

export const useInput = (
  initialValue: any
): [HookPropsType, ResetValueType] => {
  const [value, setValue] = useState(initialValue);

  return [
    {
      value,
      onChange: (e: any) => {
        const el = e.target as HTMLInputElement;
        setValue(el.value);
      }
    },
    () => setValue(initialValue)
  ];
};
