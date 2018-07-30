var form = document.getElementById('form'),
    submitBtn = document.getElementById('submitBtn'),
    inputEle = form.getElementsByClassName('userInput'),
    pattern;
var userInput = {
  userName:{
    ele:document.getElementById('userName'),
    regexp:'^[a-zA-Z]\\w{5,19}$',
    errorMsg:'6-20位字母、数字或“_”,字母开头',
    status:false
  },
  password:{
    ele:document.getElementById('password'),
    regexp:'^\\S{6,18}$',
    errorMsg:'6-18位，包括数字字母或符号，中间不能有空格',
    status:false
  },
  confirmPas:{
    ele:document.getElementById('confirmPas'),
    regexp:'^\\S{6,18}$',
    errorMsg:'请设置密码',
    status:false
  },
  realName:{
    ele:document.getElementById('realName'),
    regexp:'^[\\u4e00-\\u9fa5]{2,4}$',
    errorMsg:'真实姓名为两位到四位的中文汉字',
    status:false
  },
  idNum:{
    ele:document.getElementById('idNum'),
    regexp:'^\\d{15}$|^\\d{17}(?:\\d|x)$',
    errorMsg:'5位或者18位的数字',
    status:false
  },
  email:{
    ele:document.getElementById('email'),
    regexp:'^(?:\\w+[-_\\.]*)+@(?:\\.?\\w+)+$',
    errorMsg:'邮箱格式不正确',
    status:false
  },
  telNum:{
    ele:document.getElementById('telNum'),
    regexp:'^(13[\\d]{9})$|^(147\\d{8})$|^(15[^4]{9})$|^(18[^(?:1|3|4)]\\d{8})$',
    errorMsg:'手机格式不正确',
    status:false
  }
};


form.addEventListener('focusout',function(e){
  var self = e.target;
  // 如果输入框为确认密码
  if(self.id === 'submitBtn' || self.id === "gender"){
    return;
  }else if(self.id === userInput.confirmPas.ele.id){
    if(userInput.password.ele.value === ''){
      //如果登录密码框为空
      checkStatus(self,'请设置密码');
    } else if(userInput.password.ele.value === self.value && userInput['password']['status']){
      // 如果登录密码与确认密码相同 且通过正则
      checkStatus(self);
      userInput[self.id]['status'] = true
    } else if(!userInput['password']['status']){
      // 如果登录密码与确认密码相同 但没有通过正则
      checkStatus(self,'密码填写格式有误,请重新填写密码');
    } else {
      // 登录密码与确认密码不同
      checkStatus(self,'与登录密码不相同');
    }
  } else{ //输入框不是确认密码
    pattern = new RegExp(userInput[self.id]['regexp']);
    if(pattern.test(self.value)){
      checkStatus(self);
      userInput[self.id]['status'] = true;
    }else{
      checkStatus(self,userInput[self.id]['errorMsg']);
      userInput[self.id]['status'] = false;
    }
  }
},false);



submitBtn.addEventListener('click',function(){
  var statusCount = 0,
      objectLength = 0;
  for(var i in userInput){
    objectLength++;
    if(!userInput[i]['status']){
      var firstFocus = checkFirstFalse();
      userInput[firstFocus]['ele'].focus();
      checkStatus(userInput[i]['ele'],userInput[i]['errorMsg']);
    } else {
      statusCount++;
    }
  }
  if(statusCount === objectLength){
    alert('验证成功');
  }
},true)



function checkStatus(node,text) {
    if(node.nextSibling){
      node.parentNode.removeChild(node.nextSibling);
    };
    if(node.id === submitBtn) return;
    var span = document.createElement('span');
    span.className = 'checkStyle';
    node.parentNode.appendChild(span);
    span.innerHTML = text ? text : 'OK';
}

function checkFirstFalse() {
  for(var i in userInput){
    if(!userInput[i]['status']){
      return i;
    }
  }
}
