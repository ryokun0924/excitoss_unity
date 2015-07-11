#pragma strict
var createTime:float;
function Start () {
    //createTime =  Time.realtimeSinceStartup;
}

function Update () {
    transform.position += new Vector3(0,0.6666667*Time.deltaTime,0);
    if(transform.position.y > 1.1){
        Destroy(this.gameObject);
    }

}
