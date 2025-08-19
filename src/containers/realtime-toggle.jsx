/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import ToggleSwitch from '../components/toggle-switch/toggle-switch.jsx';

const RealtimeToggle = ({isRealtimeOn, onToggleRealtime}) => (
    <ToggleSwitch
        isOn={isRealtimeOn}
        onChange={onToggleRealtime}
        label="Realtime"
    />
);

const mapStateToProps = state => ({
    isRealtimeOn: state.scratchGui.realtimeMode.realtimeMode || false
});

const mapDispatchToProps = dispatch => ({
    onToggleRealtime: isOn => {
        // Dispatch action to toggle realtime mode
        dispatch({
            type: 'scratch-gui/realtime-mode/SET_REALTIME_MODE',
            realtimeMode: isOn
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RealtimeToggle);
