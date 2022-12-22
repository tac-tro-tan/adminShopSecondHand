import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ handleDeleteTrue, handleShow, show }) {
    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn tiếp tục không?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>
                    không
                </Button>
                <Button variant="primary" onClick={()=>{handleDeleteTrue();handleShow();}}>
                    Có
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup;