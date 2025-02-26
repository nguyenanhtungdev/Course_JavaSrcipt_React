import { useRef } from "react";
import Button from "./button/Button";

export default function UseRef_Input() {
  const inputRef = useRef(null);
  const handleClick = () => {
    console.log("value: ", inputRef.current.value);
  };
  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Nhập gì đó..." />
      <button onClick={handleClick}>Lấy giá trị</button>
      <Button
        text="Bấm vào tôi iii"
        color="color_1"
        button="button"
        onClick={handleClick}
      />
    </div>
  );
}
