import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import RunCodeButton from '../../../src/components/run-code-button/run-code-button';

describe('RunCodeButton component', () => {
    const defaultProps = () => ({
        onClick: jest.fn(),
        active: false
    });

    test('renders without crashing', () => {
        const component = mountWithIntl(
            <RunCodeButton {...defaultProps()} />
        );
        expect(component.exists()).toBe(true);
    });

    test('displays correct text', () => {
        const component = mountWithIntl(
            <RunCodeButton {...defaultProps()} />
        );
        expect(component.text()).toBe('Run Code');
    });

    test('calls onClick when clicked', () => {
        const props = defaultProps();
        const component = mountWithIntl(
            <RunCodeButton {...props} />
        );
        component.find('button').simulate('click');
        expect(props.onClick).toHaveBeenCalled();
    });

    test('applies active class when active prop is true', () => {
        const component = mountWithIntl(
            <RunCodeButton {...defaultProps()} active={true} />
        );
        const button = component.find('button');
        expect(button.hasClass('isActive')).toBe(true);
    });

    test('does not apply active class when active prop is false', () => {
        const component = mountWithIntl(
            <RunCodeButton {...defaultProps()} active={false} />
        );
        const button = component.find('button');
        expect(button.hasClass('isActive')).toBe(false);
    });

    test('applies custom className when provided', () => {
        const customClass = 'custom-class';
        const component = mountWithIntl(
            <RunCodeButton {...defaultProps()} className={customClass} />
        );
        const button = component.find('button');
        expect(button.hasClass(customClass)).toBe(true);
    });

    test('has correct title attribute', () => {
        const component = mountWithIntl(
            <RunCodeButton {...defaultProps()} />
        );
        const button = component.find('button');
        expect(button.props().title).toBe('Run Code');
    });
});
