import { useState } from "react";
export default function Form_Input() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [checkSend, setCheckSend] = useState(false);
  const showMessage = <h2>Success!</h2>;
  const handlerChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: [event.target.value],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckSend(!checkSend);
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handlerChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handlerChange}
          />
          <button type="submit">Send</button>
        </form>
        {checkSend && showMessage}
      </div>
    </div>
  );
}
