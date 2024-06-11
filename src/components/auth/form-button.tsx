import React from "react";
import { Button } from "../ui/button";
interface FormButtonProps {
  buttonLabel: string;
  isPending: boolean;
}

const FormButton = ({ buttonLabel, isPending }: FormButtonProps) => {
  return <Button>{buttonLabel}</Button>;
};

export default FormButton;
