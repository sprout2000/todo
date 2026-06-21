// biome-ignore lint/suspicious/noExplicitAny: <this is a type guard function>
const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === "object" &&
    typeof arg.id === "number" &&
    typeof arg.value === "string" &&
    typeof arg.checked === "boolean" &&
    typeof arg.removed === "boolean"
  );
};

// biome-ignore lint/suspicious/noExplicitAny: <this is a type guard function>
export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};
