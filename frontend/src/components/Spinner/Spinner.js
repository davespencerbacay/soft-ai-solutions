import React from 'react';
import { CircularProgress } from '@mui/material';
import './Spinner.css';

const Spinner = ({ isLoading }) => {

    if (!isLoading) {
        return <React.Fragment />
    }

    return (
        <div className="spinner-overlay">
            <CircularProgress />
        </div>
    );
};

export default Spinner;