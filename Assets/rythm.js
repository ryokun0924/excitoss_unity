#pragma strict
import System.IO;

var startTime : float;
var defaltScale : float;
var count:int;
var flag:boolean;

var leftBoxRythmStartTime:float;
var leftBoxRythmStartFlag:boolean = false;
var leftBoxNowPastTime:float;
var leftBoxRythmFinishFlag:boolean = false;
var leftBoxRythmNumber:int = 44;
var nowLeftRythmNumber:int = 0;

var rightBoxRythmStartTime:float;
var rightBoxRythmStartFlag:boolean = false;
var rightBoxNowPastTime:float;
var rightBoxRythmFinishFlag:boolean = false;
var rightBoxRythmNumber:int = 44;
var nowRightRythmNumber:int = 0;

var bothBoxRythmStartTime:float;
var bothBoxRythmStartFlag:boolean = false;
var bothBoxNowPastTime:float;
var bothBoxRythmFinishFlag:boolean = false;
var bothBoxRythmNumber:int = 37;
var nowBothRythmNumber:int = 0;

var defalutScale:Vector3;


var leftRythm :float[];
var rightRythm:float[];
var bothRythm:float[];


var blueRythmBar:Transform;
var redRythmBar:Transform;

var nowLeftBarRythmNumber:int = 0;
var nowRightBarRythmNumber:int = 0;
var nowBothBarRythmNumber:int = 0;
var backMusic:AudioSource;
function Start () {

    //経過時間取得用
    //startTime = GameObject.Find("main").GetComponent(main).startTime;//Time.realtimeSinceStartup;
    backMusic = GameObject.Find("Audio Source").GetComponent(AudioSource);
    count = 0;
    flag = false;
    defalutScale = GameObject.Find("leftBox").transform.localScale;



    var fi:FileInfo = new FileInfo(Application.dataPath + "/" + "redRythm.txt");
    var sr:StreamReader = new StreamReader(fi.OpenRead());
    leftRythm = new Array(leftBoxRythmNumber);
    for ( var i:int = 0 ; i < leftBoxRythmNumber ; i ++){
        leftRythm[i] = parseFloat(sr.ReadLine())-0.3;
    }
    fi = new FileInfo(Application.dataPath + "/" + "blueRythm.txt");
    sr= new StreamReader(fi.OpenRead());
    rightRythm = new Array(rightBoxRythmNumber);
    for ( i = 0 ; i < rightBoxRythmNumber ; i ++){
        rightRythm[i] = parseFloat(sr.ReadLine())-0.3;
    }
    fi = new FileInfo(Application.dataPath + "/" + "bothRythm.txt");
    sr= new StreamReader(fi.OpenRead());
    bothRythm = new Array(bothBoxRythmNumber);
    for ( i = 0 ; i < bothBoxRythmNumber ; i ++){
//        Debug.Log(sr.ReadLine());
        bothRythm[i] = parseFloat(sr.ReadLine())-0.3;
    }

}


function Update () {

    var time:float = backMusic.time;//Time.realtimeSinceStartup - startTime;
    if( leftRythm[nowLeftRythmNumber] < time ){

        if(!leftBoxRythmFinishFlag){
            if(!leftBoxRythmStartFlag){
            leftBoxRythmStartTime = Time.realtimeSinceStartup;
            leftBoxRythmStartFlag   = true;

            }

            leftBoxNowPastTime = Time.realtimeSinceStartup - leftBoxRythmStartTime;
            if(leftBoxNowPastTime < 0.2){

            GameObject.Find("leftBox").transform.localScale += new Vector3(0.12F, 0.12F, 0);
            count ++ ;
            }

            else{
                GameObject.Find("leftBox").transform.localScale -= new Vector3(0.12F, 0.12F, 0);
                 count ++;
                    if( leftBoxNowPastTime >= 0.4 ){
                        GameObject.Find("leftBox").transform.localScale = defalutScale;
                        leftBoxRythmStartFlag = false;
                        leftBoxRythmFinishFlag = true;
                        nowLeftRythmNumber++;
                    }
                }
            }
        }else{
            leftBoxRythmFinishFlag = false;
        }
        if(rightRythm[nowRightRythmNumber] < time ){

            if(!rightBoxRythmFinishFlag){
                if(!rightBoxRythmStartFlag){
                rightBoxRythmStartTime = Time.realtimeSinceStartup;
                rightBoxRythmStartFlag   = true;

                }

                rightBoxNowPastTime = Time.realtimeSinceStartup - rightBoxRythmStartTime;
                if(rightBoxNowPastTime < 0.2){

                GameObject.Find("rightBox").transform.localScale += new Vector3(0.12F, 0.12F, 0);
                count ++ ;
                }

                else{
                    GameObject.Find("rightBox").transform.localScale -= new Vector3(0.12F, 0.12F, 0);
                     count ++;
                        if( rightBoxNowPastTime >= 0.4 ){
                            GameObject.Find("rightBox").transform.localScale = defalutScale;
                            rightBoxRythmStartFlag = false;
                            rightBoxRythmFinishFlag = true;
                            nowRightRythmNumber++;
                        }
                    }
                }
            }else{
                rightBoxRythmFinishFlag = false;
            }


            //両方同時の時
            if(bothRythm[nowBothRythmNumber] < time ){

                if(!bothBoxRythmFinishFlag){
                    if(!bothBoxRythmStartFlag){
                    bothBoxRythmStartTime = Time.realtimeSinceStartup;
                    bothBoxRythmStartFlag   = true;

                    }

                    bothBoxNowPastTime = Time.realtimeSinceStartup - bothBoxRythmStartTime;
                    if(bothBoxNowPastTime < 0.2){

                    GameObject.Find("rightBox").transform.localScale += new Vector3(0.12F, 0.12F, 0);
                    GameObject.Find("leftBox").transform.localScale += new Vector3(0.12F, 0.12F, 0);
                    count ++ ;
                    }

                    else{
                        GameObject.Find("rightBox").transform.localScale -= new Vector3(0.12F, 0.12F, 0);
                        GameObject.Find("leftBox").transform.localScale -= new Vector3(0.12F, 0.12F, 0);
                         count ++;
                            if( bothBoxNowPastTime >= 0.4 ){
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

        //リズムバー制御
        if(Input.GetKeyDown("b")){
            Instantiate(blueRythmBar,new Vector3(0,-0.0125,0),transform.rotation);
        }
        if(Input.GetKeyDown("v")){
            Instantiate(redRythmBar,new Vector3(0,-0.0125,0),transform.rotation);
        }
        if(( leftRythm[nowLeftBarRythmNumber] - 1.5)<= time){
            Instantiate(redRythmBar,new Vector3(0,-0.0125,0),transform.rotation);
            nowLeftBarRythmNumber++;
        }
        if(( rightRythm[nowRightBarRythmNumber] - 1.5)<= time){
            Instantiate(blueRythmBar,new Vector3(0,-0.0125,0),transform.rotation);
            nowRightBarRythmNumber++;
        }
        if(( bothRythm[nowBothBarRythmNumber] - 1.5)<= time){
            Instantiate(blueRythmBar,new Vector3(0,-0.0125,0),transform.rotation);
            Instantiate(redRythmBar,new Vector3(0,-0.0125,0),transform.rotation);
            nowBothBarRythmNumber++;
        }

}
