import {setActivePinia, createPinia} from 'pinia';
import {describe, test, expect, beforeAll, beforeEach, afterEach} from 'vitest';
import {useTodoStore} from './todo'

beforeAll(() => {
    setActivePinia(createPinia());
});

describe('useTodoStore', () => {
    let store: ReturnType<typeof useTodoStore>;

    beforeEach(() => {
    store = useTodoStore();
});

    afterEach(() => {
        store.$reset();
})
    
    test('create a store', () => {
        const store = useTodoStore();
        expect(store).toBeDefined();
    });

    test("initializes with empty items", () => {
        expect(store.items).toStrictEqual([]);
    })

    test("create a toto", () => {
        store.add({ title: "Test my code!"});
        expect(store.items[0]).toBeDefined();
       expect(store.items[0].title).toBe('Test my code!'); 
    })
});
