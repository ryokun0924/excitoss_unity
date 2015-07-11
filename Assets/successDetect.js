#pragma strict


var stopFlag:boolean = false;
var velocity:Vector3;
var velocityValue:float;
var inLeftBox:boolean = false;
var inRightBox:boolean = false;

//玉を小さくする基準たかさ
var boundingHeight:int ;

var outFlag:boolean = false;


var suicaBall : Rigidbody;

var rectangleLine:Vector3[];
var pointLine:Vector3[];



function Start(){
    boundingHeight =  GameObject.Find("leftBox").transform.FindChild("front").transform.lossyScale.y ;
    rectangleLine  = new Vector3[4];
    pointLine = new  Vector3[4];
}
function Update () {
    if(!stopFlag){
        var rigidBody= GetComponent.<Rigidbody>();
        velocity = rigidBody.velocity;
        velocityValue = Mathf.Sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);
        if( velocityValue < 7){
            stopFlag = true;
            if( transform.position.x < 0){
                if(isInsideBox(transform.position,"left")){
                            inLeftBox = true;
                            GameObject.Find("main").GetComponent(main).leftSuccessBall++;
                            if((GameObject.Find("main").GetComponent(main).leftSuccessBall  % 100 ) == 0 ){
                                suicaBall = Instantiate(suicaBall,transform.position,transform.rotation);
                                suicaBall.transform.position = Vector3(-1350,400,0);
                            }
                            if ( transform.position.y >= boundingHeight ){
                                GameObject.Find("ballGenerator").GetComponent(BallGenerator).leftBoxFullFlag = true;
                            }
                        }


            }else{
                if(isInsideBox(transform.position,"right")){
                            inRightBox = true;
                            GameObject.Find("main").GetComponent(main).rightSuccessBall++;
                            if((GameObject.Find("main").GetComponent(main).rightSuccessBall  % 100 ) == 0 ){
                                suicaBall = Instantiate(suicaBall,transform.position,transform.rotation);
                                suicaBall.transform.position = Vector3(1350,400,0);
                            }
                            if ( transform.position.y >= boundingHeight ){
                                GameObject.Find("ballGenerator").GetComponent(BallGenerator).rightBoxFullFlag = true;
                            }
                        }


            }
        }
    }
    //一定範囲から出たら削除
    if(transform.position.y < -200 ){
        Destroy(this.gameObject);
    }
    else if( transform.position.z > 500){
        Destroy(this.gameObject);
    }
    else if (transform.position.x < -2000 || transform.position.x  > 2000){
            Destroy(this.gameObject);
    }

    //箱から飛び出たかどうか検知
    if(!outFlag){
        if(inLeftBox){
            if(!isInsideBox(transform.position,"left")){
                        GameObject.Find("main").GetComponent(main).leftSuccessBall -- ;

                        inLeftBox = false;
                        outFlag = true;
                    }

        }
    }
    if(inRightBox){
        if(!isInsideBox(transform.position,"right")){
                    GameObject.Find("main").GetComponent(main).rightSuccessBall -- ;

                    inRightBox = false;
                    outFlag = true;

    }

}
}



//指定した点と、長方形(実際に使うのはvector3のうちx,z座標のみ)内部にあるかどうかを判定
function isInsideBox(targetVector:Vector3,whichBox:String){

    if(whichBox == "left"){
        pointLine[0] =  targetVector- GameObject.Find("leftFirstVertex").transform.position;
        pointLine[1] =  targetVector - GameObject.Find("leftSecondVertex").transform.position;
        pointLine[2] =  targetVector- GameObject.Find("leftThirdVertex").transform.position;
        pointLine[3] =  targetVector - GameObject.Find("leftFourthVertex").transform.position;
        rectangleLine[0] = GameObject.Find("leftSecondVertex").transform.position - GameObject.Find("leftFirstVertex").transform.position;
        rectangleLine[1] = GameObject.Find("leftThirdVertex").transform.position - GameObject.Find("leftSecondVertex").transform.position;
        rectangleLine[2] = GameObject.Find("leftFourthVertex").transform.position - GameObject.Find("leftThirdVertex").transform.position;
        rectangleLine[3] = GameObject.Find("leftFirstVertex").transform.position - GameObject.Find("leftFourthVertex").transform.position;
    }else if( whichBox == "right"){
        pointLine[0] =  targetVector - GameObject.Find("rightFirstVertex").transform.position;
        pointLine[1] =  targetVector - GameObject.Find("rightSecondVertex").transform.position;
        pointLine[2] =  targetVector - GameObject.Find("rightThirdVertex").transform.position;
        pointLine[3] =  targetVector - GameObject.Find("rightFourthVertex").transform.position;
        rectangleLine[0] = GameObject.Find("rightSecondVertex").transform.position - GameObject.Find("rightFirstVertex").transform.position;
        rectangleLine[1] = GameObject.Find("rightThirdVertex").transform.position - GameObject.Find("rightSecondVertex").transform.position;
        rectangleLine[2] = GameObject.Find("rightFourthVertex").transform.position - GameObject.Find("rightThirdVertex").transform.position;
        rectangleLine[3] = GameObject.Find("rightFirstVertex").transform.position - GameObject.Find("rightFourthVertex").transform.position;
    }
    var baseValue = pointLine[0].x  * rectangleLine[0].z - rectangleLine[0].x * pointLine[0].z;
    var plusFlag:boolean = true;
    var isInside:boolean = true;
    if(baseValue < 0) plusFlag = false;

    for ( var i:int = 1 ; i < 4 ; i ++){
        var value:int = pointLine[i].x * rectangleLine[i].z - rectangleLine[i].x * pointLine[i].z;
        if(plusFlag){
            if(value<0){
                isInside = false;
            }
        }else{
            if( value >0){
                isInside = false;
            }

        }
        if(!isInside) break;
    }

    return isInside;
}




/*
    毎回rectangleLineを計算するのは効率が悪いため決め打ちにするが、一応この関数はとっておく
 */
//指定した点と、長方形(実際に使うのはvector3のうちx,z座標のみ)内部にあるかどうかを判定
function isInsideRectangle(targetX:int,targetZ:int,firstVertex:Vector3,secondVertex:Vector3,thirdVertex:Vector3,fourthVertex:Vector3){
    rectangleLine = new Vector3[4];
    pointLine = new  Vector3[4];

    var targetVector:Vector3 = new Vector3(targetX,0,targetZ);
    rectangleLine[0] =  secondVertex - firstVertex;
    rectangleLine[1] =  thirdVertex - secondVertex;
    rectangleLine[2]=  fourthVertex - thirdVertex;
    rectangleLine[3] =  firstVertex - fourthVertex;

    pointLine[0] =  targetVector - firstVertex;
    pointLine[1] =  targetVector - secondVertex;
    pointLine[2] =  targetVector - thirdVertex;
    pointLine[3] =  targetVector - fourthVertex;
    var baseValue = pointLine[0].x  * rectangleLine[0].z - rectangleLine[0].x * pointLine[0].z;
    var plusFlag:boolean = true;
    var isInside:boolean = true;
    if(baseValue < 0) plusFlag = false;

    for ( var i:int = 1 ; i < 4 ; i ++){
        var value:int = pointLine[i].x * rectangleLine[i].z - rectangleLine[i].x * pointLine[i].z;
        if(plusFlag){
            if(value<0){
                isInside = false;
            }
        }else{
            if( value >0){
                isInside = false;
            }

        }
        if(!isInside) break;
    }
    return isInside;
}
