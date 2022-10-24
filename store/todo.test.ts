import {setActivePinia, createPinia} from 'pinia';
import {describe, test, expect, beforeAll, beforeEach, afterEach} from 'vitest';
import {useTodoStore} from './todo'

beforeAll(() => {
    setActivePinia(createPinia());
});

describe("useTodoStore", () => {
    let store: ReturnType<typeof useTodoStore>;

    beforeEach(() => {
    store = useTodoStore();
});

    afterEach(() => {
        store.$reset();
})
    
    test("creates a store", () => {
        const store = useTodoStore();
        expect(store).toBeDefined();
    });

    test("initializes with empty items", () => {
        expect(store.items).toStrictEqual([]);
    });

    test("creates a todo", () => {
        store.add({ title: "Test my code!" });
        expect(store.items[0]).toBeDefined();
    });

    test("gets by id", () => {
        store.add({ title: "Test" });
        const item = store.items[0];
        const todo = store.getById(item.id);
        expect(todo).toStrictEqual(item);
    });

    test("gets oredered todos without mutating state", () => {
        const items = [
            {
                createAt: new Date(2022, 10, 20),
            },
            {
                createAt: new Date(2020, 10, 20),
            },
            {
                createAt: new Date(2021, 10, 20),
            },
        ];

        //@ts-ignore
        store.items = items;
        const orderedTodos = store.getOrderedTodos;

        expect(orderedTodos[0].createAt.getFullYear()).toBe(2020);
        expect(orderedTodos[1].createAt.getFullYear()).toBe(2021);
        expect(orderedTodos[2].createAt.getFullYear()).toBe(2022);
        expect(store.items[0].createAt.getFullYear()).toBe(2022);
    });

    test("remove a todo",() => {
        store.add({title: "test"});
        const todo = store.items[0];
        store.remove(todo.id);
        expect(store.items).toStrictEqual([]);
    })
    
    test("updates a todo", () => {
        store.add({title: "test"});

        const todo = store.items[0];
        store.update(todo.id, { title: "tested"});

        const updated = store.items[0];
        expect(updated.title).toBe("tested");
    });
  });
