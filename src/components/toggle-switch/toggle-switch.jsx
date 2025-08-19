import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './toggle-switch.css';

const ToggleSwitch = ({
    isOn,
    onChange,
    label,
    className,
    disabled
}) => {
    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!isOn);
        }
    };

    return (
        <div
            className={classNames(
                styles.toggleContainer,
                className,
                {
                    [styles.disabled]: disabled
                }
            )}
        >
            <button
                type="button"
                className={classNames(
                    styles.toggleSwitch,
                    {
                        [styles.on]: isOn,
                        [styles.off]: !isOn
                    }
                )}
                onClick={handleClick}
                disabled={disabled}
                aria-label={label}
                role="switch"
                aria-checked={isOn}
            >
                <div className={styles.toggleThumb} />
                <span className={styles.toggleLabel}>{label}</span>
            </button>
        </div>
    );
};

ToggleSwitch.propTypes = {
    isOn: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

ToggleSwitch.defaultProps = {
    disabled: false
};

export default ToggleSwitch;
