/**
 * Created by fanqi on 15/7/7.
 */
function Circle(){
	createjs.Shape.call(this);

	this.setCircleType = function(type){
		this._circleType = type;

		switch(type){
			case Circle.Type_Normal:
				this.setColor("#eeeeee");
				break;
			case Circle.Type_Selected:
				this.setColor("#ff6600");
				break;
			case Circle.Type_Cat:
				this.setColor("#0000ff");
				break;
		}
	}

	this.setColor = function(color){
		this.graphics.beginFill(color);
		this.graphics.drawCircle(0, 0, 25);
		this.graphics.endFill();
	}
}
Circle.prototype = new createjs.Shape();
Circle.Type_Normal = 0;
Circle.Type_Selected = 1;
Circle.Type_Cat = 2;