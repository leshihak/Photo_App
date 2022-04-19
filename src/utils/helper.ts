export const getKeyByValue = (
  object: { [key: number]: string },
  value: string
): number =>
  +(Object.keys(object).find((key) => object[key as any] === value) ?? 0);
