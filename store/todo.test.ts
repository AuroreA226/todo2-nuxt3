import {setActivePinia, createPinia} from 'pinia';
import {
  describe,
  test,
  expect,
  beforeAll, 
  beforeEach, 
  afterEach,
  afterAll,
} from 'vitest';
import {useTodoStore} from './todo';

const getFirstTodoId = (store: ReturnType<typeof useTodoStore>) => {
  return store.items[0].id
}



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
        store.add({ label: "Test my code!" });
        expect(store.items[0]).toBeDefined();
    });

    test("gets by id", () => {
        store.add({ label: "Test" });
        const item = store.items[0];
        const todo = store.getTodoById(item.id);
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
        const orderedTodos = store.getSortedTodos;

        expect(orderedTodos[0].createdAt.getFullYear()).toBe(2020);
        expect(orderedTodos[1].createdAt.getFullYear()).toBe(2021);
        expect(orderedTodos[2].createdAt.getFullYear()).toBe(2022);
        expect(store.items[0].createdAt.getFullYear()).toBe(2022);
    });

    test("delete a todo",() => {
        store.add({label: "Delete Me"});
        const id = getFirstTodoId(store)
        store.remove(id);
        expect(store.items).toStrictEqual([]);
    })
    
    test("updates a todo label", () => {
        store.add({label: "Edit Me"});
        const id = getFirstTodoId(store);
        store.update(id, { label: "Edited"});
        expect(store.getTodoById(id).label).toBe("Edited");
    });

    test("updates a todo done", () => {
      store.add({label: "Edit Me"});
      const id = getFirstTodoId(store);
      store.update(id, { done: true});
      expect(store.getTodoById(id).done).toBe("true");
  });

  });
