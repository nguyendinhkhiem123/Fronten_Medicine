import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

export default function Modals({
  modal,
  setModal,
  title,
  arrInput,
  handleSubmit,
  reset,
  props
}) {
  const onClose = () => {
    setModal(false);
    reset({});
    
  
  };
  return (
    <Modal size="lg" active={modal} toggler={onClose}>
      <form
        onSubmit={handleSubmit}
        className="mt-6s sm:px-6 px-2 sm:w-100 w-auto"
      >
        <ModalHeader toggler={onClose}>{title}</ModalHeader>
        <ModalBody>
          <div>
            {arrInput
              ? arrInput.map((value, index) => {
                  return value;
                })
              : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={onClose} ripple="dark">
            Hủy
          </Button>

          <Button type="submit" color="blue" ripple="light">
            Xác nhận
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}