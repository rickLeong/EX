(function(){
  window.canvasLock = function(obj){
    this.height = obj.height;
    this.width = obj.width;
    this.chooseType = obj.chooseType;
  };

  // JS方式动态生成dom
  canvasLock.prototype.initDom = function(){
    var wrap = document.createElement('div');
    var str = "<h4 id='title' class='title'>请绘制解锁图案</h4>";
    wrap.setAttribute('style','position:absolute;top:0;bottom:0;left:0;right:0;');

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id','canvas');
    canvas.style.cssText = 'background-color:#305066;display:inline-block;margin-top:15px;';

    wrap.innerHTML = str;
    wrap.appendChild(canvas);

    var height = this.height || 300;
    var width = this.width || 300;

    document.body.appendChild(wrap);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width;
    canvas.height = height;
  }

  canvasLock.prototype.drawCle = function(x,y){
    this.ctx.strokeStyle = '#cfe6ff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y,this.r, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.stroke();
  }
  canvasLock.prototype.createCircle = function(){
    var n = this.chooseType;
    var count = 0;
    this.r = this.ctx.canvas.width / (2 + 4 * n);
    this.lastPoint = [];
    this.arr = [];
    this.restPoint = [];
    var r = this.r;
    for(var i = 0; i < n; i++){
      for(var j = 0; j < n ; j++){
        count++;
        var obj = {
          x: 4 * j * r + 3 * r,
          y: 4 * i * r + 3 * r,
          index: count
        };
        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    document.getElementById('title').innerHTML = '请绘制解锁图案';
    for(var i = 0; i< this.arr.length; i++){
      this.drawCle(this.arr[i].x,this.arr[i].y);
    }
  }


  // touchstart，touchend,touchmove事件
  canvasLock.prototype.bindEvent = function(){
    var self = this;

    this.canvas.addEventListener('touchstart',function(e){
       var po = self.getPosition(e);

       for(var i = 0; i < self.arr.length ; i++){
         // 判断点击位置是否在圆内
         if(Math.abs(po.x - self.arr[i].x)<self.r && Math.abs(po.y-self.arr[i].y) < self.r){
           self.touchFlag = true;
           self.lastPoint.push(self.arr[i]);
           self.restPoint.splice(i,1);
           break;
         }
       }
    },false);

    this.canvas.addEventListener('touchmove',function(e){
      if (self.touchFlag){
        self.update(self.getPosition(e));
      }
    }, false);


    this.canvas.addEventListener('touchend',function(e){
      if(self.touchFlag){
        self.storePass();
        setTimeout(function(){
          self.reset()
        },300);
      }
    },false);
  }

  canvasLock.prototype.getPosition = function(e){
    var rect = e.currentTarget.getBoundingClientRect();
    var po = {
      // touches 事件
      x:(e.touches[0].clientX - rect.left),
      y:(e.touches[0].clientY - rect.top)
    }
    return po;
  };

  canvasLock.prototype.update = function(po) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for(var i=0; i< this.arr.length; i++){
      this.drawCle(this.arr[i].x, this.arr[i].y);
    }

    this.drawPoint();
    this.drawLine(po);

    for(var i=0; i<this.restPoint.length; i++){
      if(Math.abs(po.x-this.restPoint[i].x) < this.r && Math.abs(po.y-this.restPoint[i].y) < this.r){
        this.drawPoint();
        this.lastPoint.push(this.restPoint[i]);
        this.restPoint.splice(i,1);
        break;
      }
    }
  }

  canvasLock.prototype.drawPoint =function(){
    for(var i=0; i<this.lastPoint.length; i++){
      this.ctx.fillStyle = "#cfe6ff";
      this.ctx.beginPath();
      this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r/2, 0, 2*Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  canvasLock.prototype.drawLine =function(po){
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(this.lastPoint[0].x,this.lastPoint[0].y);
    for(var i=1;i<this.lastPoint.length;i++){
      this.ctx.lineTo(this.lastPoint[i].x,this.lastPoint[i].y);
    }
    this.ctx.lineTo(po.x,po.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }


// 触摸结束后检测路径是否正确
// 如果是对的 圈圈变绿 重置
// 如果是错的 圈圈变红 重置
// 重置
  canvasLock.prototype.storePass = function(){
    if(this.checkPass()){
      document.getElementById('title').innerHTML = '解锁成功';
      this.drawStatusPoint('#2cff26');
    }else{
      this.drawStatusPoint('red');
      document.getElementById('title').innerHTML = '解锁失败';
    }
  }

  canvasLock.prototype.checkPass = function(){
    var p1 = '123',
        p2 = '';
    for(var i = 0;i<this.lastPoint.length;i++){
      p2 += this.lastPoint[i].index;
    }
    return p1 === p2;
  }

  canvasLock.prototype.drawStatusPoint = function(color){
    for(var i = 0; i< this.lastPoint.length; i++){
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(this.lastPoint[i].x,this.lastPoint[i].y,this.r,0,2*Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  canvasLock.prototype.reset = function(){
    this.createCircle();
  }
  // 程序初始化
  canvasLock.prototype.init = function(){
    this.initDom();
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.createCircle();
    this.touchFlag = false;
    this.bindEvent();
  }
})();
