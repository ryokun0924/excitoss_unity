﻿#pragma strict


var ball : Rigidbody;

var rightBoxX:int;
var leftBoxX:int;

var rightKinectFirst:int;
var rightKinectSecond:int;
var leftKinectFirst:int;
var leftKinectSecond:int;

//ボールが飛ぶ位置がずれるので補正するための変数
var adjastDistance:int;
//連続して小さくした回数
var leftSmallCount:int = 0;
var rightSmallCount:int = 0;


var rightBoxFullFlag:boolean = false;
var leftBoxFullFlag:boolean = false;


function Start (){
    rightBoxX  =GameObject.Find("rightBox").transform.position.x;
    leftBoxX  =GameObject.Find("leftBox").transform.position.x;

}


function Update () {
    if(Input.GetKey("c")){
        var position:Vector3 = Input.mousePosition;

        position.z = 10f;
        var createX :int = Random.Range(-2000,2000);
        createBall(createX,true);

    }
    if(Input.GetKey("m")){

        createX  = Random.Range(1000,1700);
        createBall(createX,true);

    }
    if(Input.GetKey("n")){

        createX = Random.Range(-1700,-1000);
        createBall(createX,true);

    }

    var generateFlag :boolean =  GetComponent(OSCReceiver).oscFlag;
    var x:int  = ( 640 - GetComponent(OSCReceiver).x) ;

    // Debug.Log("receive");
    //var test :boolean = generateFlag.oscflag;
        if(generateFlag == true){
                if(GetComponent(OSCReceiver).whichKinect == "r"){
                x = convertPositionKinectToRed(x);
                createBall(x,GetComponent(OSCReceiver).isGoodRythm);
                GetComponent(OSCReceiver).oscFlag = false;
                }
                else if(GetComponent(OSCReceiver).whichKinect == "b"){
                x = convertPositionKinectToBlue(x);
                createBall(x,GetComponent(OSCReceiver).isGoodRythm);
                GetComponent(OSCReceiver).oscFlag = false;
                }
                else if(GetComponent(OSCReceiver).whichKinect == "i"){
                x = convertPositionKinectToIdle(x);
                idleDisturbance(x);
                GetComponent(OSCReceiver).oscFlag = false;
                }
        }

    if ( leftBoxFullFlag == true){
        makeBallSmaller("left");
    }
    if( rightBoxFullFlag == true){
        makeBallSmaller("right");
    }
    if(Input.GetKeyDown("r")){
        idleDisturbance(200);

    }
    if(Input.GetKeyDown("l")){
        idleDisturbance(-200);

    }
    if(Input.GetKey("k")){
        createX = Random.Range(1000,1700);
        createBall(createX,false);
    }
    if(Input.GetKey("j")){
        createX = Random.Range(-1700,-1000);
        createBall(createX,false);
    }


}

function createBall(x:int , isSuccess:boolean){
    //var pos:int = Random.Range(-320,320);
    var newBall = Instantiate(ball,transform.position,transform.rotation);
    newBall.transform.parent = transform;
    newBall.transform.position = Vector3(x,200,-700);
    if(isSuccess){
        if( x > 0 ){
        newBall.velocity = Vector3((rightBoxX-x)/3 ,400,270);
        }else{
        newBall.velocity = Vector3((leftBoxX-x)/3,400,270);
        }
    }else{
        if( x > 0 ){
        newBall.velocity = Vector3((rightBoxX-x)/3 + Random.Range(-300,300) ,400+ Random.Range(-200,200),270+ Random.Range(-100,100));
        }else{
        newBall.velocity = Vector3((leftBoxX-x)/3 + Random.Range(-300,300) ,400+ Random.Range(-200,200),270+ Random.Range(-100,100));
        }

    }
    var color:int;
    var rand:int = Random.Range(0,20);
    if ( x >= 0 ){
        //青組用の色
        if(rand == 0){
            color = 0;
        }else if(rand == 1){
            color = 1;
        }else if(rand  == 2 ){
            color = 2;
        }else if( rand <= 8){
            color = 3;
        }else if( rand <= 18){
            color = 4;
        }else{
            color = 5;
        }


    }else {
        //赤組用の色
       if(rand < 11){
            color = 0;
        }else if(rand < 16){
            color = 1;
        }else if(rand  == 16 ){
            color = 2;
        }else if( rand == 17){
            color = 3;
        }else if( rand == 18){
            color = 4;
        }else{
            color = 5;
        }


    }



    switch(color){
        case 0:
             newBall.GetComponent(Renderer).material.color = new Color(255/255f,39/255f,28/255f,1f);
            break;
        case 1:
            newBall.GetComponent(Renderer).material.color = new Color(250/255f,193/255f,42/255f,1f);
            break;
        case 2:
            newBall.GetComponent(Renderer).material.color = new Color(192/255f,243/255f,0/255f,1f);
            break;
        case 3:
            newBall.GetComponent(Renderer).material.color = new Color(90/255f,152/255f,255/255f,1f);
            break;
        case 4:
            newBall.GetComponent(Renderer).material.color = new Color(19/255f,48/255f,135/255f,1f);
            break;
        case 5:
            newBall.GetComponent(Renderer).material.color = new Color(204/255f,2/255f,255/255f,1f);
            break;
    }

    // 0xe60012(230,0,18)
    // 0xf39800(243,152,0)
    // 0xfff100(255,241,0)
    // 0x009944(0,153,68)
    // 0x0068b7(0,104,183)
    // 0x1d2088(29,32,136)
    // 0x920783(146,7,131)
}

