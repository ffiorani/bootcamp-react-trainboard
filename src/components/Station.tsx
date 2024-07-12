import React from 'react';
import { useParams } from 'react-router-dom';

export interface StationProps {
    id: string;
    name: string;
}

const Station: React.FC<StationProps> = ({ id, name }) => {
    return (
        <option value = { id }>{ name }</option>
    );
};

export default Station;