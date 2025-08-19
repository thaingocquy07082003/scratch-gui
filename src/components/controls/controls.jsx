import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import GreenFlag from '../green-flag/green-flag.jsx';
import StopAll from '../stop-all/stop-all.jsx';
import TurboMode from '../turbo-mode/turbo-mode.jsx';
import RunCodeButton from '../run-code-button/run-code-button.jsx';

import styles from './controls.css';

const messages = defineMessages({
    goTitle: {
        id: 'gui.controls.go',
        defaultMessage: 'Go',
        description: 'Green flag button title'
    },
    stopTitle: {
        id: 'gui.controls.stop',
        defaultMessage: 'Stop',
        description: 'Stop button title'
    },
    runCodeTitle: {
        id: 'gui.controls.runCode',
        defaultMessage: 'Run Code',
        description: 'Run Code button title'
    }
});

const Controls = function (props) {
    const {
        active,
        className,
        intl,
        onGreenFlagClick,
        onStopAllClick,
        onRunCodeClick,
        turbo,
        isRealtimeMode,
        ...componentProps
    } = props;
    return (
        <div
            className={classNames(styles.controlsContainer, className)}
            {...componentProps}
        >
            {isRealtimeMode ? (
                <RunCodeButton
                    active={active}
                    title={intl.formatMessage(messages.runCodeTitle)}
                    onClick={onRunCodeClick}
                />
            ) : (
                <>
                    <GreenFlag
                        active={active}
                        title={intl.formatMessage(messages.goTitle)}
                        onClick={onGreenFlagClick}
                    />
                    <StopAll
                        active={active}
                        title={intl.formatMessage(messages.stopTitle)}
                        onClick={onStopAllClick}
                    />
                </>
            )}
            {turbo ? (
                <TurboMode />
            ) : null}
        </div>
    );
};

Controls.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    intl: intlShape.isRequired,
    onGreenFlagClick: PropTypes.func.isRequired,
    onStopAllClick: PropTypes.func.isRequired,
    onRunCodeClick: PropTypes.func,
    turbo: PropTypes.bool,
    isRealtimeMode: PropTypes.bool
};

Controls.defaultProps = {
    active: false,
    turbo: false,
    isRealtimeMode: false
};

export default injectIntl(Controls);
