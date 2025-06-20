import React, { useEffect } from "react";

const Title = ({ children, titleText }) => {
  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  return children;
};

export default Title;
