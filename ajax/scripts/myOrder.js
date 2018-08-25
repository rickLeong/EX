(function($){
  var $searchInput = $("#searchInput");

  function SearchBoxAjax(searchValue){
    $.getJSON('search.json',function(data){
      if(searchValue === '鞋'){
        $('.list').show();
        var html = '';
        html += "<ul>";
        $.each(data[0][0]['Results'][0]['Suggests'],function(index,value){
          html += "<li>" + value.Txt +"</li>"
        })
        html += "</ul>";
        $('.list').html(html);
      }else if(searchValue === '音速3'){
        $('.list').show();
        var html = '';
        html += "<ul>";
        $.each(data[1][0]['Results'][0]['Suggests'],function(index,value){
          html += "<li>" + value.Txt +"</li>"
        })
        html += "</ul>";
        $('.list').html(html);
      }else{
        $('.list').html('').hide();
      }
    })
  }

  function itemAjax(searchValue){
    $.getJSON('basketBallShoes.json',function(data){
      if(searchValue === '鞋'){
        var html = '';
        $.each(data[0][0]['Results'][0]['Suggests'],function(index,value){
          html = switchHtml(html,value);
        })
        $('.commodityContainer').html(html);
      }else if(searchValue === '音速3'){
        var html = '';
        $.each(data[1][0]['Results'][0]['Suggests'],function(index,value){
          html = switchHtml(html,value);
        })
        $('.commodityContainer').html(html);
      }
    })
  }

  function switchHtml(html,value){
    html += '<div class="mainCommodity">'
    html += ' <div class="shopInfo">'
    html += '<div class="shopMsg">'
    html += '      <input type="checkbox" name="shopMsg" id="liningBas" class="shopMsg-input" autocomplete="off">'
    html += '        <label for="liningBas">店铺：</label>'
    html += '        <a href="#">'+value.shop+'</a>'
    html += '      </div>'
    html += '    </div>'
    html += '    <div class="commodityInfo">'
    html += '      <ul>'
    html += '      <li class="td-chk">'
    html += '        <div class="td-inner">'
    html += '          <input type="checkbox" name="checkbox" autocomplete="off">'
    html += '        </div>'
    html += '      </li>'
    html += '      <li class="td-item">'
    html += '        <div class="td-inner">'
    html += '          <a href="#" class="'+value.label+'">'
    html += '          </a>'
    html += '          <div class="item-info">'
    html += '            <div class="item-basis-info">'
    html += '              <a href="#">'
    html +=                   value.Txt
    html += '              </a>'
    html += '          </div>'
    html += '          <div class="item-other-info">'
    html += '            <div class="item-other-space"></div>'
    html += '            <div class="item-other-list">'
    html += '              <a href="#" title="支持信用卡支付">'
    html += '                <div class="bandCard"></div>'
    html += '              </a>'
    html += '              <a href="#" class="sevenDay" title="7天无理由">'
    html += '                <div class="sevenDay"></div>'
    html += '              </a>'
    html += '              <a href="#" title="消费者保障服务">'
    html += '                <div class="guarantee"></div>'
    html += '              </a>'
    html += '            </div>'
    html += '          </div>'
    html += '        </div>'
    html += '      </div>'
    html += '    </li>'
    html += '    <li class="td-info">'
    html += '      <div class="td-info-msg">'
    html += '        <p>'+value.color+'</p>'
    html += '        <p>'+value.size+'</p>'
    html += '      </div>'
    html += '    </li>'
    html += '    <li class="td-price">'
    html += '      <div class="td-inner">'
    html += '        <p class="non-discount">'+value.nonDiscount+'</p>'
    html += '        <p class="discount">￥<span>'+value.num+'</span></p>'
    html += '        <div class="promotion">'
    html += '          卖家促销'
    html += '          <i class="promotionIcon"></i>'
    html += '        </div>'
    html += '        <div class="proSlidedown">'
    html += '          <p class="newPro">卖家促销：秋季特惠</p>'
    html += '          <p>优惠：￥'+value.discount+'</p>'
    html += '        </div>'
    html += '      </div>'
    html += '    </li>'
    html += '    <li class="td-amount">'
    html += '      <div class="item-amount">'
    html += '        <a href="#" class="amount-left amount-color">-</a>'
    html += '        <input type="text" name="amountNum" value="1" autocomplete="off">'
    html += '        <a href="#" class="amount-right">+</a>'
    html += '      </div>'
    html += '      <div class="stock">'
    html +=         value.max
    html += '      </div>'
    html += '      <div class="outNum">'
    html += '        <span class="instr">最多只能购买</span>'
    html += '        <span class="stockNum"></span>'
    html += '        <em>件</em>'
    html += '      </div>'
    html += '    </li>'
    html += '    <li class="td-sum">'
    html += '      <em>￥</em>'
    html += '      <span>'+value.num+'.00</span>'
    html += '    </li>'
    html += '    <li class="td-operation">'
    html += '      <p>'
    html += '        <a href="#" class="delete">删除</a>'
    html += '      </p>'
    html += '    </li>'
    html += '  </ul>'
    html += '</div>'
    html += '</div>'
    return html;
  }


  $searchInput.on('keyup click',function(e){
    SearchBoxAjax($searchInput.val());
    e.stopPropagation();
    if(e.keyCode === 13){
      itemAjax($searchInput.val());
    }
  });
  // 阻止冒泡
  $('.list').on('click',function(e){
    e.stopPropagation();
  })
   // 点击其他位置隐藏下拉菜单
  $(document).on('click',function(){
    $('.list').hide().html('');
  })
})(jQuery)
