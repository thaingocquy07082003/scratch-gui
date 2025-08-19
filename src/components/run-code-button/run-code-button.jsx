import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import styles from './run-code-button.css';

const messages = defineMessages({
    runCodeTitle: {
        id: 'gui.runCodeButton.runCode',
        defaultMessage: 'Run Code',
        description: 'Run Code button title'
    }
});

const RunCodeButtonComponent = function (props) {
    const {
        active,
        className,
        intl,
        onClick,
        ...componentProps
    } = props;
    return (
        <button
            className={classNames(
                className,
                styles.runCodeButton,
                {
                    [styles.isActive]: active
                }
            )}
            onClick={onClick}
            title={intl.formatMessage(messages.runCodeTitle)}
            {...componentProps}
        >
            <div className={styles.runCodeIcon}>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                >
                    <path d="M2.5 2.5L9.5 6L2.5 9.5V2.5Z" />
                </svg>
            </div>
            <span className={styles.runCodeText}>
                {intl.formatMessage(messages.runCodeTitle)}
            </span>
        </button>
    );
};

RunCodeButtonComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    intl: intlShape.isRequired,
    onClick: PropTypes.func.isRequired
};

RunCodeButtonComponent.defaultProps = {
    active: false
};

export default injectIntl(RunCodeButtonComponent);
