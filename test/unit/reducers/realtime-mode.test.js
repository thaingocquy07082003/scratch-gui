/* eslint-env jest */
import realtimeModeReducer, {
    setRealtimeMode,
    realtimeModeInitialState
} from '../../../src/reducers/realtime-mode';

test('initialState', () => {
    let defaultState;
    /* realtimeModeReducer(state, action) */
    expect(realtimeModeReducer(defaultState, {type: 'anything'})).toBeDefined();
    expect(realtimeModeReducer(defaultState, {type: 'anything'}).realtimeMode).toBe(false);
});

test('setRealtimeMode action creator', () => {
    const action = setRealtimeMode(true);
    expect(action.type).toBe('scratch-gui/realtime-mode/SET_REALTIME_MODE');
    expect(action.realtimeMode).toBe(true);
});

test('SET_REALTIME_MODE action sets realtime mode to true', () => {
    const previousState = {
        realtimeMode: false
    };
    const action = {
        type: 'scratch-gui/realtime-mode/SET_REALTIME_MODE',
        realtimeMode: true
    };
    const newState = {
        realtimeMode: true
    };
    /* realtimeModeReducer(state, action) */
    expect(realtimeModeReducer(previousState, action)).toEqual(newState);
});

test('SET_REALTIME_MODE action sets realtime mode to false', () => {
    const previousState = {
        realtimeMode: true
    };
    const action = {
        type: 'scratch-gui/realtime-mode/SET_REALTIME_MODE',
        realtimeMode: false
    };
    const newState = {
        realtimeMode: false
    };
    /* realtimeModeReducer(state, action) */
    expect(realtimeModeReducer(previousState, action)).toEqual(newState);
});

test('unknown action returns current state', () => {
    const previousState = {
        realtimeMode: true
    };
    const action = {
        type: 'UNKNOWN_ACTION'
    };
    /* realtimeModeReducer(state, action) */
    expect(realtimeModeReducer(previousState, action)).toEqual(previousState);
});
