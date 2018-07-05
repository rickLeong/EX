(function (){
  var wrapElement = document.querySelector('#calculator');
  var calculatorElem = {
    formerInput : wrapElement.querySelector('.formerInput'),
    laterInput : wrapElement.querySelector('.laterInput'),
    sign : wrapElement.querySelector('.sign'),
    resultOutput : wrapElement.querySelector('.resultOutput'),
    btns : wrapElement.querySelectorAll('.btn')
  }
    each(calculatorElem.btns,function(index,elem){
      elem.onclick = function () {
        updataSign(this.value);
        outputResult(operate(this.title,calculatorElem.formerInput.value,calculatorElem.laterInput.value));
      }
    });

    var operate = (function(){
      var operation = {
        add: function(num1,num2){
          return +num1 + +num2;
        },
        subtract: function(num1, num2){
          return num1 - num2;
        },
        multiply: function(num1, num2){
          return num1 * num2;
        },
        divide: function(num1, num2){
          return num1 / num2;
        },
        addOperation:function(name, fn){
          if(!operation[name]){
            operation[name] = fn;
          }
        }
      };
      function operate(name){
        if(!operation[name]) throw new Error('不存在名为'+ name +'的运算方法!');
        return operation[name].apply(operation,[].slice.call(arguments,1,arguments.length));
      };
      operate.addOperation = operation.addOperation;

      return operate;
    })();


    function each(array,fn){
      for(var i = 0; i < array.length; i++){
        fn(i,array[i]);
      }
    }

    function updataSign(symbol){
      calculatorElem.sign.innerHTML = symbol;
    }


    function outputResult(result){
      calculatorElem.resultOutput.innerHTML = result
    }
})();

//在字符串前加+也可以把字符串转为数字
// function addHandler(){
//   outputResult(operation.add(calculatorElem.formerInput.value,calculatorElem.laterInput.value));
// };
// function subtractHandler(){
//   outputResult(operation.subtract(calculatorElem.formerInput.value,calculatorElem.laterInput.value));
// };
// function multiplyHandler(){
//   outputResult(operation.multiply(calculatorElem.formerInput.value,calculatorElem.laterInput.value));
// };
// function divideHandler(){
//   outputResult(operation.divide(calculatorElem.formerInput.value,calculatorElem.laterInput.value));
// };
