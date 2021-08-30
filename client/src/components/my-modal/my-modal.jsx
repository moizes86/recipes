import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import "./my-modal.scss";

const MyModal = ({ childComponent: ChildComponent, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>{children}</span>

      <Modal show={show} onHide={handleClose} className="my-modal">
        <Modal.Header closeButton>{children}</Modal.Header>
        <ChildComponent />
      </Modal>
    </>
  );
};

export default MyModal;
