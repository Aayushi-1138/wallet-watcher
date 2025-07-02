import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import addedImage from "../../assets/images/added-image.png";
import "./success-modal.css";

const SuccessModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate();

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(5px)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
    },
  };

  const handleHomeClick = () => {
    setModalOpen(false);
    navigate("/");
  };

  return (
    <Modal isOpen={modalOpen} style={customStyles}>
      <div className="modal-inner">
        <label>Expense Added Successfully!</label>
        <img src={addedImage} alt="Expense Added" className="added-image" />
        <div className="take-home-button" onClick={handleHomeClick}>
          <i className="fi-rr-home"></i>
          Home
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
