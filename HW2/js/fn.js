(function () {
    let selectOne = document.querySelectorAll('.selectOne'),
        selectAll = document.querySelector('.selectAll'),
        //存放選中項目
        selectedItem = {},
        cart_product = document.querySelectorAll('.product_row'),
        quantityInput = document.querySelectorAll('.quantity_input'),
        increaseBtn = document.querySelectorAll('.increaseBtn'),
        decreaseBtn = document.querySelectorAll('.decreaseBtn'),
        price = document.querySelectorAll('.price_num'),
        total_price = document.querySelectorAll('.total_price'),
        result = document.querySelector('.result');


    //點擊全選按鈕時全選複選框
    (selectAll.onclick = function () {
        for(let i=0;i<selectOne.length;i++){
            if(selectAll.checked){
                selectOne[i].checked = true;
                //全選時全部防入selectedItem對象中
                selectedItem['checkbox'+i] = i;
            } else {
                selectOne[i].checked = false;
                //選中狀態點擊時刪除所有selectedItem對象中的值
                delete selectedItem['checkbox'+i]
            }
        }
        console.log(selectedItem);
    })();


    for(let i=0; i<selectOne.length;i++){
        selectOne[i].onclick = function () {
            //選中時放入selectedItem對象中
            selectedItem['checkbox'+i] = i;
            if(!selectOne[i].checked){
                selectAll.checked = false;
                //取消時刪除對象中的複選框
                delete selectedItem['checkbox'+i]
            }else if(Object.keys(selectedItem).length === selectOne.length){
                selectAll.checked = true;
            }
            console.log(selectedItem);
        }
    }



    for(let i=0;i<cart_product.length;i++){
        increaseBtn[i].onclick = function () {
            quantityInput[i].value = +quantityInput[i].value + 1;
            update_totalPrice(i);
        };
        decreaseBtn[i].onclick = function () {
            quantityInput[i].value = +quantityInput[i].value - 1;
            if(quantityInput[i].value < 1) return quantityInput[i].value=1;
            update_totalPrice(i)
        };
    }



     function calculate(product_num) {
         return quantityInput[product_num].value * price[product_num].innerHTML;
     }

     function resultCalculate(){

     }

     function update_totalPrice(product_num){
        total_price[product_num].innerHTML = "￥"+calculate(product_num);
     }



})();
