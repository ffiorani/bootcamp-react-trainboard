import React from 'react';
import { MenuItem } from '@mui/material';

export interface StationProps {
    key: number;
    value: string;
    label: string;
}

const Station = ({ key, value, label }: StationProps) => {
    return (
        <MenuItem 
            key = { key } 
            value = { value }
        >
            { label }
        </MenuItem>
    );
};

export default Station;
