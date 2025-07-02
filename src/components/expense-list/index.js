import React from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Card from "./card";
import ExpenseChart from "./ExpenseChart";
import emptyImage from "../../assets/images/empty.png";
import "./expense-list.css";

const ExpenseList = () => {
  const { expenseList: list, query } = useSelector((state) => state.expenses);
  const filteredList = list.filter((item) => item.title.includes(query));

  const calculateTotal = () => {
    return filteredList.reduce((total, expense) => total + expense.amount, 0);
  };

  const notifySuccess = () => toast.success("Expense Deleted!");

  return (
    <div className="expense-list">
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      {filteredList.length ? (
        <div className="expense-list-content">
          <div className="expense-list-items">
            {filteredList.map((item) => (
              <Card
                key={item.createdAt}
                item={item}
                notifySuccess={notifySuccess}
              />
            ))}
          </div>
          <div className="expense-right">
            <ExpenseChart expenses={filteredList} />
            <div className="total-expense">
              <h3>Total Expense: ₹ {calculateTotal().toFixed(2)}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <img src={emptyImage} alt="No Expenses" className="empty-image" />
          <label>Uh Oh! Your expense list is empty.</label>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
