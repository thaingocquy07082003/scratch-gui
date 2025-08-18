/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import styles from './menu-bar.css';
import uploadIcon from './icon--upload.svg';

const SelectDeviceButton = ({
    className,
    onRequestOpen,
    selectedDevice
}) => (
    <div
        className={classNames(
            className,
            styles.menuBarItem,
            styles.hoverable
        )}
        onMouseUp={onRequestOpen}
    >
        <img
            className={styles.uploadIcon}
            src={uploadIcon}
            alt={selectedDevice ? selectedDevice.name : 'Select Device'}
        />
        <span className={styles.collapsibleLabel}>
            {selectedDevice ? (
                <span className={styles.selectedDeviceName}>
                    {selectedDevice.name}
                </span>
            ) : (
                <FormattedMessage
                    defaultMessage="Select Device"
                    description="Text for select device button"
                    id="gui.menuBar.selectDevice"
                />
            )}
        </span>
    </div>
);

SelectDeviceButton.propTypes = {
    className: PropTypes.string,
    onRequestOpen: PropTypes.func.isRequired,
    selectedDevice: PropTypes.shape({
        name: PropTypes.string,
        port: PropTypes.string,
        id: PropTypes.string
    })
};

export default SelectDeviceButton;
