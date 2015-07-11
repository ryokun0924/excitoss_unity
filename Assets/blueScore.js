#pragma strict
import UnityEngine.UI;

var score:GUIText;
var showFlag:boolean = false;
function Start () {
    score =  GetComponent("GUIText");
    score.color=Color.white;
    score.text = "0";
}

function Update () {
    if(showFlag){
    score.text = GameObject.Find("main").GetComponent(main).rightSuccessBall.ToString();
}else{
    score.text ="";
}
if(Input.GetKey("s")){
    showFlag = !showFlag;
}

}
