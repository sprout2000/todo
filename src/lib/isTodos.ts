/* eslint-disable @typescript-eslint/no-explicit-any */
export const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.value === 'string' &&
    typeof arg.checked === 'boolean' &&
    typeof arg.removed === 'boolean'
  );
};

export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};
