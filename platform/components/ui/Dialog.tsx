import React, { ReactNode } from "react";

interface DialogProps {
  children: ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  return <div className="dialog">{children}</div>;
};

interface DialogContentProps {
  children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
  return <div className="dialog-content">{children}</div>;
};

interface DialogTriggerProps {
  children: ReactNode;
}

const DialogTrigger = ({ children }: DialogTriggerProps) => {
  return <button className="dialog-trigger">{children}</button>;
};

export { Dialog, DialogContent, DialogTrigger };
