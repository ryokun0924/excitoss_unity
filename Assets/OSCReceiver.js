//settings
public var RemoteIP : String = "127.0.0.1";
public var SendToPort : int = 57131;
public var ListenerPort : int = 12345;
public var controller : Transform;
private var handler : Osc;
public var oscFlag:boolean;
public var x:int;
public var isGoodRythm:boolean;
public var whichKinect:String;

public function Start ()
{
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);

	handler.SetAddressHandler("/test", kinect1);
	handler.SetAddressHandler("/kinect", kinect2);
}
Debug.Log("Running");
//these fucntions are called when messages are received
public function kinect1(oscMessage : OscMessage) : void
{
	//How to access values:
	//oscMessage.Values[0], oscMessage.Values[1], etc
	Debug.Log("Called Example One > " + Osc.OscMessageToString(oscMessage));
}

//these fucntions are called when messages are received
public function kinect2(oscMessage : OscMessage) : void
{
	//How to access values:
	//oscMessage.Values[0], oscMessage.Values[1], etc
	oscFlag = true;
	Debug.Log("Called Example Two > " + Osc.OscMessageToString(oscMessage));
	//x座標を送信
	x = oscMessage.Values[0];// -  320;
	isGoodRythm = oscMessage.Values[2];
	whichKinect  = oscMessage.Values[3];


}