function idleDisturbance(x:int){

    var rand:int = 0;
    if(x>0){
        for( var childTransform:Transform in  transform){
                if( childTransform.GetComponent(successDetect).inRightBox == true){
                    if(childTransform.position.y < 200){
                        rand = Random.Range(0,2);
                        if(rand==0){
                        childTransform.GetComponent(Rigidbody).AddForce(0,2000000,0);
                    }
                    }
                }
            }

    }
    else{
        for( var childTransform:Transform in  transform){
                if( childTransform.GetComponent(successDetect).inLeftBox == true){
                        if(childTransform.position.y < 200){
                            rand = Random.Range(0,2);
                            if(rand==0){
                            childTransform.GetComponent(Rigidbody).AddForce(0,2000000,0);
                        }
                        }
                }
            }

    }
}

function makeBallSmaller(leftOrRight){

if(!GameObject.Find("main").transform.GetComponent(main).isCountMode){
    if(leftOrRight == "left"){
            if(leftSmallCount < 5){
                for( var childTransform:Transform in  transform){
                        if( childTransform.GetComponent(successDetect).inLeftBox == true){
                        childTransform.localScale.x *= 0.98;
                        childTransform.localScale.y *= 0.98;
                        childTransform.localScale.z *= 0.98;
                        }
                    }
                    for( var childTransform:Transform in GameObject.Find("redHundredScore").transform){
                            childTransform.localScale.x *= 0.98;
                            childTransform.localScale.y *= 0.98;
                            childTransform.localScale.z *= 0.98;
                        }
                    leftSmallCount++;
                }
                else{
                    leftSmallCount =0;
                    leftBoxFullFlag = false;
                }
        }else if(leftOrRight == "right"){
            if(rightSmallCount < 5){
            for( var childTransform:Transform in  transform){
                    if( childTransform.GetComponent(successDetect).inRightBox == true){
                    childTransform.localScale.x *= 0.98;
                    childTransform.localScale.y *= 0.98;
                    childTransform.localScale.z *= 0.98;
                    }
                }
                for( var childTransform:Transform in GameObject.Find("blueHundredScore").transform){
                        childTransform.localScale.x *= 0.98;
                        childTransform.localScale.y *= 0.98;
                        childTransform.localScale.z *= 0.98;
                    }
                rightSmallCount++;
        }
        else{
            rightSmallCount = 0;
            rightBoxFullFlag = false;
        }
    }
}
}

function convertPositionKinectToRed(kinectX:int){

    kinectX -= 1670;
    return kinectX;
}
function convertPositionKinectToBlue(kinectX:int){
    kinectX += 1030;
    return kinectX;
}
function convertPositionKinectToIdle(kinectX:int){
    kinectX-=320;
    return kinectX;
}
function deleteBall(){
    for( var childObject:Transform in transform ){
            Destroy(childObject.gameObject);
        }
        for( var childObject:Transform in GameObject.Find("blueHundredScore").transform){
            Destroy(childObject.gameObject);
            }
            for( var childObject:Transform in GameObject.Find("redHundredScore").transform){
            Destroy(childObject.gameObject);
                }
}

//スコア表示用ボール生成
function createBallAtLast(whichBox:String){

    var newBall = Instantiate(ball,transform.position,transform.rotation);
    newBall.transform.parent = transform;
    newBall.velocity = new Vector3(0,0,0);
    if( whichBox == "right" ){
        newBall.transform.position = new Vector3(1350 + Random.Range(-20,20) ,340 + Random.Range(0,20),Random.Range(-20,20));
    }else if( whichBox == "left" ){
        newBall.transform.position = new Vector3(-1350 + Random.Range(-20,20) ,340+Random.Range(0,20),Random.Range(-20,20));
    }

    var color:int;
    var rand:int = Random.Range(0,20);
    if ( whichBox == "right" ){
        //青組用の色
        if(rand == 0){
            color = 0;
        }else if(rand == 1){
            color = 1;
        }else if(rand  == 2 ){
            color = 2;
        }else if( rand <= 8){
            color = 3;
        }else if( rand <= 18){
            color = 4;
        }else{
            color = 5;
        }


    }else {
        //赤組用の色
       if(rand < 11){
            color = 0;
        }else if(rand < 16){
            color = 1;
        }else if(rand  == 16 ){
            color = 2;
        }else if( rand == 17){
            color = 3;
        }else if( rand == 18){
            color = 4;
        }else{
            color = 5;
        }


    }



    switch(color){
        case 0:
             newBall.GetComponent(Renderer).material.color = new Color(255/255f,39/255f,28/255f,1f);
            break;
        case 1:
            newBall.GetComponent(Renderer).material.color = new Color(250/255f,193/255f,42/255f,1f);
            break;
        case 2:
            newBall.GetComponent(Renderer).material.color = new Color(192/255f,243/255f,0/255f,1f);
            break;
        case 3:
            newBall.GetComponent(Renderer).material.color = new Color(90/255f,152/255f,255/255f,1f);
            break;
        case 4:
            newBall.GetComponent(Renderer).material.color = new Color(19/255f,48/255f,135/255f,1f);
            break;
        case 5:
            newBall.GetComponent(Renderer).material.color = new Color(204/255f,2/255f,255/255f,1f);
            break;
    }

}
