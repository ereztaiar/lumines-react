import { menuReducer, defaultState } from './menuReducer';
import { MENU_ITEMS, MENU_LENGTH } from '../config/menuConfig';

describe('menuReducer', () => {
    it('starts pristine with menuLocked null and highlight on first item', () => {
        expect(defaultState.menuLocked).toBe(null);
        expect(defaultState.highlightIndex).toBe(0);
        expect(defaultState.selected).toBe(null);
    });

    describe('navigation', () => {
        it('menu_down increments highlightIndex', () => {
            const next = menuReducer(defaultState, { type: 'menu_down' });
            expect(next.highlightIndex).toBe(1);
        });

        it('menu_down wraps from last item to first', () => {
            const state = { ...defaultState, highlightIndex: MENU_LENGTH - 1 };
            const next = menuReducer(state, { type: 'menu_down' });
            expect(next.highlightIndex).toBe(0);
        });

        it('menu_up decrements highlightIndex', () => {
            const state = { ...defaultState, highlightIndex: 2 };
            const next = menuReducer(state, { type: 'menu_up' });
            expect(next.highlightIndex).toBe(1);
        });

        it('menu_up wraps from first item to last', () => {
            const next = menuReducer(defaultState, { type: 'menu_up' });
            expect(next.highlightIndex).toBe(MENU_LENGTH - 1);
        });

        it('does not mutate the input state', () => {
            const state = { ...defaultState };
            menuReducer(state, { type: 'menu_up' });
            menuReducer(state, { type: 'menu_down' });
            expect(state).toEqual(defaultState);
        });
    });

    describe('selection', () => {
        it('selected locks the highlighted item by name', () => {
            const state = { ...defaultState, highlightIndex: 3 };
            const next = menuReducer(state, { type: 'selected' });
            expect(next.selected).toBe(MENU_ITEMS[3].name);
            expect(next.menuLocked).toBe(true);
        });

        it('ignores navigation and re-selection while an item is selected', () => {
            const state = { ...defaultState, selected: 'play', menuLocked: true };
            expect(menuReducer(state, { type: 'menu_up' })).toBe(state);
            expect(menuReducer(state, { type: 'menu_down' })).toBe(state);
            expect(menuReducer(state, { type: 'selected' })).toBe(state);
        });

        it('menu_exit clears selection and unlocks', () => {
            const state = { ...defaultState, highlightIndex: 1, selected: 'setting', menuLocked: true };
            const next = menuReducer(state, { type: 'menu_exit' });
            expect(next.selected).toBe(null);
            expect(next.menuLocked).toBe(false);
            expect(next.highlightIndex).toBe(1);
        });

        it('menu_exit while browsing is a no-op', () => {
            const state = { ...defaultState, highlightIndex: 2 };
            expect(menuReducer(state, { type: 'menu_exit' })).toBe(state);
        });
    });
});
