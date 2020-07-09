import React from 'react';
import './modal.css';

function Modal({ item, handleClose }) {

    return (
        <div className="modalContainer">

            <div className="modal">
                <div className="modalHeader">
                    <button onClick={handleClose}>&times;</button>
                </div>
                <div className="modalBody"><img alt={item.title} className="modalImage" src={item.url} /></div>
            </div>
        </div>
    )
}

export default Modal;