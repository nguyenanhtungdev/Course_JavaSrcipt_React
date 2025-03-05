import { useRef } from "react";

function FormExample() {
  const nameRef = useRef("");

  const handleSubmit = () => {
    alert(`Tên bạn nhập là: ${nameRef.current.value}`);
  };

  return (
    <div>
      <input ref={nameRef} type="text" placeholder="Nhập tên của bạn" />
      <button onClick={handleSubmit}>Gửi</button>
    </div>
  );
}

export default FormExample;
