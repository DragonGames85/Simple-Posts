import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

// этот провайдер нужен для асинхронной подгрузки библиотек

type SpringType = typeof import('@react-spring/web'); // достаем типы
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
    // данные для контекста
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}
// создаем контекст, в который мы будем оборачивать только те компоненты, где нужна эти либы
const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга
const getAsyncAnimationModules = async () => {
    // Promise.all возвращает массив резольвенных промисов [a,b]
    return Promise.all([
        import('@react-spring/web'), // этот импорт с '' является асинхронным,
        import('@use-gesture/react'), // он работает с промисами
    ]);
};
// хук для получения данных из контекста
export const useAnimationLibs = () => {
    // as Required<AnimationContextPayload> мы указываем, что результат НЕ будет undefined
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>(); // рефы мы создаем чтобы у нас от рендера к рендеру
    const GestureRef = useRef<GestureType>(); // был доступ к значению, но не было лишних перерисовок
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(
        () => ({
            // useMemo, так как мы значение передаем в props
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    );

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
