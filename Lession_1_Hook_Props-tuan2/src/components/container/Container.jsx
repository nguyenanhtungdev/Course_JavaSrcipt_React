import UseState_Input from "../UseState_Input";
import Form_Input from "../Form_Input";
import UseRef_Input from "../UseRef_Input";
import style from "./Container.module.css";

export default function Container() {
  return (
    <div className={style.container}>
      <UseState_Input />
      <Form_Input />
      <UseRef_Input />
    </div>
  );
}
