export const classNames = (...args: Array<string | undefined>) => {
  var classes = [...args];

  return classes.filter(Boolean).join(" ");
};

export const getCellTestId = (...attrs: Array<string | number>) =>
  attrs.join("-");
