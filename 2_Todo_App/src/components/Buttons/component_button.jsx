import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  size = "md",
}) => {
  const baseStyles = {
    default: {
      backgroundColor: "#1D4ED8",
      color: "#FFFFFF",
      border: "none",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#1D4ED8",
      border: "2px solid #1D4ED8",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#1D4ED8",
      border: "none",
    },
  };

  const sizes = {
    sm: { padding: "5px 10px", fontSize: "12px" },
    md: { padding: "8px 16px", fontSize: "14px" },
    lg: { padding: "12px 20px", fontSize: "16px" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...baseStyles[variant],
        ...sizes[size],
        borderRadius: "6px",
        fontWeight: "500",
        transition: "all 0.2s",
        outline: "none",
        cursor: "pointer",
      }}
      className={className}
    >
      {children}
    </button>
  );
};

// Thêm kiểm tra kiểu dữ liệu cho props
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;
