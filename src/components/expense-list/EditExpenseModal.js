import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { categories } from "../../constants/add-expense";
import { editExpense } from "../../redux/actions/expenses";
import "./edit-expense-modal.css";

const EditExpenseModal = ({ expense, modalOpen, setModalOpen }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const dispatch = useDispatch();

  // Reset form when modal opens with new expense
  useEffect(() => {
    if (modalOpen) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setCategoryOpen(false);
    }
  }, [modalOpen, expense]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAmount = (e) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      setAmount("");
      return;
    }
    setAmount(val);
  };

  const handleCategory = (category) => {
    setCategory(category);
    setCategoryOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    // Reset form state
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const handleSubmit = () => {
    if (title.trim() === "" || amount === "" || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedExpense = {
      ...expense,
      title: title.trim(),
      amount,
      category,
    };

    dispatch(editExpense(updatedExpense));
    setModalOpen(false);
    toast.success("Expense updated successfully!");
  };

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
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      borderRadius: "12px",
      padding: "24px",
      maxWidth: "500px",
      width: "90%",
    },
  };

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      onRequestClose={handleCancel}
      ariaHideApp={false}
    >
      <div className="edit-expense-modal">
        <h2>Edit Expense</h2>
        <div className="form-item">
          <label>Title</label>
          <input
            placeholder="Give a name to your expenditure"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="form-item">
          <label>Amount ₹</label>
          <input
            placeholder="Enter Amount"
            className="amount-input"
            onChange={handleAmount}
            value={amount}
            type="number"
          />
        </div>
        <div className="category-container-parent">
          <div className="category">
            <div
              className="category-dropdown"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <label>{category ? category.title : "Category"}</label>
              <i className="fi-rr-angle-down"></i>
            </div>
            {categoryOpen && (
              <div className="category-container">
                {categories.map((cat) => (
                  <div
                    className="category-item"
                    style={{ borderRight: `5px solid ${cat.color}` }}
                    key={cat.id}
                    onClick={() => handleCategory(cat)}
                  >
                    <label>{cat.title}</label>
                    <img src={cat.icon} alt={cat.title} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="modal-buttons">
          <div className="modal-button cancel" onClick={handleCancel}>
            <label>Cancel</label>
          </div>
          <div className="modal-button save" onClick={handleSubmit}>
            <label>Save</label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenseModal;
