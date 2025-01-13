// Test variable var: biến toàn cục
console.log(host_);
var host_ = 5;
// => biến var được hoisted(đưa lên đầu phạm vi), khởi tạo với value là undefined
var host_ = 12;
console.log(host_);
// => Có thể gán và khai báo lại trong cùng một phạm vi

// Test variable let: biến cục bộ
// console.log(a);
// let a = 5;
// // => biến let cũng được hoisted, nhưng không được khởi tạo giá trị  default
// // => Truy cập biến trước khi khai báo gây ra ReferenceError
// let a = 20;
// // => Không thể khai báo lại

// // Test variable const
// console.log(z); // Error!
// const z = 10;
// // => Đặc tính giống như let, cũng có block scope(khối phạm vi)
// const c = 30;
// c = 40;
// // => hằng số không thể thay đổi giá trị sau khi khai báo
// const arr = [1, 2, 3];
// arr[0] = 30;
// console.log(arr);
// // => đối với object or array, nội dung bên trong nó có thể thay đổi (vì chỉ tham chiếu đến address)
