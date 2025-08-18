/* eslint-disable comma-dangle */
const CONNECT_BOARD = 'scratch-gui/board-connection/CONNECT_BOARD';
const DISCONNECT_BOARD = 'scratch-gui/board-connection/DISCONNECT_BOARD';
const SET_BOARD_NAME = 'scratch-gui/board-connection/SET_BOARD_NAME';
const SET_CONNECTION_STATUS = 'scratch-gui/board-connection/SET_CONNECTION_STATUS';
const SET_AVAILABLE_DEVICES = 'scratch-gui/board-connection/SET_AVAILABLE_DEVICES';
const SCAN_DEVICES = 'scratch-gui/board-connection/SCAN_DEVICES';
const SET_SCANNING_STATUS = 'scratch-gui/board-connection/SET_SCANNING_STATUS';
const SET_SELECTED_DEVICE = 'scratch-gui/board-connection/SET_SELECTED_DEVICE';

const initialState = {
    isConnected: false,
    boardName: '',
    connectionStatus: 'disconnected', // 'disconnected', 'connecting', 'connected', 'error'
    errorMessage: '',
    availableDevices: [],
    isScanning: false,
    selectedDevice: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case CONNECT_BOARD:
        return {
            ...state,
            isConnected: true,
            connectionStatus: 'connected',
            errorMessage: ''
        };
    case DISCONNECT_BOARD:
        return {
            ...state,
            isConnected: false,
            boardName: '',
            connectionStatus: 'disconnected',
            errorMessage: '',
            selectedDevice: null
        };
    case SET_BOARD_NAME:
        return {
            ...state,
            boardName: action.boardName
        };
    case SET_CONNECTION_STATUS:
        return {
            ...state,
            connectionStatus: action.status,
            errorMessage: action.errorMessage || ''
        };
    case SET_AVAILABLE_DEVICES:
        return {
            ...state,
            availableDevices: action.devices || []
        };
    case SCAN_DEVICES:
        return {
            ...state,
            isScanning: true
        };
    case SET_SCANNING_STATUS:
        return {
            ...state,
            isScanning: action.isScanning
        };
    case SET_SELECTED_DEVICE:
        return {
            ...state,
            selectedDevice: action.device
        };
    default:
        return state;
    }
};

const connectBoard = () => ({
    type: CONNECT_BOARD
});

const disconnectBoard = () => ({
    type: DISCONNECT_BOARD
});

const setBoardName = boardName => ({
    type: SET_BOARD_NAME,
    boardName: boardName
});

const setConnectionStatus = (status, errorMessage) => ({
    type: SET_CONNECTION_STATUS,
    status: status,
    errorMessage: errorMessage
});

const setAvailableDevices = devices => ({
    type: SET_AVAILABLE_DEVICES,
    devices: devices
});

const scanDevices = () => ({
    type: SCAN_DEVICES
});

const setScanningStatus = isScanning => ({
    type: SET_SCANNING_STATUS,
    isScanning: isScanning
});

const setSelectedDevice = device => ({
    type: SET_SELECTED_DEVICE,
    device: device
});

export {
    reducer as default,
    initialState as boardConnectionInitialState,
    connectBoard,
    disconnectBoard,
    setBoardName,
    setConnectionStatus,
    setAvailableDevices,
    scanDevices,
    setScanningStatus,
    setSelectedDevice
};
