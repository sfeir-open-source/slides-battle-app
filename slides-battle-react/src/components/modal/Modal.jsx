import React from "react";
import { Card } from "@material-ui/core";

export const Modal = ({
  zIndex = 1,
  margin,
  children,
  backgroundColor = "#8080804d",
}) => {
  return (
    <div
      style={{
        backgroundColor,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: zIndex - 1,
      }}
    >
      <Card
        variant="outlined"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          position: "absolute",
          top: "50%",
          left: "50%",
          margin,
          zIndex,
        }}
      >
        {children}
      </Card>
    </div>
  );
};
