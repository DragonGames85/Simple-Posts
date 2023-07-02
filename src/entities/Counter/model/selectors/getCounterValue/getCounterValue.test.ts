import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

// deep partial - это когда мы делаем все свойства объекта необязательными, и все свойства объекта могут быть undefined.
describe('getCounterValue.test', () => {
    test('', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounterValue(state as StateSchema)).toEqual(10);
    });
});
