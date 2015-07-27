var MoveOrientationEnum = {
    TOPLEFT : 0,
    LEFT : 1,
    BOTTOMLEFT : 2,
    BOTTOMRIGHT : 3,
    RIGHT : 4,
    TOPRIGHT : 5
};

var _stage = null;
var _itemsInLine = 9; // 每行的个数
var _sprite; // 精灵
var _circleArray; // 存放所有圆的的二维数组
var _stepCount = 0; //步数 

window.onload = function(){
    init();
}

function init(){
    var canvas = document.getElementById("gameView");
    if(canvas == null){
        return false;
    }

    _stage = new createjs.Stage(canvas);
    var container = new createjs.Container();
    _stage.addChild(container);

    createBackgroundCircle(container);

    _stage.update();
}

// 创建背景圆
function createBackgroundCircle(container){
    var originX = originY = radius = 20;
    _circleArray = new Array();

    for (var i = 0; i < _itemsInLine; i++) {

        originX = i % 2 == 0 ? 20 : 40;
        _circleArray[i] = new Array();

       for (var j = 0; j < _itemsInLine; j++) {

            var circle = new Circle();

            if(Math.random() < 0.1){
                circle.setCircleType(Circle.Type_Selected);
                console.log(i+"-"+j);
            }
            else{
                circle.setCircleType(Circle.Type_Normal);
                circle.addEventListener("click", circleClick);
            }

            if(i == Math.floor(_itemsInLine/2) && j == Math.floor(_itemsInLine/2)){
                circle.setCircleType(Circle.Type_Cat);
                _sprite = circle;
            }
           
            circle.x = originX+j*(radius*2+5);
            circle.y = originY+i*(radius*2+5);
            circle.indexX = i; // 行数
            circle.indexY = j; // 列数

            _circleArray[circle.indexX][circle.indexY] = circle;

            container.addChild(circle);


            var txt = new createjs.Text(i+"-"+j, "13px Arial", "#000000");
            txt.x = circle.x-5;
            txt.y = circle.y-5;
            container.addChild(txt);
       };
    };

    // console.log(_circleArray);
}

// 点击背景圆改变颜色
function circleClick(event){
    // 点击一次后移除点击事件
    event.currentTarget.removeEventListener("click", circleClick);

    _stepCount++;
    var clickedCircle = event.currentTarget;
    clickedCircle.setCircleType(Circle.Type_Selected);

    getMoveRoute();

    _stage.update();
}

// 改变精灵的位置
function changeSpriteLocation(orientaion){
   switch(orientaion){
        case MoveOrientationEnum.TOPLEFT:
            break;
        case MoveOrientationEnum.LEFT:
            break;
        case MoveOrientationEnum.BOTTOMLEFT:
            break;
        case MoveOrientationEnum.BOTTOMRIGHT:
            break;
        case MoveOrientationEnum.RIGHT:
            break;
        case MoveOrientationEnum.TOPRIGHT:
            break;
   }
}

// 获取精灵移动的路线
function getMoveRoute(){
    // 左上
    var isCan = true;
    var orientaion = MoveOrientationEnum.TOPLEFT;
    var indexY = _sprite.indexY;
    for (var i = _sprite.indexX - 1; i >= 0 ; i--) {
        if(i % 2 != 0){
            indexY--;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan = false;
        }else{
            
        }
    };
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }

    // 左
    isCan = true;
    orientaion = MoveOrientationEnum.LEFT;
    for (var i = _sprite.indexY - 1; i >= 0; i--) {
        if(_circleArray[_sprite.indexX][i]._circleType == Circle.Type_Selected){
            isCan = false;
        }
    };
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }

    // 左下
    isCan = true;
    orientaion = MoveOrientationEnum.BOTTOMLEFT;
    var indexY = _sprite.indexY;
    for (var i = _sprite.indexX + 1; i < _itemsInLine; i++) {
        if(i % 2 != 0){
            indexY--;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan = false;
        } 
    };
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }

    // 右下
    isCan = true;
    orientaion = MoveOrientationEnum.BOTTOMRIGHT;
    var indexY = _sprite.indexY;
    for (var i = _sprite.indexX + 1; i < _itemsInLine; i++) {
        if(i % 2 == 0){
            indexY++;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan =false;
        }
    }
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }

    // 右
    isCan = true;
    orientaion = MoveOrientationEnum.RIGHT;
    for (var i = _sprite.indexY + 1; i < _itemsInLine; i++) {
        if(_circleArray[_sprite.indexX][i]._circleType == Circle.Type_Selected){
            isCan = false;
        }
    };
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }

    // 右上
    isCan = true;
    orientaion = MoveOrientationEnum.TOPRIGHT;
    var indexY = _sprite.indexY;
    for (var i = _sprite.indexX - 1; i >= 0 ; i--) {
        if(i % 2 == 0){
            indexY++;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan = false;
        }
    }
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }
}

