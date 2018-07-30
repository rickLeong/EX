var userText = document.getElementById('userText'),
    userRegExp = document.getElementById('userRegExp'),
    userModifier = document.getElementsByName('userModifier'),
    matchingBtn = document.getElementById('matchingBtn'),
    matchingResult = document.getElementById('matchingResult'),
    userReplaceText = document.getElementById('userReplaceText'),
    replaceBtn = document.getElementById('replaceBtn'),
    replaceResult = document.getElementById('replaceResult'),
    reglists = document.getElementById('reglist').getElementsByTagName('a'),
    pattern,
    userModifierValue;

// 另一种方法
// for(var i = 0; i < userModifier.length; i++){
//   userModifier[i].onclick = function () {
//     userModifierValue = '';
//     for(var j = 0; j<userModifier.length; j++){
//       if(userModifier[j].checked){
//         userModifierValue += userModifier[j].value;
//       }
//     }
//   }
// }
  var str = "<input type='text'>";
  console.log(str.match(new RegExp("<([^\"\'>]|\"[^\"]*\"|\'[^\']*\')*>",'g')))

matchingBtn.addEventListener('click',function(){
  if(!userText.value){
    alert('请输入待匹配的文本!');
    userText.focus();
    return;
  }
  if(!userRegExp.value){
    alert('请输入正则表达式!');
    userRegExp.focus();
    return;
  }
  userModifierValue = '';
  for(var i = 0; i<userModifier.length;i++){
    if(userModifier[i].checked){
      userModifierValue += userModifier[i].value;
    }
  }
  pattern = new RegExp('('+userRegExp.value+')',userModifierValue);
  matchingResult.innerHTML = pattern.exec(userText.value) ? userText.value.replace(pattern,'<span style="background-color:yellow;">$1</span>'):'(没有匹配)';
},false)

// replace button
  replaceBtn.addEventListener('click',function(){
    if(!userText.value){
      alert('请输入待匹配的文本!');
      userText.focus();
      return;
    }
    if(!userRegExp.value){
      alert('请输入正则表达式!');
      userRegExp.focus();
      return;
    }
    if(!userReplaceText.value){
      alert('请输入要替换成的文本!');
      userReplaceText.foucus();
      return
    }
    pattern = new RegExp('('+userRegExp.value+')',userModifierValue);

    replaceResult.innerHTML = pattern.exec(userText.value) ? userText.value.replace(pattern,'<span style="color:red;">'+ userReplaceText.value +'</span>') :'(没有匹配)';
  },false)


  // 常用列表
  for(var i =0; i<reglists.length;i++){
    reglists[i].onclick = function () {
      userRegExp.value = this.title;
    }
  }
