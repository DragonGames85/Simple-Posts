type Mods = Record<string, boolean | string>;

// Record is object but with limited amount of values
// EXAMPLE
// const obj: Mods = {
//     'hovered': true (or string).
// }

export function classNames(
  cls: string,
  mods: Mods,
  additional: string[]
): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([cls, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(" ");
}

// EXAMPLE
//classNames('remove-btn', {hovered: true, selectable: true, red: false}, ['paddingClass', 'colorClass'])
// -> 'remove-btn', hoveredselectable paddingClass, colorClass
