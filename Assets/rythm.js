#pragma strict
import System.IO;

var startTime : float;
var defaltScale : float;

var leftBoxRythmStartTime:float;
var leftBoxRythmStartFlag:boolean = false;
var leftBoxNowPastTime:float;
var leftBoxRythmFinishFlag:boolean = true;
var leftBoxRythmNumber:int = 45;
var nowLeftRythmNumber:int = 0;

var rightBoxRythmStartTime:float;
var rightBoxRythmStartFlag:boolean = false;
var rightBoxNowPastTime:float;
var rightBoxRythmFinishFlag:boolean = false;
var rightBoxRythmNumber:int = 45;
var nowRightRythmNumber:int = 0;

var bothBoxRythmStartTime:float;
var bothBoxRythmStartFlag:boolean = false;
var bothBoxNowPastTime:float;
var bothBoxRythmFinishFlag:boolean = false;
var bothBoxRythmNumber:int = 38;
var nowBothRythmNumber:int = 0;

var defalutScale:Vector3;
var scaleSizeX:float;
var scaleSizeY:float;
//この値が小さいほど大きく箱が変形する
var scaleRateX:float;
var scaleRateY:float;

var leftRythm :float[];
var rightRythm:float[];
var bothRythm:float[];


var blueRythmBar:Transform;
var redRythmBar:Transform;

var nowLeftBarRythmNumber:int = 0;
var nowRightBarRythmNumber:int = 0;
var nowBothBarRythmNumber:int = 0;
var backMusic:AudioSource;
var time:float;



function Start () {
    scaleRateX = 97;
    scaleRateY = 97;
    //経過時間取得用
    //startTime = GameObject.Find("main").GetComponent(main).startTime;//Time.realtimeSinceStartup;
    backMusic = GameObject.Find("Audio Source").GetComponent(AudioSource);

    defalutScale = GameObject.Find("leftBox").transform.localScale;



    var fi:FileInfo = new FileInfo(Application.dataPath + "/" + "redRythm.txt");
    var sr:StreamReader = new StreamReader(fi.OpenRead());
    leftRythm = new Array(leftBoxRythmNumber);
    for ( var i:int = 0 ; i < leftBoxRythmNumber ; i ++){
        leftRythm[i] = parseFloat(sr.ReadLine());
    }
    fi = new FileInfo(Application.dataPath + "/" + "blueRythm.txt");
    sr= new StreamReader(fi.OpenRead());

    rightRythm = new Array(rightBoxRythmNumber);
            for ( i = 0 ; i < rightBoxRythmNumber ; i ++){
        rightRythm[i] = parseFloat(sr.ReadLine());
    }
    fi = new FileInfo(Application.dataPath + "/" + "bothRythm.txt");
    sr= new StreamReader(fi.OpenRead());
    bothRythm = new Array(bothBoxRythmNumber);
    for ( i = 0 ; i < bothBoxRythmNumber ; i ++){
//        Debug.Log(sr.ReadLine());
        bothRythm[i] = parseFloat(sr.ReadLine());
    }

}


