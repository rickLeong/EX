function ById(id) {
    return typeof(id) === 'string' ? document.getElementById(id) : id;
}
var username = ById('username'),
    label = document.getElementsByTagName('label'),
    password = ById('password'),
    color2 = ById('color2'),
    color3 = ById('color3'),
    confirmPassword = ById('confirmPassword'),
    name = ById('name'),
    documentNumber = ById('documentNumber'),
    email = ById('email'),
    telnumber = ById('telnumber'),
    submit = ById('submit'),
    checkbox = ById('checkbox');
var test1 = false,
    test2 = false,
    test3 = false,
    test4 = false,
    test5 = false,
    test6 = false,
    test7 = false;

username.onfocus = function() {
    label[0].innerHTML = "6-30位字母、数字或'_',字母开头";
    label[0].style.color = 'green';
}
username.onblur = function() {
    var regexp = /^\w{6,30}$/;
    if (this.value == '') {
        label[0].innerHTML = "请填写用户名!";
        label[0].style.color = 'red';
    } else if (!regexp.exec(this.value)) {
        label[0].innerHTML = "6-30位字母、数字或'_',字母开头";
        label[0].style.color = 'red';
    } else {
        label[0].innerHTML = "用户名输入正确";
        label[0].style.color = 'green';
        test1 = true;
    }
}
//-------------------------------------------------------------用户名结束;
password.onblur = function() {
    var regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    var regexp2 = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i;
    var regexp3 = /^\d{6,20}$/;
    if (this.value == '') {
        label[1].innerHTML = '请输入6-20位字母,数字或符号';
        label[1].style.color = 'red';
    } else if (regexp.exec(this.value)) {
        color2.style.background = 'rgb(251,116,3)';
        color3.style.background = 'green';
        label[1].innerHTML = '强';
        label[1].style.color = 'green';
        test2 = true;
    } else if (regexp2.exec(this.value)) {
        color2.style.background = 'rgb(251,116,3)';
        label[1].innerHTML = '中';
        label[1].style.color = 'orange';
        test2 = true;
    } else if (regexp3.exec(this.value)) {
        color2.style.background = 'gray';
        color3.style.background = 'gray';
        label[1].innerHTML = '弱';
        label[1].style.color = 'red';
        test2 = true;
    } else {
        label[1].innerHTML = '密码格式错误';
    }
}
//-------------------------------------------------------------登录密码结束;
confirmPassword.onblur = function() {
    if (this.value == '') {
        label[2].innerHTML = '密码不能为空';
        label[2].style.color = 'red';
    } else if (this.value == password.value) {
        label[2].innerHTML = '密码输入一致';
        label[2].style.color = 'green';
    } else {
        label[2].innerHTML = '密码不一致'
        label[2].style.color = 'red';
        test3 = true;
    }
}
//-------------------------------------------------------------确认密码结束;
name.onblur = function() {
    var regexp = /^[\u4e00-\u9fa5]{1,15}|[a-z]{1,30}$/i;
    if (this.value == '' || !regexp.exec(this.value)) {
        label[3].innerHTML = '姓名只能包含中文或者英文,且字符在3-30个之间!';
        label[3].style.color = 'red';
    } else {
        label[3].innerHTML = '姓名输入正确';
        label[3].style.color = 'green';
        test4 = true;
    }
}
//-------------------------------------------------------------姓名结束;
documentNumber.onblur = function() {
    var regexp = /^\d{17}[0-9x]{1}$/;
    if (this.value == '') {
        label[4].innerHTML = '请输入18位身份证号码';
        label[4].style.color = 'red';
    } else if (!regexp.exec(this.value)) {
        label[4].innerHTML = '格式不正确';
        label[4].style.color = 'red';
    } else {
        label[4].innerHTML = '号码输入正确';
        label[4].style.color = 'green';
        test5 = true;
    }
}
//-------------------------------------------------------------证件号码结束;
email.onblur = function() {
    var regexp = /^\w+@\w+.[a-zA-Z]{2,3}(.[a-zA-Z]{2,3})?$/;
    if (this.value == '') {
        label[5].innerHTML = '邮箱不能为空';
        label[5].style.color = 'red';
    } else if (!regexp.exec(this.value)) {
        label[5].innerHTML = '格式错误';
        label[5].style.color = 'red';
    } else {
        label[5].innerHTML = '邮箱格式正确';
        label[5].style.color = 'green';
        test6 = true;
    }
}
//-------------------------------------------------------------邮箱结束;
telnumber.onblur = function() {
    var regexp = /\d{11}/;
    if (this.value == '') {
        label[6].innerHTML = '您输入的手机号码不是有效的格式';
        label[6].style.color = 'red';
    } else if (!regexp.exec(this.value)) {
        label[6].innerHTML = '号码格式错误';
        label[6].style.color = 'red';
    } else {
        label[6].innerHTML = '手机格式正确';
        label[6].style.color = 'green';
        test7 = true;
    }
}
//-------------------------------------------------------------手机号码结束;
//-------------------------------------------------------------提交验证;
submit.onclick = function() {
    if (checkbox.checked == false || test1 == false || test2 == false || test3 == false || test4 == false || test5 == false ||
        test6 == false || test7 == false) {
        alert(" 您 的 信 息 有 误 ")
    } else {
        alert(" 登 记 成 功 ! ")
    }
}
