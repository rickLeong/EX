(function() {
    var form = document.getElementById('form');
    var userInput = {
        userName: {
            ele: document.getElementById('userName'),
            errorMsg: "6-30位字母、数字或'_',字母开头",
            successMsg: '用户名输入正确',
            status: false,
            regexp: /^[a-zA-Z]\w{5,29}$/
        },
        psw: {
            ele: document.getElementById('psw'),
            errorMsg: "请输入6-20位字母、数字或符号",
            status: false,
            regexp: /^\S{6,20}$/
        },
        pswConfirm: {
            ele: document.getElementById('pswConfirm'),
            pswNotNullMsg: "两次输入不一致",
            errorMsg: "密码不能为空",
            successMsg: '两次输入一致',
            status: false,
            regexp: /^\S{6,20}$/
        },
        cnName: {
            ele: document.getElementById('cnName'),
            errorMsg: "姓名只能包含中文或者英文,且字符在3-30个之间!",
            successMsg: '姓名输入正确',
            status: false,
            regexp: /^([\u4e00-\u9fa5]|[a-z]){2,30}$/i
        },
        idNum: {
            ele: document.getElementById('idNum'),
            errorMsg: "请输入18位身份证号码",
            successMsg: '号码输入正确',
            status: false,
            regexp: /^\d{17}[\dx]$/
        },
        email: {
            ele: document.getElementById('email'),
            errorMsg: "邮箱格式错误",
            successMsg: '邮箱格式正确',
            status: false,
            regexp: /^(\w+\.?)+@(\w+\.?)+\.[a-z]+$/
        },
        telNum: {
            ele: document.getElementById('telNum'),
            errorMsg: "您输入的手机号码不是有效的格式",
            successMsg: '手机格式正确',
            status: false,
            regexp: /^(13[\d]{9})$|^(147\d{8})$|^(15[^4]{9})$|^(18[^(?:1|3|4)]\d{8})$/
        }
    }

    form.addEventListener("focusout", function(e) {
        var self = e.target;
        var pattern = userInput[self.id]['regexp'];

        // 如果输入框为登录密码时
        if (self.id === "psw") {
            var pswLevel = form.getElementsByClassName('pswLevel');
            var msgNode = self.nextElementSibling;
            if (pattern.test(self.value)) {
                msgNode.innerHTML = "";
                checkPsw(self.value, pswLevel);
                userInput[self.id]['status'] = true;
            } else {
                msgNode.innerHTML = userInput[self.id]['errorMsg'];
                userInput[self.id]['status'] = false;
                pswLevel[1].classList.remove("level2");
                pswLevel[2].classList.remove("level3");
            }
        } else {
            var msgNode = self.parentNode.nextElementSibling;
            // 如果输入框为确认密码时
            if (self.id === "pswConfirm") {
                if (!userInput['psw']['ele'].value) {
                    msgNode.innerHTML = userInput[self.id]['errorMsg'];
                    msgNode.classList.add("errorMsg");
                } else {
                    if (userInput['psw']['ele'].value === self.value) {
                        msgNode.innerHTML = userInput[self.id]['successMsg'];
                        msgNode.classList.add("successMsg");
                        msgNode.classList.remove("errorMsg")
                        userInput[self.id]['status'] = true;
                    } else {
                        msgNode.innerHTML = userInput[self.id]['pswNotNullMsg'];
                        msgNode.classList.add("errorMsg");
                        msgNode.classList.remove("successMsg")
                        userInput[self.id]['status'] = false;
                    }
                }
            } else { //输入框为其他时
                if (pattern.test(self.value)) {
                    msgNode.innerHTML = userInput[self.id]['successMsg'];
                    msgNode.classList.add("successMsg");
                    msgNode.classList.remove("orange", "errorMsg");
                    userInput[self.id]['status'] = true;
                } else {
                    msgNode.innerHTML = userInput[self.id]['errorMsg'];
                    msgNode.classList.add("errorMsg");
                    msgNode.classList.remove("orange", "successMsg");
                    userInput[self.id]['status'] = false;
                }
            }

        }
    }, false);

    // 下拉菜单
    var dropdown = document.getElementById('dropdown'),
        dropdownMenu = document.getElementById('dropdownMenu');

    dropdown.addEventListener('mouseover', function() {
        dropdownMenu.classList.add('active');
        dropdownMenu.classList.remove('hide');
    });
    dropdown.addEventListener('mouseout', function() {
        dropdownMenu.classList.add('hide');
        dropdownMenu.classList.remove('active');
    });


    // 姓名规则
    var nameRule = document.getElementById('nameRule'),
        nameRuleBox = document.getElementById('nameRuleBox');

    nameRule.addEventListener('mouseover', function() {
        nameRuleBox.classList.add('active');
        nameRuleBox.classList.remove('hide');
    })
    nameRule.addEventListener('mouseout', function() {
        nameRuleBox.classList.add('hide');
        nameRuleBox.classList.remove('active');
    });

    function checkPsw(psw, levelNode) {
        if (psw.length >= 6) {
            levelNode[1].classList.add("level2");
        }
        if (psw.length >= 13 && psw.length <= 20) {
            levelNode[2].classList.add("level3");
        } else {
            levelNode[2].classList.remove("level3");
        }
    }

    // 提交按钮
    var btn = document.getElementById('submitBtn'),
        agreed = document.getElementById('agreed');
    btn.addEventListener('click', function() {
        var inputLength = 0,
            statusCount = 0;

        for (var i in userInput) {
            inputLength++
            if (userInput[i]['status'] === true) {
                statusCount++
            } else {
                var msgNode;
                var focusErrorInput = focusError();
                userInput[focusErrorInput]['ele'].focus();
                if (i === 'psw') {
                    msgNode = userInput[i]['ele'].nextElementSibling;
                    msgNode.innerHTML = userInput[i]['errorMsg']
                } else {
                    msgNode = userInput[i]['ele'].parentNode.nextElementSibling;
                    msgNode.innerHTML = userInput[i]['errorMsg']
                    msgNode.classList.add('errorMsg')
                    msgNode.classList.remove('orange')
                }
            }
        }

        if (inputLength === statusCount && agreed.checked) {
            self.location.href = "https://www.imooc.com/"
        } else if (inputLength === statusCount && agreed.checked === false) {
            alert('请勾选同意条款')
        } else {
            return;
        }
    });

    function focusError() {
        for (var i in userInput) {
            if (userInput[i]['status'] === false) {
                return i;
            }
        }
    }
})();