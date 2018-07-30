(function(){
var form = document.getElementById('form');
var userInput = {
  userName:{
    ele:document.getElementById('userName'),
    errorMsg:"6-30位字母、数字或'_',字母开头",
    successMsg:'用户名输入正确',
    status:false,
    regexp:'^[a-zA-Z]\\w{5,29}$'
  },
  psw:{
    ele:document.getElementById('psw'),
    errorMsg:"请输入6-20位字母、数字或符号",
    status:false,
    regexp:'^\\S{6,20}$'
  }
}

form.addEventListener("input",function(e){
  var self = e.target;
  var pattern = new RegExp(userInput[self.id]['regexp']);
  console.log(pattern);
  console.log(self.value);
  if(self.id === "psw"){
    var pswLevel = form.getElementsByClassName('pswLevel');
    var msgNode = self.nextElementSibling;
    if(pattern.test(self.value)){
      msgNode.innerHTML="";
      checkPsw(self.value,pswLevel);
      userInput[self.id]['status'] = true;
    }else{
      msgNode.innerHTML = userInput[self.id]['errorMsg'];
      userInput[self.id]['status'] = false;
      pswLevel[1].classList.remove("level2");
      pswLevel[2].classList.remove("level3");
    }
  }else{
    var msgNode = self.parentNode.nextElementSibling;
    if(pattern.test(self.value)){
      msgNode.innerHTML = userInput[self.id]['successMsg'];
      msgNode.classList.add("successMsg");
      msgNode.classList.remove("orange","errorMsg")
      userInput[self.id]['status'] = true;
    }else{
      msgNode.innerHTML = userInput[self.id]['errorMsg'];
      msgNode.classList.add("errorMsg");
      msgNode.classList.remove("orange","successMsg")
      userInput[self.id]['status'] = false;
    }
  }
},false);

function checkPsw(psw,levelNode){
  if(psw.length >= 6){
    levelNode[1].classList.add("level2");
  }
  if(psw.length >=13 && psw.length<=20){
    levelNode[2].classList.add("level3");
  }else{
      levelNode[2].classList.remove("level3");
  }
}

})();
