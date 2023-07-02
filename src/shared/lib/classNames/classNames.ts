export type Mods = Record<string, boolean | string | undefined>
// замена CLASSNAMES REACT
// например: classNames('remove-btn', {hovered: true, disabled: false}, ['clr-red', 'clr-green'])
// => 'remove-btn hovered clr-red clr-green'
export function classNames(
    cls: string, // главный класс, например app
    mods: Mods = {}, // классы с ключом и boolean значением, boolean = true - добавляем
    additional: Array<string | undefined> = [], // добавочные классы, например padding
): string {
    return [
        cls,
        ...additional.filter(Boolean), // могут прилетать undefined
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ]
        .join(' ');
}
