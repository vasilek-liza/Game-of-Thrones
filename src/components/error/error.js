import React from 'react';
import img from './error.jpg';
import './error.css';

const Error = () => {
    return (
        <>
            <img src={img} alt="error"></img>
            <span>Something goes wrong :(</span>
        </>
    )
}
export default Error;

