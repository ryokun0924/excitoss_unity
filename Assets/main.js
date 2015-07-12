#pragma strict



var leftSuccessBall:int = 0;
var rightSuccessBall:int =0;

var movCamera:Camera;
var rightCamera:Camera;
var leftCamera:Camera;

var startTime:float;
var audio:AudioSource;
var isCameraTopPosition:boolean = false;

var message :GUIText;

var redHundredFlag:boolean = false;
var blueHundredFlag:boolean = false;

var moveFlag:boolean = false;

var redBallCount:int[];
var blueBallCount:int[];

var firstRoundFlag:boolean = true;
var secondRoundFlag:boolean = false;
var finalRoundFlag:boolean = false;

function Start () {
    message = GameObject.Find("message").GetComponent(GUIText);
    message.color=Color.white;


    //startTime = Time.realtimeSinceStartup;
    GameObject.Find("Audio Source").GetComponent(AudioSource).Play();

    movCamera = GameObject.Find("MovCamera").GetComponent(Camera);
    rightCamera = GameObject.Find("RightCamera").GetComponent(Camera);
    leftCamera = GameObject.Find("LeftCamera").GetComponent(Camera);
    movCamera.enabled= true;
    rightCamera.enabled = false;
    leftCamera.enabled = false;
//    Handheld.PlayFullScreenMovie("opening.mov", Color.black, FullScreenMovieControlMode.CancelOnInput);


    redBallCount = new Array(3);
    blueBallCount = new Array(3);
}

function Update () {
//時間経過に伴う変更はひとまずここに書く
    var nowTime:float = GameObject.Find("Audio Source").GetComponent(AudioSource).time + 1.5;//Time.realtimeSinceStartup - startTime;
    //スコア表示
    if( ( 87 < nowTime ) && (nowTime <=92) ){
        GameObject.Find("redScore").GetComponent(redScore).showFlag = true;
        GameObject.Find("blueScore").GetComponent(blueScore).showFlag = true;
    }
    else if((160<nowTime) && (nowTime<=165)){
        GameObject.Find("redScore").GetComponent(redScore).showFlag = true;
        GameObject.Find("blueScore").GetComponent(blueScore).showFlag = true;
    }
    else{
        GameObject.Find("redScore").GetComponent(redScore).showFlag = false;
        GameObject.Find("blueScore").GetComponent(blueScore).showFlag = false;
    }
    // else if( ( 127 < nowTime ) && (nowTime <=169) ){
    //     GameObject.Find("redScore").GetComponent(redScore).showFlag = true;
    //     GameObject.Find("blueScore").GetComponent(blueScore).showFlag = true;
    // }
    // else if((169<nowTime) && (nowTime<=185)){
    //     GameObject.Find("redScore").GetComponent(redScore).showFlag = false;
    //     GameObject.Find("blueScore").GetComponent(blueScore).showFlag = false;
    // }
    // else if( ( 185 < nowTime ) && (nowTime <=223) ){
    //     GameObject.Find("redScore").GetComponent(redScore).showFlag = true;
    //     GameObject.Find("blueScore").GetComponent(blueScore).showFlag = true;
    // }
    // else if( ( 223 < nowTime ) && (nowTime <=230) ){
    //     GameObject.Find("redScore").GetComponent(redScore).showFlag = false;
    //     GameObject.Find("blueScore").GetComponent(blueScore).showFlag = false;
    // }

    //カメラの動き
    if((48 < nowTime) && (nowTime<=48.2)){
                 GameObject.Find("RightCamera").GetComponent(Camera).transform.position.z +=  Time.deltaTime *1500; GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.z += Time.deltaTime * 1500;
                 GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y -=  Time.deltaTime * 700; GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y -= Time.deltaTime * 700;
    }
    if((58.8 < nowTime) && (nowTime<=59)){
                 GameObject.Find("RightCamera").GetComponent(Camera).transform.position.z +=  Time.deltaTime * 1500; GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.z += Time.deltaTime * 1500;
                 GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y -=  Time.deltaTime * 700; GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y -= Time.deltaTime * 700;
    }
    if( (93 < nowTime ) && (nowTime <= 112 )) {
     if(!isCameraTopPosition){
         GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y +=  Time.deltaTime * 1500; GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y += Time.deltaTime * 1500;
         if( GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y >=     GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y ){
                GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y = GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y ;
                GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y = GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y ;
                isCameraTopPosition = true;
         }
     }
     }
     if( (112 < nowTime ) && (nowTime < 200)){
         if(!moveFlag){
         GameObject.Find("movDisplay").GetComponent(playMovie).defaultCameraY -= 280;
         moveFlag = true;
     }
         GameObject.Find("movDisplay").GetComponent(playMovie).isCameraCorrectPosition = false;
     }
     //ボールカウント
     if((123.5<nowTime) && ( secondRoundFlag == false)){
         secondRoundFlag = true;
         redBallCount[0] = leftSuccessBall;
         blueBallCount[0] = rightSuccessBall;
         leftSuccessBall = 0;
         rightSuccessBall = 0;
         GameObject.Find("ballGenerator").GetComponent(BallGenerator).deleteBall();
     }
     else if((184<nowTime) && ( finalRoundFlag == false)){
         leftSuccessBall = 0;
         rightSuccessBall = 0;
         finalRoundFlag = true;
         redBallCount[1] = leftSuccessBall;
         blueBallCount[1] = rightSuccessBall;
         GameObject.Find("ballGenerator").GetComponent(BallGenerator).deleteBall();
     }


     //message表示
     if((56<nowTime )  && (nowTime <= 59)){
         message.text = "ROUND 1";
     }
     else if((59<nowTime) && (nowTime <=60)){
         message.text ="FIGHT!!";
     }
     else if((124<nowTime) && (nowTime <=126)){
         message.text = "ROUND 2";
     }
     else if((126<nowTime) && (nowTime <=127)){
         message.text ="FIGHT!!";
     }
     else if((178.5<nowTime) && (nowTime <=182.5)){
         message.text = "FINAL ROUND";
     }
     else if((182.8<nowTime) && (nowTime <=183.3)){
         message.text ="1";
     }
     else if((183.3<nowTime) && (nowTime <=183.8)){
         message.text ="2";
     }
     else if((183.8<nowTime) && (nowTime <=184.3)){
         message.text ="3";
     }
     else if((184.3<nowTime) && (nowTime <=185.3)){
         message.text ="FIGHT!!";
     }
     else{
         message.text = "";
     }


}
