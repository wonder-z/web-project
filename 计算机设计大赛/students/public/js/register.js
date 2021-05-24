var stu = document.getElementById('stu');
var adm = document.getElementById('adm');
var student = document.getElementById('student');
var admin = document.getElementById('admin');
admin.onclick = function () {
    stu.style.display = "none";
    adm.style.display = "block";
    admin.style.borderBottom = "1px solid black"
    student.style.borderBottom = "none"
}
student.onclick = function () {
    adm.style.display = "none";
    stu.style.display = "block"
    admin.style.borderBottom = "none"
    student.style.borderBottom = "1px solid black"
}