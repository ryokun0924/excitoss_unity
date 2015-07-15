#pragma strict

var movieTexture : MovieTexture;
var movieTexture2 : MovieTexture;
var movieTexture3 : MovieTexture;
var movieTexture4 : MovieTexture;
var SyuukeiText : Texture;
var SyuukeiRed : Texture;
var SyuukeiBlue : Texture;
var SyuukeiBoth : Texture;
var Round1Text : Texture;
var Round2Text : Texture;
var FinalRaoundText : Texture;
var TotalText : Texture;
var Kekka : Texture;
var alpha:float = 1;
var movieNumber:int = 0;
var nowTime:float;
var openingTexture:Texture;
var vjdummyTexture:Texture;
var whiteTexture:Texture;
var blackTexture:Texture;

var startFlag:boolean = false;

//結果を格納
var stage1 :GUIText;
var stage1R :GUIText;
var stage1B :GUIText;
var stage2 :GUIText;
var stage2R :GUIText;
var stage2B :GUIText;
var stage3 :GUIText;
var stage3R :GUIText;
var stage3B :GUIText;
var total :GUIText;
var totalR :GUIText;
var totalB :GUIText;


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

var ballDeleteFlag:boolean = false;

var showNumber:int = 0;

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
    for ( var i:int = 0 ; i < 3 ; i ++){
        redBallCount[i] = 0;
blueBallCount[i] = 0;
    }
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
	else if(movieNumber == 5){
        //背景表示
		if((nowTime>245)&&(nowTime<248)) GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);
		if((nowTime>248)&&(nowTime<249)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 100, 510, 48), SyuukeiRed);
		if((nowTime>249)&&(nowTime<250)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 160, 510, 48), SyuukeiRed);
		if((nowTime>250)&&(nowTime<251)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 220, 510, 48), SyuukeiBlue);
		if((nowTime>253)&&(nowTime<255)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 290, 510, 60), SyuukeiBoth);
	}//saiten
    else if(movieNumber == 6){
            GUI.color.a = 0.3;
        if(leftSuccessBall > rightSuccessBall){
            GUI.DrawTexture(new Rect(Screen.width/2, 0, Screen.width, Screen.height), blackTexture);
        }else if(leftSuccessBall < rightSuccessBall){
            GUI.DrawTexture(new Rect(0, 0, Screen.width/2, Screen.height), blackTexture);
        }
    }
    //VJのダミー
    else if(movieNumber == 7){
        GUI.color.a =1;
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), vjdummyTexture);
    }
}
if((nowTime>234)&&(nowTime<235)){
    GUI.color.a =0;
}
if((nowTime>235)&&(nowTime<244)){
    GUI.color.a = alpha;
    GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), whiteTexture);
}


