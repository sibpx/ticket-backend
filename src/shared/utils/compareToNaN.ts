export const compareToNaN = (arg: string, def: number) => {
  const numberedArg = Number(arg);

  return isNaN(numberedArg) ? def : numberedArg;
};
