export const classNames = (...args: Array<string | undefined>) => {
  var classes = [...args];

  return classes.filter(Boolean).join(" ");
};