if(showNumber == 1){
        GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);
}

    if(showNumber == 2){
        GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);

            if(redBallCount[0]>blueBallCount[0]){
                 GUI.DrawTexture(new Rect((Screen.width-510)/2, 120, 510, 48), SyuukeiRed);
            }else{
                GUI.DrawTexture(new Rect((Screen.width-510)/2,  120, 510, 48), SyuukeiBlue);
            }
            GUI.DrawTexture(new Rect((Screen.width)/2-110.5,  120,221, 37), Round1Text);


}
if(showNumber==3){

    GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);
        if(redBallCount[1]>blueBallCount[1]){
            GUI.DrawTexture(new Rect((Screen.width-510)/2,  165, 510, 48), SyuukeiRed);
        }else{
            GUI.DrawTexture(new Rect((Screen.width-510)/2,  165, 510, 48), SyuukeiBlue);
        }
                    GUI.DrawTexture(new Rect((Screen.width)/2-110.5, 165,221, 37), Round2Text);

}
if(showNumber==4){

    GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);
        if(redBallCount[2]>blueBallCount[2]){
            GUI.DrawTexture(new Rect((Screen.width-510)/2, 210, 510, 48), SyuukeiRed);
        }else{
            GUI.DrawTexture(new Rect((Screen.width-510)/2,210, 510, 48), SyuukeiBlue);
        }
                    GUI.DrawTexture(new Rect((Screen.width)/2-110.5, 210,221, 37), FinalRaoundText);
}
if(showNumber == 5){
   GUI.DrawTexture(new Rect((Screen.width-284)/2, 20, 284, 66), SyuukeiText);
    var blueTotalCount:int = 0;
    var redTotalCount:int = 0;
    for( var j:int = 0 ; j < 3 ; j ++ ){
        blueTotalCount +=blueBallCount[j];
        redTotalCount += redBallCount[j];
    }

       if(redTotalCount>blueTotalCount){
           GUI.DrawTexture(new Rect((Screen.width-510)/2, 255, 510, 48), SyuukeiRed);
       }else{
           GUI.DrawTexture(new Rect((Screen.width-510)/2, 255, 510, 48), SyuukeiBlue);
       }
            GUI.DrawTexture(new Rect((Screen.width)/2-110.5, 255,190, 30), TotalText);

}
if(showNumber == 6){
    showNumber = 0;
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
if(Input.GetKeyDown("z")){
    showNumber++;
}

    nowTime = GameObject.Find("Audio Source").GetComponent(AudioSource).time;

    //GUI表示
    //opening
    if(nowTime < 40 ){
        fadeOut(31);
    }
    //ラウンド結果表示
    else if( ( 88 < nowTime ) && (nowTime <=93)){
        movieNumber = 6;
    }
    else if((nowTime>93)&&(nowTime<115)){
         movieNumber = 7;
    }
    else if((163<nowTime) && (nowTime<=168)){
        movieNumber = 6;
    }
    else if((nowTime>168)&&(nowTime<179)){
               movieNumber = 7;
    }else{
        movieNumber = 0;
    }
    //GUIに関する値変更
    if((nowTime>235)&&(nowTime<241)){
        alpha+= 0.007;
    }else if((nowTime>242) && (nowTime<250)){
        alpha-= 0.007;
    }


    //スコア表示
    if( ( 88 < nowTime ) && (nowTime <=93) ){
        GameObject.Find("redScore").GetComponent(redScore).showFlag = true;
        GameObject.Find("blueScore").GetComponent(blueScore).showFlag = true;

    }
    else if((163<nowTime) && (nowTime<=168)){
        GameObject.Find("redScore").GetComponent(redScore).showFlag = true;
        GameObject.Find("blueScore").GetComponent(blueScore).showFlag = true;

    }
    else{
        GameObject.Find("redScore").GetComponent(redScore).showFlag = false;
        GameObject.Find("blueScore").GetComponent(blueScore).showFlag = false;
    }


    //カゴの動き
    if((25 < nowTime ) && (nowTime<=35)){
        GameObject.Find("leftBox").transform.position += new Vector3(0,5*Time.deltaTime,50*Time.deltaTime);
        GameObject.Find("rightBox").transform.position += new Vector3(0,5*Time.deltaTime,50*Time.deltaTime);
    }
    if((35<=nowTime)&&(nowTime<37)){
        GameObject.Find("leftBox").transform.position = new Vector3(-1350,0,0);
        GameObject.Find("rightBox").transform.position = new Vector3(1350,0,0);
    }
    if( (34<= nowTime) && (nowTime < 36) ){
        GameObject.Find("blueFloor").transform.position.y += 400 * Time.deltaTime;
        GameObject.Find("redFloor").transform.position.y += 400 * Time.deltaTime;
    }
    if( (36 <= nowTime) && (nowTime < 37) ){
        GameObject.Find("blueFloor").transform.position.y = (-200);
        GameObject.Find("redFloor").transform.position.y= (-200);
    }


    //かごのサイズ
        if((0<=nowTime)&&(nowTime<2)){
    GameObject.Find("leftBox").transform.localScale = new Vector3(12,16,12);
    GameObject.Find("rightBox").transform.localScale = new Vector3(12,16,12);
}
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


     //ボールカウントをラウンドごとにリセット
     if((114<nowTime) && ( secondRoundFlag == false)){
         secondRoundFlag = true;
         redBallCount[0] = leftSuccessBall;
         blueBallCount[0] = rightSuccessBall;
         leftSuccessBall = 0;
         rightSuccessBall = 0;
         GameObject.Find("ballGenerator").GetComponent(BallGenerator).deleteBall();
     }
     else if((178<nowTime) && ( finalRoundFlag == false)){
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

     else if((179<nowTime) && (nowTime <=181)){
         message.fontSize = 200;
         var intTime:int = (nowTime - 179)*2;
         //フラッシュさせる
        if((intTime%2) == 0){
         message.text = "FINAL ROUND";
         }else{
             message.text = "";
         }
     }
     else if((182.6<nowTime) && (nowTime <=183)){
          message.fontSize = 300;
         message.text ="1";
     }
     else if((183<nowTime) && (nowTime <=183.4)){
         message.text ="2";
     }
     else if((183.4<nowTime) && (nowTime <=183.8)){
         message.text ="3";
     }
     else if((183.8<nowTime) && (nowTime <=184.8)){
         message.text ="FIGHT!!";
     }
     else if((230<nowTime)&&(nowTime<=231)){
         message.fontSize = 400;
         message.material.color.a = 0.7;
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





     //集計モード
     if( ( 236 < nowTime )){
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
     //規定の位置まできたら床を抜く(一度だけ行う処理)
     else{
         if(!ballDeleteFlag){
         //ボールを消す
          GameObject.Find("ballGenerator").GetComponent(BallGenerator).deleteBall();
         //箱の底を抜く
                      GameObject.Find("leftBox").transform.FindChild("physicalBox/bottom").gameObject.active = false;
                      GameObject.Find("leftBox").transform.FindChild("visibleBox/bottom").gameObject.active = false;
                      GameObject.Find("rightBox").transform.FindChild("physicalBox/bottom").gameObject.active = false;
                      GameObject.Find("rightBox").transform.FindChild("visibleBox/bottom").gameObject.active = false;
                      ballDeleteFlag = true;
                  }
     }


         if(Input.GetKeyDown("w")){

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


     }

 //     if((nowTime>5)&&(nowTime<18)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 200, 510, 48), SyuukeiRed);
 // if((nowTime>5.7)&&(nowTime<18)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 260, 510, 48), SyuukeiRed);
 // if((nowTime>6.4)&&(nowTime<18)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 320, 510, 48), SyuukeiBlue);
 // if((nowTime>8)&&(nowTime<18)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 390, 510, 60), SyuukeiBoth);
 // if((nowTime>18)&&(nowTime<28)) GUI.DrawTexture(new Rect((Screen.width-510)/2, 390, 510, 60), SyuukeiBoth);;


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
