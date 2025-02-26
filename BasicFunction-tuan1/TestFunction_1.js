// Function Declaration: được hoisting, có thể dùng trước khi khai báo
function greeting(name) {
  return `Hello ${name}`;
}
console.log(greeting("Nguyen Anh Tung"));

//Function Expression: không được hoisting, phải khai báo xong rồi mới dùng
const greet = function (name) {
  return `Hello ${name}`;
};
console.log(greet("Nguyen Anh Tung"));

//Arrow Function
const greet_1 = (name) => {
  return `Hello ${name}`;
};
console.log(greet("Nguyen Anh Tung"));

const greet_2 = (name) => `Hello ${name}`;
console.log(greet_2("Nguyen Anh Tung"));

// IIFE:  IIFE được thực thi ngay tại thời điểm nó được định nghĩa
// Các biến được khai báo bên trong IIFE sẽ không thể sử dụng bên ngoài
// Đảm bảo các biến trùng lặp không bị ảnh hướng đến nhau
// Đoạn mã được thực thi ngay lập tức
// Nhược điểm: không tái sử dụng được
(function fun1(a) {
  if (a > 1) {
    return () => {
      console.log("demo2");
      console.log(a);
      if (a == 2) {
        return () => {
          console.log("hi");
        };
      }
    };
  }
})(2)()();

const couter = (function () {
  console.log("hi");
  var count = 0;
  return {
    increment: function () {
      count++;
      console.log(`increment: ${count}`);
    },
    reset: function () {
      count = 0;
      console.log(`reset: ${count}`);
    },
  };
})();
console.log(couter); // return object: increment và reset
couter.increment();
couter.increment();
couter.reset();
// counter.increment() và counter.reset() thực chất là gọi hai phương thức này, và vì chúng
//  vẫn "nhớ" phạm vi bên ngoài nơi biến count được khai báo, nên chúng có thể đọc và ghi vào count
// Giúp mã nguồn tăng tính bảo mât, không cho phép bất kỳ thay đổi nào từ bên ngoài
//VD: Khởi tạo một cấu hình
const config = (function () {
  const apiUrl = "https://api.example.com";
  const apiKey = "123456";

  return {
    getApiUrl() {
      return apiUrl;
    },
    getApiKey() {
      return apiKey;
    },
  };
})();

console.log(config.getApiUrl()); // https://api.example.com
console.log(config.getApiKey()); // 123456

// Là một phương thức trong object
const persion = {
  name: "Nguyen anh tung",
  greet() {
    return `Hello ${this.name}`;
  },
};
console.log(persion.greet());

//Generator Function: thường dùng để xử lý bất đồng bộ
function* calculateSum() {
  const num1 = yield "Enter first number:";
  console.log(num1);
  const num2 = yield "Enter second number:";
  console.log(num2);
  return `Sum: ${Number(num1) + Number(num2)}`;
}

const gen = calculateSum();

console.log(gen.next(0).value); // Enter first number:
console.log(gen.next(10).value); // Enter second number:
console.log(gen.next(20).value); // Sum: 30

function* generatorExample() {
  yield "a";
  yield 2;
  yield 3;
}

const generator = generatorExample();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

//Phương thức trong lớp (OPP)
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I am ${this.name}!`;
  }
}

const person = new Person("Vinh");
console.log(person.greet());

// Bất đồng bộ: Hàm async là một hàm bất đồng bộ, cho phép sử dụng từ khóa await bên trong để đợi một Promise hoàn thành.
// const fetchData = async () => {
//   const data = await fetch("https://api.example.com/data");
//   return data.json();
// };

// fetchData().then((data) => console.log(data));

//Callback: là hàm được truyền như một tham số cho hàm khác và được gọi sau khi hàm kia thực thi xong.
function processUserInput(callback) {
  const name = "Vinh";
  callback(name);
}

processUserInput(function (name) {
  console.log(`Hello, ${name}!`);
});

//Vd 1
function testCallBack(callback) {
  let a = 10;
  callback(a);
}
testCallBack(function (a) {
  console.log(a);
});

//Vd 2
function greet_3(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

// Gọi hàm với callback
greet_3("Vinh", sayGoodbye);

//Vd:
console.log("Start");

setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");
