import React from "react";

export const Button = ({ text, onClick, styles = "", css }) => {
  return (
    <button
      onClick={onClick}
      style={css}
      className={`bg-primary transition-all duration-300 hover:bg-white text-white hover:text-primary border-primary border-2 font-medium py-3 mt-6 w-full text-[18px] ${styles}`}
    >
      {text}
    </button>
  );
};
export const ButtonTwo = ({ text, onClick, styles = "", css }) => {
  return (
    <button
      onClick={onClick}
      style={css}
      className={` transition-all duration-300   border-2 font-medium py-3 mt-6 w-full text-[18px] ${styles}`}
    >
      {text}
    </button>
  );
};


export default Button;