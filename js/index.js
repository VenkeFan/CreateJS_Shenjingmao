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
            circle.indexX = i; // 第几行
            circle.indexY = j; // 第几列
            _circleArray[circle.indexX][circle.indexY] = circle;

            container.addChild(circle);


            // var txt = new createjs.Text(i+"-"+j, "13px Arial", "#000000");
            // txt.x = circle.x-5;
            // txt.y = circle.y-5;
            // container.addChild(txt);
       };
    };
}

// 点击背景圆改变颜色
function circleClick(event){
    var clickedCircle = event.currentTarget;
    if(clickedCircle._circleType == Circle.Type_Cat || clickedCircle._circleType == Circle.Type_Selected){
        return;
    }

    if(_sprite.indexX == 0 || _sprite.indexX == _itemsInLine-1 || _sprite.indexY == 0 || _sprite.indexY == _itemsInLine-1){
        alert("Game Over!");
        return;
    }

    clickedCircle.setCircleType(Circle.Type_Selected);
    getMoveRoute();

    console.log(_sprite.indexX, _sprite.indexY);

    _stage.update();
}

// 改变精灵的位置
function changeSpriteLocation(orientaion){
    switch(orientaion){
        case MoveOrientationEnum.TOPLEFT:
            _sprite.setCircleType(Circle.Type_Normal);
            _sprite = _circleArray[_sprite.indexX-1][(_sprite.indexX-1)%2!=0?_sprite.indexY-1:_sprite.indexY];
            _sprite.setCircleType(Circle.Type_Cat);
            break;
        case MoveOrientationEnum.LEFT:
            _sprite.setCircleType(Circle.Type_Normal);
            _sprite = _circleArray[_sprite.indexX][_sprite.indexY-1];
            _sprite.setCircleType(Circle.Type_Cat);
            break;
        case MoveOrientationEnum.BOTTOMLEFT:
            _sprite.setCircleType(Circle.Type_Normal);
            _sprite = _circleArray[_sprite.indexX+1][(_sprite.indexX+1)%2!=0?_sprite.indexY-1:_sprite.indexY];
            _sprite.setCircleType(Circle.Type_Cat);
            break;
        case MoveOrientationEnum.BOTTOMRIGHT:
            _sprite.setCircleType(Circle.Type_Normal);
            _sprite = _circleArray[_sprite.indexX+1][(_sprite.indexX+1)%2==0?_sprite.indexY+1:_sprite.indexY];
            _sprite.setCircleType(Circle.Type_Cat);
            break;
        case MoveOrientationEnum.RIGHT:
            _sprite.setCircleType(Circle.Type_Normal);
            _sprite = _circleArray[_sprite.indexX][_sprite.indexY+1];
            _sprite.setCircleType(Circle.Type_Cat);
            break;
        case MoveOrientationEnum.TOPRIGHT:
            _sprite.setCircleType(Circle.Type_Normal);
            _sprite = _circleArray[_sprite.indexX-1][(_sprite.indexX-1)%2==0?_sprite.indexY+1:_sprite.indexY];
            _sprite.setCircleType(Circle.Type_Cat);
            break;
    }
}

// 获取精灵移动的路线
function getMoveRoute(){
    var distanceArray = new Array(); // 各个方向可移动的最大距离集合

    // 左上
    var isCan = true;
    var orientaion = MoveOrientationEnum.TOPLEFT;
    var indexY = _sprite.indexY;
    for (var i = _sprite.indexX - 1; i >= 0 ; i--) {
        if(i % 2 != 0){
            indexY--;
        }
        if(indexY < 0){
            break;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan = false;
            distanceArray[MoveOrientationEnum.TOPLEFT] = _sprite.indexX-i-1;
            break;
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
            distanceArray[MoveOrientationEnum.LEFT] = _sprite.indexY-i-1;
            break;
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
        if(indexY < 0){
            break;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan = false;
            distanceArray[MoveOrientationEnum.BOTTOMLEFT] = i-_sprite.indexX-1;
            break;
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
        if(indexY > 8){
            break;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan =false;
            distanceArray[MoveOrientationEnum.BOTTOMRIGHT] = i-_sprite.indexX-1;
            break;
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
            distanceArray[MoveOrientationEnum.RIGHT] = i-_sprite.indexY-1;
            break;
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
        if(indexY > 8){
            break;
        }
        if(_circleArray[i][indexY]._circleType == Circle.Type_Selected){
            isCan = false;
            distanceArray[MoveOrientationEnum.TOPRIGHT] = _sprite.indexX-i-1;
            break;
        }
    }
    if(isCan){
        changeSpriteLocation(orientaion);
        return;
    }

    var maxDistance = -1, minDistance = -1;
    for (var i = 0; i < distanceArray.length; i++) {
        if(distanceArray[i] > maxDistance){
            maxDistance = distanceArray[i];
            orientaion = i;
        }
    };

    // console.log("------->", maxDistance, orientaion);

    if(maxDistance > 0){
        changeSpriteLocation(orientaion);
    }else{
        alert("You Win!");
    }
}

