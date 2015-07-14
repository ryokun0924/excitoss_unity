#pragma strict
import UnityEngine.UI;

var score:GUIText;



var showFlag:boolean = false;
var createFlag:boolean = false;

function Start () {
    score = GetComponent("GUIText");
    score.color=Color.white;
    score.text = "0";
}

function Update () {
    if(showFlag){
    score.text = GameObject.Find("main").GetComponent(main).leftSuccessBall.ToString();
}else{
        score.text ="";
}
if(Input.GetKey("1")){
    showFlag = !showFlag;
}

}
