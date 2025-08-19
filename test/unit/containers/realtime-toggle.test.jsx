import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import RealtimeToggle from '../../../src/containers/realtime-toggle';

const mockStore = configureStore([]);

describe('RealtimeToggle container', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                realtimeMode: {
                    realtimeMode: false
                }
            }
        });
        wrapper = shallow(
            <Provider store={store}>
                <RealtimeToggle />
            </Provider>
        );
    });

    test('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('dispatches setRealtimeMode action when toggled', () => {
        const realtimeToggle = wrapper.find(RealtimeToggle);
        const toggleSwitch = realtimeToggle.dive().find('ToggleSwitch');
        
        // Simulate toggle on
        toggleSwitch.props().onChange(true);
        
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual({
            type: 'scratch-gui/realtime-mode/SET_REALTIME_MODE',
            realtimeMode: true
        });
    });

    test('dispatches setRealtimeMode action when toggled off', () => {
        const realtimeToggle = wrapper.find(RealtimeToggle);
        const toggleSwitch = realtimeToggle.dive().find('ToggleSwitch');
        
        // Simulate toggle off
        toggleSwitch.props().onChange(false);
        
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual({
            type: 'scratch-gui/realtime-mode/SET_REALTIME_MODE',
            realtimeMode: false
        });
    });

    test('maps state to props correctly', () => {
        const realtimeToggle = wrapper.find(RealtimeToggle);
        const toggleSwitch = realtimeToggle.dive().find('ToggleSwitch');
        
        expect(toggleSwitch.props().isOn).toBe(false);
    });

    test('maps state to props correctly when realtime mode is on', () => {
        store = mockStore({
            scratchGui: {
                realtimeMode: {
                    realtimeMode: true
                }
            }
        });
        
        wrapper = shallow(
            <Provider store={store}>
                <RealtimeToggle />
            </Provider>
        );
        
        const realtimeToggle = wrapper.find(RealtimeToggle);
        const toggleSwitch = realtimeToggle.dive().find('ToggleSwitch');
        
        expect(toggleSwitch.props().isOn).toBe(true);
    });
});
