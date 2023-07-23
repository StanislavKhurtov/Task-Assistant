import { userReducer } from './user-reducer';

describe('userReducer', () => {
    it('should handle BlaBla action', () => {
        const initialState = {
            age: 30,
            childrenCount: 2,
            name: 'John',
        };

        const action = {
            type: 'BlaBla',
            // Дополнительные свойства, если требуются для теста
        };

        const newState = userReducer(initialState, action);

        // Проверяем, что состояние после действия 'BlaBla' соответствует вашим ожиданиям
        expect(newState).toEqual({
            age: 30,
            childrenCount: 2,
            name: 'John',
            // Дополнительные свойства, если вы их изменяете в редюсере
        });
    });

    it('should throw an error for unknown action type', () => {
        const initialState = {
            age: 30,
            childrenCount: 2,
            name: 'John',
        };

        const action = {
            type: 'UnknownAction',
            // Дополнительные свойства, если требуются для теста
        };

        // Проверяем, что при неизвестном типе действия будет выброшено исключение
        expect(() => {
            userReducer(initialState, action);
        }).toThrow("I don't understand this action type");
    });
});