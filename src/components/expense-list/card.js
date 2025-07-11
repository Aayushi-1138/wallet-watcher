import React, { useState } from "react";
import "./card.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../redux/actions/expenses";
import EditExpenseModal from "./EditExpenseModal";

const Card = ({ item, notifySuccess }) => {
  const time = moment(item.createdAt).fromNow();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    notifySuccess();
    dispatch(deleteExpense(item));
  };

  return (
    <>
      <div
        className="card"
        style={{ borderRight: `6px solid ${item.category.color}` }}
      >
        <div className="card-image-container">
          <img
            src={item.category.icon}
            alt={item.category.title}
            className="card-image"
          />
        </div>
        <div className="card-info">
          <label className="card-title">{item.title}</label>
          <label className="card-time">{time}</label>
        </div>
        <div className="card-right">
          <div>
            <label className="card-amount">₹ {item.amount}</label>
          </div>
          <div className="card-actions">
            <div className="edit-icon" onClick={() => setIsEditModalOpen(true)}>
              <i className="fi-rr-pencil"></i>
            </div>
            <div className="delete-icon" onClick={handleDelete}>
              <i className="fi-rr-trash"></i>
            </div>
          </div>
        </div>
      </div>
      <EditExpenseModal
        expense={item}
        modalOpen={isEditModalOpen}
        setModalOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default Card;
