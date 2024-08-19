import React from 'react';
import Style from './AddressDisplay.module.css';

const AddressDisplay = ({ type, address, onDelete }) => {
    return (
        <div className={Style.addressDisplay}>
            <div className={Style.addressInfo}>
                <p><strong>{type} Address:</strong> {address}</p>
            </div>
            <button onClick={onDelete} className={Style.deleteButton}>
                Delete
            </button>
        </div>
    );
};

export default AddressDisplay;
