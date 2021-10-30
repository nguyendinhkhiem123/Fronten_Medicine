import React, { Children, useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
export default function Modals({
  modal,
  setModal,
  title,
  children
}) {
  const onClose = () => {
    setModal(false);
  };
  return (
    <Modal size="lg" active={modal} toggler={onClose}>
      <ModalHeader toggler={onClose}>{title}</ModalHeader>
      <ModalBody>
            {children}
      </ModalBody>
      <ModalFooter>
        {/* <Button color="red" onClick={onClose} ripple="dark">
          Hủy
        </Button> */}
        <Button type="submit" onClick={onClose} color="blue" ripple="light">
          Xác nhận
        </Button>
      </ModalFooter>
    </Modal>
  );
}
