import React, { Dispatch, SetStateAction } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const stationList = [
    { value: 'PAD', label: 'Paddington' },
    { value: 'LST', label: 'Liverpool Street' },
    { value: 'KGX', label: 'Kings Cross' },
    { value: 'KTN', label: 'Kentish Town' },
    { value: 'LBG', label: 'London Bridge' },
] as Array<{value: string; label: string}>;

interface StationDropdownProps {
    stationChoice: string;
    setStationChoice: Dispatch<SetStateAction<string>>;
    inputLabel: string;
    id: string;
}

export const StationDropdown: React.FC<StationDropdownProps>  = ({ stationChoice, setStationChoice, inputLabel, id }) => {
    return (
        <Box sx = { { minWidth: 180 } }>
            <FormControl fullWidth>
                <InputLabel id = { id + '-input-label' } >{ inputLabel }</InputLabel>

                <Select
                    labelId = { id + '-label' }
                    id = { id }
                    value = { stationChoice }
                    label = { id + '-label' }
                    onChange = { (e: SelectChangeEvent) => (setStationChoice(e.target.value as string)) }
                > 
                    { stationList.map((stationObj, index) => (
                        <MenuItem 
                            key = { index } 
                            value = { stationObj.value }
                        >
                            { stationObj.label }
                        </MenuItem>
                    )) }
                </Select>
            </FormControl>
        </Box>
    );
};