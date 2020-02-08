import React, { useCallback, CSSProperties, FC, ChangeEvent, useState } from 'react';
import { mdiAlertBox } from '@mdi/js';
import { merge } from '../utils/merge';

import { Icon } from './icon';

import './input-base.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    color: string;
    errorColor: string;

    value: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;

    onChange: (value: string) => void;
}

export const InputText: FC<Props> = ({ id, className, style, value, label, color, errorColor, required, disabled, onChange }) => {

    const [error, setError] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    const _onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        if (required && !e.target.value) {
            setError(true);
        } else {
            setError(false);
        }
    }, [onChange, required]);

    const border = () => {
        if (error) {
            return `1px solid ${errorColor}`;
        }
        if (focus) {
            return `1px solid ${color}`;
        }
        return undefined;
    }

    const highlight = () => {
        if (error) {
            return errorColor
        };
        if (focus) {
            return color;
        }
        return undefined;
    }

    return <div className="ui-input__container">
        {label && <p style={{ color: highlight() }} className="ui-input__label">{label}</p>}
        <div
            id={id}
            className={merge('ui-input', { 'ui-input--disabled': disabled }, className)}
            style={{ border: border(), ...style }}
        >
            <input
                className="ui-input__display"
                value={value}
                onChange={_onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {error && <Icon style={{ marginRight: 8 }} path={mdiAlertBox} color={errorColor} size={24} />}
        </div>
    </div>;
}