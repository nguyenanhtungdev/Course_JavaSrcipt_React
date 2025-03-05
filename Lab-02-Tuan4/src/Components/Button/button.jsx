import React from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const buttonClasses = [styles.customButton, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
