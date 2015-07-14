#pragma strict

var movieTexture : MovieTexture;
var movieTexture2 : MovieTexture;
var movieTexture3 : MovieTexture;
var movieTexture4 : MovieTexture;
var SyuukeiText : Texture;
var SyuukeiRed : Texture;
var SyuukeiBlue : Texture;
var SyuukeiBoth : Texture;
var Kekka : Texture;
var alpha:float = 1;
var movieNumber:int = 0;
var nowTime:float;
var openingTexture:Texture;
var vjdummyTexture:Texture;
var whiteTexture:Texture;

var startFlag:boolean = false;



var leftSuccessBall:int = 0;
var rightSuccessBall:int =0;

var movCamera:Camera;
var rightCamera:Camera;
var leftCamera:Camera;

var startTime:float;
var nijiAudio:AudioSource;
//var isCameraTopPosition:boolean = false;

var message :GUIText;

var redHundredFlag:boolean = false;
var blueHundredFlag:boolean = false;

var moveFlag:boolean = false;

//ラウンドごとのカウント
var redBallCount:int[];
var blueBallCount:int[];

//カウントの時ボールに加える力
var forceAtCountTime:int = -2000000;
//カウントの時箱が上がる速度
var velocityAtCountTime:int = 170;

var firstRoundFlag:boolean = true;
var secondRoundFlag:boolean = false;
var finalRoundFlag:boolean = false;

var isCountMode:boolean = false;

var countStartTime:int;
function Start () {
    message = GameObject.Find("message").GetComponent(GUIText);
    message.color=Color.white;

    //startTime = Time.realtimeSinceStartup;
    nijiAudio = GameObject.Find("Audio Source").GetComponent(AudioSource);

    movCamera = GameObject.Find("MovCamera").GetComponent(Camera);
    rightCamera = GameObject.Find("RightCamera").GetComponent(Camera);
    leftCamera = GameObject.Find("LeftCamera").GetComponent(Camera);
    movCamera.enabled=false;
    rightCamera.enabled = true;
    leftCamera.enabled = true;
//    Handheld.PlayFullScreenMovie("opening.mov", Color.black, FullScreenMovieControlMode.CancelOnInput);


    redBallCount = new Array(3);
    blueBallCount = new Array(3);
    GameObject.Find("leftBox").transform.position = new Vector3(-1350,-50,-500);
    GameObject.Find("rightBox").transform.position = new Vector3(1350,-50,-500);
    GameObject.Find("leftBox").transform.localScale = new Vector3(12,16,12);
    GameObject.Find("rightBox").transform.localScale = new Vector3(12,16,12);

}


function OnGUI(){
    if(!startFlag){
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), openingTexture);
    }else{
	GUI.color.a = alpha;
	if(movieNumber==1) {GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), movieTexture); }
	else if(movieNumber==2) {GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), movieTexture2); movieTexture2.Play();}
	else if(movieNumber==3) {GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), movieTexture3); movieTexture3.Play();}
	else if(movieNumber==4){GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), movieTexture4); movieTexture4.Play();}
	else if(movieNumber==0){ }//taiki
	else {
		GUI.backgroundColor = Color.black;
		GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);
		GUI.DrawTexture(new Rect((Screen.width-510)/2, 100, 510, 48), SyuukeiRed);
		GUI.DrawTexture(new Rect((Screen.width-510)/2, 160, 510, 48), SyuukeiRed);
		GUI.DrawTexture(new Rect((Screen.width-510)/2, 220, 510, 48), SyuukeiBlue);
		GUI.DrawTexture(new Rect((Screen.width-510)/2, 290, 510, 60), SyuukeiBoth);
	}//saiten
}
if(((nowTime>93)&&(nowTime<115)) || ((nowTime>168)&&(nowTime<182))){
    	GUI.color.a =1;
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), vjdummyTexture);
}
if((nowTime>234)&&(nowTime<235)){
    GUI.color.a =0;
}
if((nowTime>235)&&(nowTime<240)){
    GUI.color.a += 0.01;
    GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), whiteTexture);
}
}