function Update () {

    time = backMusic.time;//Time.realtimeSinceStartup - startTime;
if(nowLeftRythmNumber < leftBoxRythmNumber){
    if( leftRythm[nowLeftRythmNumber] < ( time) ){
        if(leftBoxRythmFinishFlag ){
        nowLeftRythmNumber++;
        leftBoxRythmStartFlag = true;
        leftBoxRythmFinishFlag = false;
        }
    }
        if(!leftBoxRythmFinishFlag){
            if(leftBoxRythmStartFlag){
            defalutScale = GameObject.Find("leftBox").transform.localScale;
            leftBoxRythmStartTime = Time.realtimeSinceStartup;
            scaleSizeX = GameObject.Find("leftBox").transform.localScale.x /scaleRateX;
            scaleSizeY = GameObject.Find("leftBox").transform.localScale.y /scaleRateY;
            leftBoxRythmStartFlag = false;
            }

            leftBoxNowPastTime = Time.realtimeSinceStartup - leftBoxRythmStartTime;
            if(leftBoxNowPastTime < 0.1){

            GameObject.Find("leftBox").transform.localScale += new Vector3(scaleSizeX, scaleSizeY, 0);
            }

            else{
                GameObject.Find("leftBox").transform.localScale -= new Vector3(scaleSizeX,scaleSizeY, 0);
                    if( leftBoxNowPastTime >= 0.2 ){
                        GameObject.Find("leftBox").transform.localScale = defalutScale;
                        leftBoxRythmFinishFlag = true;

                    }
                }
            }

}
else{
    //Debug.Log("leftOutOfRange");
}
if(nowRightRythmNumber < rightBoxRythmNumber){
        if(rightRythm[nowRightRythmNumber] < time){
            if(rightBoxRythmFinishFlag ){
            nowRightRythmNumber++;
            rightBoxRythmStartFlag = true;
            rightBoxRythmFinishFlag = false;
            }
        }

            if(!rightBoxRythmFinishFlag){
                if(rightBoxRythmStartFlag){
                defalutScale = GameObject.Find("rightBox").transform.localScale;
                rightBoxRythmStartTime = Time.realtimeSinceStartup;
                rightBoxRythmStartFlag   = false;
                  scaleSizeX = GameObject.Find("rightBox").transform.localScale.x /scaleRateX;
                  scaleSizeY = GameObject.Find("rightBox").transform.localScale.y /scaleRateY;
                }

                rightBoxNowPastTime = Time.realtimeSinceStartup - rightBoxRythmStartTime;
                if(rightBoxNowPastTime < 0.1){

                GameObject.Find("rightBox").transform.localScale += new Vector3(scaleSizeX,scaleSizeY,0);
                }

                else{
                    GameObject.Find("rightBox").transform.localScale -= new Vector3(scaleSizeX,scaleSizeY,0);
                        if( rightBoxNowPastTime >= 0.2 ){
                            GameObject.Find("rightBox").transform.localScale = defalutScale;
                            rightBoxRythmFinishFlag = true;
                        }
                    }
                }

}
else{
    //Debug.Log("rightOutOfRange");
}
if(nowBothRythmNumber < bothBoxRythmNumber ){
            //両方同時の時
            if(bothRythm[nowBothRythmNumber] < time ){

                if(!bothBoxRythmFinishFlag){
                    if(!bothBoxRythmStartFlag){
                    bothBoxRythmStartTime = Time.realtimeSinceStartup;
                    bothBoxRythmStartFlag   = true;
                    scaleSizeX = GameObject.Find("rightBox").transform.localScale.x /scaleRateX;
                    scaleSizeY = GameObject.Find("rightBox").transform.localScale.y /scaleRateY;
                    defalutScale = GameObject.Find("leftBox").transform.localScale;
                    }

                    bothBoxNowPastTime = Time.realtimeSinceStartup - bothBoxRythmStartTime;
                    if(bothBoxNowPastTime < 0.1){

                    GameObject.Find("rightBox").transform.localScale += new Vector3(scaleSizeX, scaleSizeY, 0);
                    GameObject.Find("leftBox").transform.localScale += new Vector3(scaleSizeX, scaleSizeY, 0);
                    }

                    else{
                        GameObject.Find("rightBox").transform.localScale -= new Vector3(scaleSizeX, scaleSizeY, 0);
                        GameObject.Find("leftBox").transform.localScale -= new Vector3(scaleSizeX, scaleSizeY, 0);
                            if( bothBoxNowPastTime >= 0.2 ){
                                GameObject.Find("rightBox").transform.localScale = defalutScale;
                                bothBoxRythmStartFlag = false;
                                bothBoxRythmFinishFlag = true;
                                nowBothRythmNumber++;

                            }
                        }
                    }
                }else{
                    bothBoxRythmFinishFlag = false;
                }
            }else{
            //    Debug.Log("bothOutOfRange");
            }


        //リズムバー制御
        if(nowLeftBarRythmNumber < leftBoxRythmNumber){

            if(( leftRythm[nowLeftBarRythmNumber] - 1.5)<= time){
                Instantiate(redRythmBar,new Vector3(0,-0.007,0),transform.rotation);
                nowLeftBarRythmNumber++;
            }
    }else{
        // Debug.Log("leftBarOutOfRange");
    }
    if(nowRightBarRythmNumber < rightBoxRythmNumber){
        if(( rightRythm[nowRightBarRythmNumber] - 1.5 )<= time){
            Instantiate(blueRythmBar,new Vector3(0,-0.007,0),transform.rotation);
            nowRightBarRythmNumber++;
        }
    }else{
    //    Debug.Log("leftBarOutOfRange");
    }
    if(nowBothBarRythmNumber < bothBoxRythmNumber){
        if(( bothRythm[nowBothBarRythmNumber] - 1.5)<= time){
            Instantiate(blueRythmBar,new Vector3(0,-0.007,0),transform.rotation);
            Instantiate(redRythmBar,new Vector3(0,-0.007,0),transform.rotation);
            nowBothBarRythmNumber++;
        }
    }else{//Debug.Log("bothBarOutOfRange");
}

}
