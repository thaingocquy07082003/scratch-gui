/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import ReactModal from 'react-modal';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import styles from './device-selector-modal.css';

const DeviceSelectorModal = ({
    isOpen,
    onRequestClose,
    availableDevices,
    onSelectDevice,
    isScanning,
    onRefreshDevices
}) => {
    const handleDeviceSelect = device => {
        onSelectDevice(device);
        onRequestClose();
    };

    const handleRefresh = () => {
        onRefreshDevices();
    };

    const handleCloseModal = () => {
        onRequestClose();
    };

    const handleCancel = () => {
        onRequestClose();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
            contentLabel="Device Selector"
            ariaHideApp={false}
        >
            <Box className={styles.modalContent}>
                <Box className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        <FormattedMessage
                            defaultMessage="Select Device"
                            description="Title for device selector modal"
                            id="gui.deviceSelector.title"
                        />
                    </h2>
                    <Button
                        className={styles.closeButton}
                        onClick={handleCloseModal}
                    >
                        {'×'}
                    </Button>
                </Box>

                <Box className={styles.modalBody}>
                    <Box className={styles.controls}>
                        <Button
                            className={styles.refreshButton}
                            onClick={handleRefresh}
                            disabled={isScanning}
                        >
                            {isScanning ? (
                                <Box className={styles.loadingSpinner}>
                                    <Box className={styles.spinner} />
                                    <span>{'Scanning...'}</span>
                                </Box>
                            ) : (
                                <FormattedMessage
                                    defaultMessage="Refresh Devices"
                                    description="Button to refresh device list"
                                    id="gui.deviceSelector.refresh"
                                />
                            )}
                        </Button>
                    </Box>

                    {isScanning && (
                        <Box className={styles.scanningMessage}>
                            <Box className={styles.scanningSpinner}>
                                <Box className={styles.spinner} />
                            </Box>
                            <FormattedMessage
                                defaultMessage="Scanning for devices..."
                                description="Message shown while scanning for devices"
                                id="gui.deviceSelector.scanning"
                            />
                        </Box>
                    )}

                    {!isScanning && availableDevices && availableDevices.length > 0 && (
                        <Box className={styles.deviceList}>
                            <h3 className={styles.deviceListTitle}>
                                <FormattedMessage
                                    defaultMessage="Available Devices"
                                    description="Header for available devices list"
                                    id="gui.deviceSelector.availableDevices"
                                />
                            </h3>
                            {availableDevices.map((device, index) => (
                                <Box
                                    key={index}
                                    className={styles.deviceItem}
                                    onClick={() => handleDeviceSelect(device)}
                                >
                                    <Box className={styles.deviceInfo}>
                                        <Box className={styles.deviceName}>
                                            {device.name || 'Unknown Device'}
                                        </Box>
                                        <Box className={styles.devicePort}>
                                            {device.port || 'Unknown Port'}
                                        </Box>
                                        {device.id && (
                                            <Box className={styles.deviceId}>
                                                {'ID: '}{device.id}
                                            </Box>
                                        )}
                                    </Box>
                                    <Box className={styles.selectButton}>
                                        <FormattedMessage
                                            defaultMessage="Select"
                                            description="Button to select a device"
                                            id="gui.deviceSelector.select"
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {!isScanning && (!availableDevices || availableDevices.length === 0) && (
                        <Box className={styles.noDevicesMessage}>
                            <FormattedMessage
                                defaultMessage="No devices found. Please connect a device and try refreshing."
                                description="Message shown when no devices are available"
                                id="gui.deviceSelector.noDevices"
                            />
                        </Box>
                    )}
                </Box>

                <Box className={styles.modalFooter}>
                    <Button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                    >
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description="Button to cancel device selection"
                            id="gui.deviceSelector.cancel"
                        />
                    </Button>
                </Box>
            </Box>
        </ReactModal>
    );
};

DeviceSelectorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    availableDevices: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        port: PropTypes.string,
        id: PropTypes.string
    })),
    onSelectDevice: PropTypes.func.isRequired,
    isScanning: PropTypes.bool,
    onRefreshDevices: PropTypes.func.isRequired
};

DeviceSelectorModal.defaultProps = {
    availableDevices: [],
    isScanning: false
};

export default DeviceSelectorModal;