function Update () {
//時間経過に伴う変更はひとまずここに書く
	if(Input.GetKey("s")){

		nijiAudio.Play();
        movieTexture.Play();
        movieNumber = 1;
        startFlag = true;
	}


    nowTime = GameObject.Find("Audio Source").GetComponent(AudioSource).time;
    fadeOut(31);

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


    //カゴの動き
    if((27 < nowTime ) && (nowTime<=37)){
        GameObject.Find("leftBox").transform.position += new Vector3(0,5*Time.deltaTime,50*Time.deltaTime);
        GameObject.Find("rightBox").transform.position += new Vector3(0,5*Time.deltaTime,50*Time.deltaTime);
    }
    if((37<=nowTime)&&(nowTime<39)){
        GameObject.Find("leftBox").transform.position = new Vector3(-1350,0,0);
        GameObject.Find("rightBox").transform.position = new Vector3(1350,0,0);
    }
    if( (32<= nowTime) && (nowTime < 34) ){
        GameObject.Find("blueFloor").transform.position.y += 400 * Time.deltaTime;
        GameObject.Find("redFloor").transform.position.y += 400 * Time.deltaTime;
    }
    if( (34 <= nowTime) && (nowTime < 35) ){
        GameObject.Find("blueFloor").transform.position.y = (-200);
        GameObject.Find("redFloor").transform.position.y= (-200);
    }


    //かごのサイズ
    if((48.2<=nowTime)&&(nowTime<48.3)){
        GameObject.Find("leftBox").transform.localScale += new Vector3(1.5/0.1*Time.deltaTime,2/0.1*Time.deltaTime,1.5/0.1*Time.deltaTime);
        GameObject.Find("rightBox").transform.localScale += new Vector3(1.5/0.1*Time.deltaTime,2/0.1*Time.deltaTime,1.5/0.1*Time.deltaTime);
    }else if((48.3<=nowTime)&&(50>nowTime)){
        GameObject.Find("leftBox").transform.localScale = new Vector3(13.5,18,13.5);
        GameObject.Find("rightBox").transform.localScale =  new Vector3(13.5,18,13.5);
    }else if((59.3<=nowTime)&&(nowTime<59.4)){
        GameObject.Find("leftBox").transform.localScale += new Vector3(1.5/0.1*Time.deltaTime,2/0.1*Time.deltaTime,1.5/0.1*Time.deltaTime);
        GameObject.Find("rightBox").transform.localScale += new Vector3(1.5/0.1*Time.deltaTime,2/0.1*Time.deltaTime,1.5/0.1*Time.deltaTime);
    }else if((59.4<=nowTime)&&(60>nowTime)){
        GameObject.Find("leftBox").transform.localScale = new Vector3(15,20,15);
        GameObject.Find("rightBox").transform.localScale = new Vector3(15,20,15);
    }else if((100<=nowTime)&&(101>nowTime)){
        GameObject.Find("leftBox").transform.localScale = new Vector3(13.5,18,13.5);
        GameObject.Find("rightBox").transform.localScale = new Vector3(13.5,18,13.5);
    }else if((127<=nowTime)&&(nowTime<127.1)){
        GameObject.Find("leftBox").transform.localScale += new Vector3(1.5/0.1*Time.deltaTime,2/0.1*Time.deltaTime,1.5/0.1*Time.deltaTime);
        GameObject.Find("rightBox").transform.localScale += new Vector3(1.5/0.1*Time.deltaTime,2/0.1*Time.deltaTime,1.5/0.1*Time.deltaTime);
    }else if((127.1<=nowTime)&&(128>nowTime)){
        GameObject.Find("leftBox").transform.localScale = new Vector3(15,20,15);
        GameObject.Find("rightBox").transform.localScale = new Vector3(15,20,15);
    }


     //ボールカウント
     if((114<nowTime) && ( secondRoundFlag == false)){
         secondRoundFlag = true;
         redBallCount[0] = leftSuccessBall;
         blueBallCount[0] = rightSuccessBall;
         leftSuccessBall = 0;
         rightSuccessBall = 0;
         GameObject.Find("ballGenerator").GetComponent(BallGenerator).deleteBall();
     }
     else if((181<nowTime) && ( finalRoundFlag == false)){
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
     else if((59.3<nowTime) && (nowTime <=60.3)){
         message.text ="FIGHT!!";
     }
     else if((124<nowTime) && (nowTime <=127)){
         message.text = "ROUND 2";
     }
     else if((127<nowTime) && (nowTime <=128)){
         message.text ="FIGHT!!";
     }

     else if((178<nowTime) && (nowTime <=182)){
         var intTime:int = nowTime;
        if((intTime%2) == 0){
         message.text = "FINAL ROUND";
     }
     }
     else if((182.3<nowTime) && (nowTime <=182.6)){
         message.text ="1";
     }
     else if((182.6<nowTime) && (nowTime <=182.9)){
         message.text ="2";
     }
     else if((182.9<nowTime) && (nowTime <=183.2)){
         message.text ="3";
     }
     else if((183.2<nowTime) && (nowTime <=184.2)){
         message.text ="FIGHT!!";
     }
     else if((230<nowTime)&&(nowTime<=231)){
          message.text ="5";
     }
     else if((231<nowTime)&&(nowTime<=232)){
          message.text ="4";
     }
     else if((232<nowTime)&&(nowTime<=233)){
          message.text ="3";
     }
     else if((233<nowTime)&&(nowTime<=234)){
          message.text ="2";
     }
     else if((234<nowTime)&&(nowTime<=235)){
          message.text ="1";
     }
     else{
         message.text = "";
     }


}




function fadeIn(mov,time:float){
	if((time < nowTime ) && (nowTime <= time+3)){
		movieNumber=mov;
		if(alpha<=1){
			alpha = alpha+0.01;
		}
		if(alpha>1){
			alpha = 1;
		}
	}
}

function fadeOut(time:float){
	if((time+5 >= nowTime) && (nowTime >= time)){
		if(alpha>0){
			alpha = alpha-0.01;
		}
		if(alpha<=0){
			alpha = 0;
            movieNumber = 0;
		}
        //時間内にフェードアウトしきらなかった場合
	}else if( (time+6 > nowTime)&& (time+5 < nowTime)){
        alpha = 0;
        movieNumber = 0;
    }

}


    //集計モード
    if( ( 235 < nowTime )){
        if(!isCountMode){
            countStartTime = Time.realtimeSinceStartup;
        }
        isCountMode = true;
    }

    if(isCountMode){
    if(GameObject.Find("leftBox").transform.position.y < 340){
        for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){
                  if( (childTransform.GetComponent(successDetect).inLeftBox == true)||(childTransform.GetComponent(successDetect).inRightBox == true)){
                      childTransform.position  += new Vector3(0,velocityAtCountTime*Time.deltaTime,0);
                }
            }
        // GameObject.Find("leftBox").GetComponent(Rigidbody).velocity = new Vector3(0,velocityAtCountTime,0);
        // GameObject.Find("rightBox").transform.position += new Vector3(0,velocityAtCountTime*Time.deltaTime,0);
     GameObject.Find("leftBox").transform.position += new Vector3(0,velocityAtCountTime*Time.deltaTime,0);
     GameObject.Find("rightBox").transform.position += new Vector3(0,velocityAtCountTime*Time.deltaTime,0);

    }

        if(Input.GetKeyDown("w")){
            for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){

                        Destroy(childTransform.gameObject);

            }
                GameObject.Find("leftBox").transform.FindChild("physicalBox/bottom").gameObject.active = false;
                GameObject.Find("leftBox").transform.FindChild("visibleBox/bottom").gameObject.active = false;
                GameObject.Find("rightBox").transform.FindChild("physicalBox/bottom").gameObject.active = false;
                GameObject.Find("rightBox").transform.FindChild("visibleBox/bottom").gameObject.active = false;
            //     for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){
            //             if( (childTransform.GetComponent(successDetect).inLeftBox == "true")||(childTransform.GetComponent(successDetect).inRightBox == "true")){
            //                 childTransform.GetComponent(Rigidbody).AddForce(0,forceAtCountTime,0);
            //             }
            //
            // }
            for ( var i:int  = 0 ; i < 200 ; i ++ ){
                GameObject.Find("ballGenerator").transform.GetComponent(BallGenerator).createBallAtLast("left");
                GameObject.Find("ballGenerator").transform.GetComponent(BallGenerator).createBallAtLast("right");
            }
            for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){

                        childTransform.GetComponent(Rigidbody).AddForce(0,forceAtCountTime,0);

        }
        }
        if(Input.GetKeyDown("e")){
                for ( i  = 0 ; i < 200 ; i ++ ){
                    GameObject.Find("ballGenerator").transform.GetComponent(BallGenerator).createBallAtLast("left");
                    GameObject.Find("ballGenerator").transform.GetComponent(BallGenerator).createBallAtLast("right");
                }
                for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){

                            childTransform.GetComponent(Rigidbody).AddForce(0,forceAtCountTime,0);

            }
        }
        if(Input.GetKeyDown("r")){
            for ( i = 0 ; i < 200 ; i ++ ){
                GameObject.Find("ballGenerator").transform.GetComponent(BallGenerator).createBallAtLast("left");
                GameObject.Find("ballGenerator").transform.GetComponent(BallGenerator).createBallAtLast("right");
            }
            for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){

                        childTransform.GetComponent(Rigidbody).AddForce(0,forceAtCountTime,0);

        }
                for( var childTransform:Transform in  GameObject.Find("ballGenerator").transform){

                            childTransform.GetComponent(Rigidbody).AddForce(0,forceAtCountTime,0);

            }
        }

    }
