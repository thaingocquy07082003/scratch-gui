const SET_REALTIME_MODE = 'scratch-gui/realtime-mode/SET_REALTIME_MODE';

const realtimeModeInitialState = {
    realtimeMode: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = realtimeModeInitialState;

    switch (action.type) {
    case SET_REALTIME_MODE:
        return {
            ...state,
            realtimeMode: action.realtimeMode
        };
    default:
        return state;
    }
};

const setRealtimeMode = realtimeMode => ({
    type: SET_REALTIME_MODE,
    realtimeMode
});

export {
    reducer as default,
    setRealtimeMode,
    realtimeModeInitialState
};
