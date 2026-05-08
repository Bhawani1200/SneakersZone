import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const Esewa = () => {
  return (
    <div className="h-50 flex justify-center items-center">
      <Alert variant="filled" severity="warning" style={{ maxWidth: "400px" }}>
        <AlertTitle>Esewa is Unavailable</AlertTitle>
        Esewa Payment is not implemented yet.Please use stripe payemnt.
      </Alert>
    </div>
  );
};

export default Esewa;
