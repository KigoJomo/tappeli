"use client"

import { useToast } from "@/context/ToastContext";
import Button from "./Button";

export default function TestComponent() {
  const { showToast } = useToast()

  const handleClick = () => {
    showToast("Button clicked!", "info");
  };


  return (
    <div>
      <Button label="click" onClick={handleClick} />
    </div>
  );
}