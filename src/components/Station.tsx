import React from 'react';
import { useParams } from 'react-router-dom';

export interface StationProps {
    id: string;
    name: string;
}

const Station: React.FC<StationProps> = (attributes) => {
    // const { id, name } = useParams();
    return (
        <option value = { attributes.id }>{ attributes.name }</option>
    );
};

export default Station;