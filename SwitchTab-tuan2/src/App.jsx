import "./App.css";
import { useState } from "react";

function App() {
  const [index, setIndex] = useState(0);

  const courses = [
    {
      name: "GoLang",
      content: ["Item 1", "Item 2", "Item 3"],
      price: "100.000đ",
      date: "10/02/2024",
    },
    {
      name: "HTML/CSS",
      content: ["Item 4", "Item 5", "Item 6"],
      price: "200.000đ",
      date: "15/02/2024",
    },
    {
      name: "Docker Compose",
      content: ["Item 7", "Item 8", "Item 9"],
      price: "150.000đ",
      date: "20/02/2024",
    },
    {
      name: "PostgreSQL",
      content: ["Item 10", "Item 11", "Item 12"],
      price: "180.000đ",
      date: "25/02/2024",
    },
  ];

  function handleChangeButton(i) {
    setIndex(i);
  }

  return (
    <>
      <div className="container">
        <div className="list_button">
          {courses.map((course, i) => (
            <button key={course.name} onClick={() => handleChangeButton(i)}>
              {course.name}
            </button>
          ))}
        </div>

        <div className="content">
          <p>Nội dung khóa học: {courses[index].name}</p>
          <ul>
            {courses[index].content.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="footer">
            <p>Ngày học: {courses[index].date}</p>
            <p>
              Học phí: <span>{courses[index].price}</span>
            </p>
            <div className="footer__button">
              <button>Mua ngay</button>
              <button>Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
