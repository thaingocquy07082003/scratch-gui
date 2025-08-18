import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';

import SelectDeviceButton from '../components/menu-bar/upload-code-button.jsx';

import {
    openUploadCodeMenu,
    closeUploadCodeMenu,
    uploadCodeMenuOpen
} from '../reducers/menus';
import {
    connectBoard,
    disconnectBoard,
    setBoardName,
    setAvailableDevices
} from '../reducers/board-connection';

const SelectDevice = ({
    isOpen,
    isRtl,
    onRequestClose,
    onRequestOpen,
    onSelectDevice,
    onConnectBoard,
    onDisconnectBoard,
    isConnected,
    boardName,
    availableDevices
}) => (
    <SelectDeviceButton
        isOpen={isOpen}
        isRtl={isRtl}
        onRequestClose={onRequestClose}
        onRequestOpen={onRequestOpen}
        onSelectDevice={onSelectDevice}
        onConnectBoard={onConnectBoard}
        onDisconnectBoard={onDisconnectBoard}
        isConnected={isConnected}
        boardName={boardName}
        availableDevices={availableDevices}
    />
);

SelectDevice.propTypes = {
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onRequestOpen: PropTypes.func.isRequired,
    onSelectDevice: PropTypes.func.isRequired,
    onConnectBoard: PropTypes.func.isRequired,
    onDisconnectBoard: PropTypes.func.isRequired,
    isConnected: PropTypes.bool,
    boardName: PropTypes.string,
    availableDevices: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
    isOpen: ownProps.uploadCodeMenuOpen || uploadCodeMenuOpen(state),
    isRtl: ownProps.isRtl || state.locales.isRtl,
    isConnected: state.scratchGui.boardConnection && state.scratchGui.boardConnection.isConnected,
    boardName: state.scratchGui.boardConnection && state.scratchGui.boardConnection.boardName,
    availableDevices: state.scratchGui.boardConnection && state.scratchGui.boardConnection.availableDevices || []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRequestOpen: ownProps.onRequestOpenUploadCode || (() => dispatch(openUploadCodeMenu())),
    onRequestClose: ownProps.onRequestCloseUploadCode || (() => dispatch(closeUploadCodeMenu())),
    onSelectDevice: (device) => {
        if (device) {
            console.log('Selected device:', device);
            // TODO: Implement device selection logic
            // This would typically involve:
            // 1. Setting the selected device as active
            // 2. Updating the connection state
            // 3. Preparing for code upload
        } else {
            // Upload code to currently connected board
            console.log('Uploading code to connected board...');
            // TODO: Implement actual code upload logic
        }
    },
    onConnectBoard: () => {
        // TODO: Implement board connection logic
        console.log('Connecting to board...');
        // This would typically involve:
        // 1. Scanning for available boards
        // 2. Establishing connection
        // 3. Updating connection state
        dispatch(connectBoard());
        dispatch(setBoardName('Arduino Uno')); // Example board name
    },
    onDisconnectBoard: () => {
        // TODO: Implement board disconnection logic
        console.log('Disconnecting from board...');
        // This would typically involve:
        // 1. Closing the connection
        // 2. Updating connection state
        dispatch(disconnectBoard());
    }
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SelectDevice);
