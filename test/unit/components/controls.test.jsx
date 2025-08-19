import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import Controls from '../../../src/components/controls/controls';
import TurboMode from '../../../src/components/turbo-mode/turbo-mode';
import GreenFlag from '../../../src/components/green-flag/green-flag';
import StopAll from '../../../src/components/stop-all/stop-all';
import RunCodeButton from '../../../src/components/run-code-button/run-code-button';

describe('Controls component', () => {
    const defaultProps = () => ({
        active: false,
        onGreenFlagClick: jest.fn(),
        onStopAllClick: jest.fn(),
        onRunCodeClick: jest.fn(),
        turbo: false,
        isRealtimeMode: false
    });

    test('shows turbo mode when in turbo mode', () => {
        const component = mountWithIntl(
            <Controls
                {...defaultProps()}
            />
        );
        expect(component.find(TurboMode).exists()).toEqual(false);
        component.setProps({turbo: true});
        expect(component.find(TurboMode).exists()).toEqual(true);
    });

    test('triggers the right callbacks when clicked', () => {
        const props = defaultProps();
        const component = mountWithIntl(
            <Controls
                {...props}
            />
        );
        component.find(GreenFlag).simulate('click');
        expect(props.onGreenFlagClick).toHaveBeenCalled();

        component.find(StopAll).simulate('click');
        expect(props.onStopAllClick).toHaveBeenCalled();
    });

    test('shows RunCodeButton when in realtime mode', () => {
        const props = defaultProps();
        const component = mountWithIntl(
            <Controls
                {...props}
            />
        );
        expect(component.find(RunCodeButton).exists()).toEqual(false);
        expect(component.find(GreenFlag).exists()).toEqual(true);
        expect(component.find(StopAll).exists()).toEqual(true);
        
        component.setProps({isRealtimeMode: true});
        expect(component.find(RunCodeButton).exists()).toEqual(true);
        expect(component.find(GreenFlag).exists()).toEqual(false);
        expect(component.find(StopAll).exists()).toEqual(false);
    });

    test('triggers RunCodeButton callback when clicked in realtime mode', () => {
        const props = defaultProps();
        const component = mountWithIntl(
            <Controls
                {...props}
                isRealtimeMode={true}
            />
        );
        component.find(RunCodeButton).simulate('click');
        expect(props.onRunCodeClick).toHaveBeenCalled();
    });
});
