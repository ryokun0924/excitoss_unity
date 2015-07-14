#pragma strict


var stopFlag:boolean = false;
var velocity:Vector3;
var velocityValue:float;
var inLeftBox:boolean = false;
var inRightBox:boolean = false;

//玉を小さくする基準たかさ
var boundingHeight:int;

var outFlag:boolean = false;


var suicaBall : Rigidbody;

var rectangleLine:Vector3[];
var pointLine:Vector3[];

var blueHundredScore :GUIText;
var redHundredScore :GUIText;

var showStartTime:float;
var showHundredScoreFlag:boolean = false;
var showHundredScore:int;

var startHundredScoreFlag:boolean = false;

function Start(){
    redHundredScore = GameObject.Find("redHundredScore").GetComponent(GUIText);
    redHundredScore.color=Color.white;
    blueHundredScore = GameObject.Find("blueHundredScore").GetComponent(GUIText);
    blueHundredScore.color=Color.white;

    boundingHeight =  GameObject.Find("leftBox").transform.FindChild("visibleBox/front").transform.lossyScale.y ;
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
                                suicaBall.transform.position = Vector3(-1350,450,0);
                                suicaBall.transform.parent = redHundredScore.transform;
                                showHundredScoreFlag = true;
                                redHundredScore.material.color.a = 1;
                                redHundredScore.fontSize = 100;
                                //redHundredScore.color  = new Color(255,255,255,0);
                                showHundredScore = GameObject.Find("main").GetComponent(main).leftSuccessBall;
                                showStartTime = Time.realtimeSinceStartup;
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
                                suicaBall.transform.position = Vector3(1350,450,0);
                                suicaBall.transform.parent = blueHundredScore.transform;
                                showHundredScoreFlag = true;
                                blueHundredScore.material.color.a = 1;
                                blueHundredScore.fontSize = 100;
                                showHundredScore = GameObject.Find("main").GetComponent(main).rightSuccessBall;
                                showStartTime = Time.realtimeSinceStartup;
                                //blueHundredScore.color  = new Color(255,255,255,0);
                            }
                            if ( transform.position.y >= boundingHeight ){
                                GameObject.Find("ballGenerator").GetComponent(BallGenerator).rightBoxFullFlag = true;
                            }
                        }


            }
        }
    }
    //一定範囲から出たら削除
    if(transform.position.y < -400 ){
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
    if(showHundredScoreFlag){
        if( transform.position.x < 0){
            redHundredScore.text = showHundredScore.ToString();

            // redHundredScore.GetComponent(Renderer).material.color.a = 0;
            // redHundredScore.transform.localScale += new Vector3(0.02F,0.02F,0.02F);
            // if((Time.realtimeSinceStartup -showStartTime) < 0.6){
            // redHundredScore.GetComponent(Renderer).material.color  += new Color(0,0,0,0.1);
            //  }
            // if((0.6 < (Time.realtimeSinceStartup -showStartTime)) && ( (Time.realtimeSinceStartup -showStartTime)<1.2) ){
            //     redHundredScore.GetComponent(Renderer).material.color  -= new Color(255,255,255,1);
            // }


                if((0.1 < (Time.realtimeSinceStartup -showStartTime)) && ( (Time.realtimeSinceStartup -showStartTime)<1.1) ){
                        redHundredScore.material.color.a  -= 1.0 * Time.deltaTime;
                        redHundredScore.fontSize +=  200 * Time.deltaTime;
                }



            if((Time.realtimeSinceStartup -showStartTime) > 1.2){
                showHundredScoreFlag = false;
            }
        }
        else{
            blueHundredScore.text = showHundredScore.ToString();
            if((0.1 < (Time.realtimeSinceStartup -showStartTime)) && ( (Time.realtimeSinceStartup -showStartTime)<1.1) ){
                    blueHundredScore.material.color.a  -= 1.0 * Time.deltaTime;
                    blueHundredScore.fontSize += 200 * Time.deltaTime;
            }

            if((Time.realtimeSinceStartup -showStartTime) > 1.2){
                showHundredScoreFlag = false;
            }
        }

    }

}



//指定した点と、長方形(実際に使うのはvector3のうちx,z座標のみ)内部にあるかどうかを判定
function isInsideBox(targetVector:Vector3,whichBox:String){

    if(whichBox == "left"){
        pointLine[0] =  targetVector- GameObject.Find("leftBox").transform.FindChild("detectInBox/firstVertex").transform.position;
        pointLine[1] =  targetVector -  GameObject.Find("leftBox").transform.FindChild("detectInBox/secondVertex").transform.position;
        pointLine[2] =  targetVector- GameObject.Find("leftBox").transform.FindChild("detectInBox/thirdVertex").transform.position;
        pointLine[3] =  targetVector -  GameObject.Find("leftBox").transform.FindChild("detectInBox/fourthVertex").transform.position;
        rectangleLine[0] = GameObject.Find("leftBox").transform.FindChild("detectInBox/secondVertex").transform.position -  GameObject.Find("leftBox").transform.FindChild("detectInBox/firstVertex").transform.position;
        rectangleLine[1] = GameObject.Find("leftBox").transform.FindChild("detectInBox/thirdVertex").transform.position - GameObject.Find("leftBox").transform.FindChild("detectInBox/secondVertex").transform.position;
        rectangleLine[2] = GameObject.Find("leftBox").transform.FindChild("detectInBox/fourthVertex").transform.position - GameObject.Find("leftBox").transform.FindChild("detectInBox/thirdVertex").transform.position;
        rectangleLine[3] = GameObject.Find("leftBox").transform.FindChild("detectInBox/firstVertex").transform.position - GameObject.Find("leftBox").transform.FindChild("detectInBox/fourthVertex").transform.position;
    }else if( whichBox == "right"){
        pointLine[0] =  targetVector - GameObject.Find("rightBox").transform.FindChild("detectInBox/firstVertex").transform.position;
        pointLine[1] =  targetVector - GameObject.Find("rightBox").transform.FindChild("detectInBox/secondVertex").transform.position;
        pointLine[2] =  targetVector - GameObject.Find("rightBox").transform.FindChild("detectInBox/thirdVertex").transform.position;
        pointLine[3] =  targetVector - GameObject.Find("rightBox").transform.FindChild("detectInBox/fourthVertex").transform.position;
        rectangleLine[0] = GameObject.Find("rightBox").transform.FindChild("detectInBox/secondVertex").transform.position - GameObject.Find("rightBox").transform.FindChild("detectInBox/firstVertex").transform.position;
        rectangleLine[1] = GameObject.Find("rightBox").transform.FindChild("detectInBox/thirdVertex").transform.position - GameObject.Find("rightBox").transform.FindChild("detectInBox/secondVertex").transform.position;
        rectangleLine[2] = GameObject.Find("rightBox").transform.FindChild("detectInBox/fourthVertex").transform.position - GameObject.Find("rightBox").transform.FindChild("detectInBox/thirdVertex").transform.position;
        rectangleLine[3] = GameObject.Find("rightBox").transform.FindChild("detectInBox/firstVertex").transform.position - GameObject.Find("rightBox").transform.FindChild("detectInBox/fourthVertex").transform.position;
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
