import { counterReducer } from './model/slice/counterSlice';
import { Counter } from './ui/Counter';
import type { CounterSchema } from './model/types/counterSchema';

export {
    counterReducer,
    Counter,
    CounterSchema,
};

// тестовая сущность, для ознакомления с redux-toolkit
// https://redux-toolkit.js.org/tutorials/quick-start + 30 выпуск ulbi tv
