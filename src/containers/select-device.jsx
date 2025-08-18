import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';

import SelectDeviceButton from '../components/menu-bar/upload-code-button.jsx';
import DeviceSelectorModal from '../components/device-selector-modal/device-selector-modal.jsx';

import {
    setAvailableDevices,
    scanDevices,
    setScanningStatus,
    setSelectedDevice
} from '../reducers/board-connection';

const SelectDevice = ({
    onRequestOpen,
    availableDevices,
    isScanning,
    selectedDevice,
    onSetSelectedDevice
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        // Auto-scan for devices when opening the modal
        onRequestOpen();
    };

    const handleCloseModal = () => {
        console.log('Closing modal');
        setIsModalOpen(false);
    };

    const handleDeviceSelect = device => {
        if (device) {
            console.log('Selected device:', device);
            // Set the selected device in Redux store
            onSetSelectedDevice(device);
            // TODO: Implement device selection logic
            // This would typically involve:
            // 1. Setting the selected device as active
            // 2. Updating the connection state
            // 3. Preparing for code upload
        }
        // Close modal after selection
        handleCloseModal();
    };

    const handleRefreshDevices = () => {
        console.log('Refreshing devices');
        onRequestOpen();
    };

    // Close modal when clicking outside or pressing ESC
    const handleRequestClose = () => {
        console.log('Request close modal');
        handleCloseModal();
    };

    return (
        <>
            <SelectDeviceButton
                onRequestOpen={handleOpenModal}
                selectedDevice={selectedDevice}
            />
            <DeviceSelectorModal
                isOpen={isModalOpen}
                onRequestClose={handleRequestClose}
                availableDevices={availableDevices}
                onSelectDevice={handleDeviceSelect}
                isScanning={isScanning}
                onRefreshDevices={handleRefreshDevices}
            />
        </>
    );
};

SelectDevice.propTypes = {
    onRequestOpen: PropTypes.func.isRequired,
    availableDevices: PropTypes.array,
    isScanning: PropTypes.bool,
    selectedDevice: PropTypes.shape({
        name: PropTypes.string,
        port: PropTypes.string,
        id: PropTypes.string
    }),
    onSetSelectedDevice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    availableDevices: (state.scratchGui.boardConnection && state.scratchGui.boardConnection.availableDevices) || [],
    isScanning: (state.scratchGui.boardConnection && state.scratchGui.boardConnection.isScanning) || false,
    selectedDevice: (state.scratchGui.boardConnection && state.scratchGui.boardConnection.selectedDevice) || null
});

const mapDispatchToProps = dispatch => ({
    onRequestOpen: () => {
        console.log('Starting device scan');
        // Auto-scan for devices when opening the modal
        dispatch(scanDevices());
        // Simulate finding devices (in real implementation, this would use Web Serial API)
        setTimeout(() => {
            const mockDevices = [
                {name: 'Arduino Uno', port: 'COM3', id: 'arduino-uno-1'},
                {name: 'Arduino Nano', port: 'COM4', id: 'arduino-nano-1'},
                {name: 'ESP32 DevKit', port: 'COM5', id: 'esp32-1'}
            ];
            console.log('Found devices:', mockDevices);
            dispatch(setAvailableDevices(mockDevices));
            dispatch(setScanningStatus(false));
        }, 1000);
    },
    onSetSelectedDevice: device => {
        dispatch(setSelectedDevice(device));
    }
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SelectDevice);
