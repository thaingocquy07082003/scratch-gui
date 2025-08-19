import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Controls from '../../../src/containers/controls';

const mockStore = configureStore([]);

describe('Controls container', () => {
    let store;
    let wrapper;
    let mockVM;

    beforeEach(() => {
        mockVM = {
            start: jest.fn(),
            greenFlag: jest.fn(),
            stopAll: jest.fn(),
            setTurboMode: jest.fn()
        };

        store = mockStore({
            scratchGui: {
                vmStatus: {
                    running: false,
                    turbo: false
                },
                realtimeMode: {
                    realtimeMode: false
                }
            }
        });

        wrapper = shallow(
            <Provider store={store}>
                <Controls vm={mockVM} />
            </Provider>
        );
    });

    test('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('maps state to props correctly', () => {
        const controls = wrapper.find(Controls);
        expect(controls.props().isRealtimeMode).toBe(false);
        expect(controls.props().projectRunning).toBe(false);
        expect(controls.props().turbo).toBe(false);
    });

    test('maps state to props correctly when realtime mode is on', () => {
        store = mockStore({
            scratchGui: {
                vmStatus: {
                    running: false,
                    turbo: false
                },
                realtimeMode: {
                    realtimeMode: true
                }
            }
        });

        wrapper = shallow(
            <Provider store={store}>
                <Controls vm={mockVM} />
            </Provider>
        );

        const controls = wrapper.find(Controls);
        expect(controls.props().isRealtimeMode).toBe(true);
    });

    test('maps state to props correctly when project is running', () => {
        store = mockStore({
            scratchGui: {
                vmStatus: {
                    running: true,
                    turbo: false
                },
                realtimeMode: {
                    realtimeMode: false
                }
            }
        });

        wrapper = shallow(
            <Provider store={store}>
                <Controls vm={mockVM} />
            </Provider>
        );

        const controls = wrapper.find(Controls);
        expect(controls.props().projectRunning).toBe(true);
    });

    test('maps state to props correctly when turbo mode is on', () => {
        store = mockStore({
            scratchGui: {
                vmStatus: {
                    running: false,
                    turbo: true
                },
                realtimeMode: {
                    realtimeMode: false
                }
            }
        });

        wrapper = shallow(
            <Provider store={store}>
                <Controls vm={mockVM} />
            </Provider>
        );

        const controls = wrapper.find(Controls);
        expect(controls.props().turbo).toBe(true);
    });
});
