#pragma strict
var movTexture : MovieTexture;
function Start () {
    GetComponent.<Renderer>().material.mainTexture = movTexture;
	movTexture.Play();
}
var flag:boolean = false;
var openingEndFlag:boolean = false;

//切り替わったcameraが指定位置に到達したか
var isCameraCorrectPosition:boolean = true;
function Update () {
    if(!movTexture.isPlaying){
//         while(!flag){
//             Debug.Log(GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y);
// /                GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y -= 0.1F;
//                 if(GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y < -1000){
//                     flag = true;
//                 }
//         }
//         if(flag){
//
        //再生が終わったらcamera切り替え(一度だけ呼ばれる)
        if(!openingEndFlag){
        GameObject.Find("MovCamera").GetComponent(Camera).enabled = false;
        GameObject.Find("RightCamera").GetComponent(Camera).enabled = true;
        GameObject.Find("LeftCamera").GetComponent(Camera).enabled = true;
        //位置を調整
        GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y = GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y;
        GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y = GameObject.Find("MovCamera").GetComponent(Camera).transform.position.y;

        openingEndFlag = true;
        isCameraCorrectPosition = false;
        }
        if(!isCameraCorrectPosition){
            GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y -= 25;
            GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y -= 25;
            if(GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y <621){
                GameObject.Find("RightCamera").GetComponent(Camera).transform.position.y = 621;
                GameObject.Find("LeftCamera").GetComponent(Camera).transform.position.y = 621;
                isCameraCorrectPosition = true;
            }
        }

    // }

    }
    if(Input.GetKey("o")){
        movTexture.Stop();
    }

}
