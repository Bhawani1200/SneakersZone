import { Alert } from "@mui/material";
import { CheckIcon } from "lucide-react";
import React from "react";

const KhaliPayment = () => {
  return (
    <div>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Here is a gentle confirmation that your action was successful.
      </Alert>
    </div>
  );
};

export default KhaliPayment;
