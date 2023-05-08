import React from "react";
export default ({ className, children }) => {
  return <span className={`${className} message--user`}>{children}</span>;
};
