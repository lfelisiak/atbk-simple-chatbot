import React from "react";
export default ({ option, onTap }) => {
  return (
    <span className="tappable-option" onClick={onTap}>
      {option}
    </span>
  );
};
