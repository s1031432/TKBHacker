//  Update  : 2018/09/11 00:05
// Download : https://drive.google.com/drive/folders/1GpI5PudSMMsoNf6PPh5WpTHrP1Y9V7kx?usp=sharing
//  ReadMe  : https://www.youtube.com/watch?v=tDc1fXwdabA&feature=youtu.be
//  Use on  : http://bookseat.tkblearning.com.tw/book-seat/student/bookSeat/index
//
var Code = $('div[style*="width: 120px"]').text();
var access_token = $("script:contains('access_token : ')").text().split("access_token")[1].split(' : "')[1].split('"')[0];
var session_time = new Array();
var ExTime = 0;
var Flag = false;
var DT = new Date();
var ClassString = '';

var ReConnectTime = 2000;
for(var i=1;;i++)
{	
	if($('option').eq(i).text()=='請選擇上課日期')
		break;
	else
		ClassString += i+"、"+$('option').eq(i).text().split('有')[0] + '\n';
}
//----------------------------Setting----------------------------\\
// var ReConnectTime = "250"; //ns
// var class_data = $('option').eq(1).val(); 	// 課程選單第一個（eq(1)）選項，請確保有足夠分鐘數
// var class_data = "V5<6:TJ:;<=>?A=BD@EGCI";  //子嘉線性代數課號，每個人可能不同，請自己去開source確認
// var date = "2018-08-26";	// format: "YYYY-MM-DD"
// var branch_no = "TT";		// 台北 : TT, 中壢 : UA, 景美 : TE, 高雄：XX
// session_time = ["3","4"];		// 要第幾節(最多三節)(最多三節)(最多三節)
//
//------session_time sample------
//session_time = ["1","3"];
//session_time = ["2","3","4"];	
//------session_time sample------
//
//----------------------------Setting----------------------------//

//-----prompt-----
var ContinueFlag = true;
while(ContinueFlag)
{
	var Mode = prompt("請選擇功能\n輸入「1」為換日時搶課\n輸入「2」為平時撿課（等人丟）", 1);
	if(Mode==1)
		var ModeString = "搶課";
	else if(Mode==2)
		var ModeString = "撿課";
	if(Mode)
		break;
	else if(Mode === null)
		ContinueFlag = false;
	else
		continue;
}
while(ContinueFlag)
{
	var TempC = prompt("選擇要上的課程編號\n"+ClassString, 1);
	var C = $('option').eq(TempC).val();
	if(parseInt(TempC)>0 && parseInt(TempC)<i)
	{
		ClassString = ($('option').eq(TempC).text()).split('-->')[0];
		break;
	}
	else if(TempC === null)
		ContinueFlag = false;
	else
		continue;
}
while(ContinueFlag)
{
	var Y = prompt(ClassString+"\n輸入年份", DT.getFullYear());
	if(parseInt(Y)>=2018 && parseInt(Y)<=2050 && Y.length==4)
		break;
	else if(Y===null)
		ContinueFlag = false;
	else if(Y.length!=4)
		continue;
}
while(ContinueFlag)
{
	var M = prompt(ClassString+", "+Y+"/\n輸入月", "");
	if(parseInt(M)>0 && parseInt(M)<13)
	{
		if(M.length==1)
			M = "0" +M;
		break;
	}
	else if(M===null)
		ContinueFlag = false;
	else if(M.length>3)
		continue;
}
while(ContinueFlag)
{
	var D = prompt(ClassString+", "+Y+"/"+M+"/\n輸入日", "");
	if(parseInt(D)>0 && parseInt(D)<32)
	{
		if(D.length==1)
			D = "0" + D;
		break;
	}
	else if(D===null)
		ContinueFlag = false;
	else if(D.length>3)
		continue;
}
while(ContinueFlag)
{
	var S = prompt(ClassString+", "+Y+"/"+M+"/"+D+"\n輸入時段（最多3個），EX: 1、12、23、123\n輸入範例：234", "");
	if(parseInt(S)>0)
		break;
	else if(S===null)
		ContinueFlag = false;
}
while(ContinueFlag)
{
	var B = prompt(ClassString+", "+Y+"/"+M+"/"+D+" 第"+S+"節\n輸入學堂代號（代號如下）\n基隆TA、淡水TS、台北TT、景美TE\n新莊TB、三峽TD、林口UC、桃園UB\n中壢UA、中央UD、新竹UU、苗栗UE\n宜蘭CB、東華CH、台中VV\n東海VD、逢甲VA、彰化VC、虎尾WD\n嘉義WA、斗六WB、民雄WF、台南WW\n楠梓XB、高雄XX、高大XC、屏東XA", "");
	if(B == "TA" || B == "TS" || B == "TT" || B == "TE" || B == "TB" || B == "TD" || B == "UC" || B == "UB" || B == "UA" || B == "UD" || B == "UU" || B == "UE" || B == "CB" || B == "CH" || B == "VV" || B == "VD" || B == "VA" || B == "VC" || B == "WD" || B == "WA" || B == "WB" || B == "WF" || B == "WW" || B == "XB" || B == "XX" || B == "XC" || B == "XA")
		break;
	else if(B===null)
		ContinueFlag = false;
}

if(S)
	var session_time = S.split("");
if(Y && M && D)
	var date = Y+"-"+M+"-"+D;
if(B)
	var branch_no = B;
var class_data = C;
//-----prompt-----
var branch_name = "";
switch(branch_no) {
    case "TA":
        branch_name = "基隆";
        break;
    case "TS":
        branch_name = "淡水";
        break;
    case "TT":
        branch_name = "台北";
        break;
    case "TE":
        branch_name = "景美";
        break;
    case "TB":
        branch_name = "新莊";
        break;
    case "UC":
        branch_name = "林口";
        break;   
    case "UB":
        branch_name = "桃園";
        break;  
    case "UA":
        branch_name = "中壢";
        break;
    case "UD":
        branch_name = "中央";
        break;  
    case "UU":
        branch_name = "新竹";
        break;        
	case "UE":
        branch_name = "苗栗";
        break;
    case "CB":
        branch_name = "宜蘭";
        break;    
    case "CH":
        branch_name = "東華";
        break;
    case "VV":
        branch_name = "台中";
        break; 
    case "VD":
        branch_name = "東海";
        break;
    case "VA":
        branch_name = "逢甲";
        break;
    case "VC":
        branch_name = "彰化";
        break;
    case "WD":
        branch_name = "虎尾";
        break;
    case "WA":
        branch_name = "嘉義";
        break; 
    case "WB":
        branch_name = "斗六";
        break;    
    case "WF":
        branch_name = "民雄";
        break;
    case "WW":
        branch_name = "台南";
        break;
    case "XB":
        branch_name = "楠梓";
        break;
    case "XX":
        branch_name = "高雄";
        break;
    case "XC":
        branch_name = "高大";
        break;
    case "XA":
        branch_name = "屏東";
        break;                    
    default:
        break;
}
branch_name += "數位學堂";
if(ContinueFlag)
{
	$(".top-banner").empty();
	if(confirm("使用模式："+ModeString+"\n預約課程："+$('option').eq(TempC).text().split('-->')[0]+"\n預約日期："+date+"\n預約地點："+branch_name+"\n預約節次："+session_time+"\n***按確定開始執行***"))
			Pick();
}	
else
	ContinueFlag = false;
var SetDay = new Date(date+" 00:00:00");

function Pick(){
	var Seat = 0;
	var Day = new Date();
	var NowYear = Day.getFullYear();
	var NowMonth = Day.getMonth()+1;
	var NowDay = Day.getDate();
	var NowHour = Day.getHours();
	var NowMinute = Day.getMinutes();
	var NowSecond = Day.getSeconds();
	var NowYMD = NowYear+"-"+NowMonth+"-"+NowDay+" "+NowHour+":"+NowMinute+":"+NowSecond;
	var NowDate = new Date(NowYMD);
	var SetDay = new Date(date+" 00:00:00");
	if(NowHour < 10)
		NowHour = "0"+NowHour;
	if(NowMinute < 10)
		NowMinute = "0"+NowMinute;
	if(NowSecond < 10)
		NowSecond = "0"+NowSecond;
	ExTime++;
	if(!Flag){
		console.group("["+NowYear+"/"+NowMonth+"/"+NowDay+" "+NowHour+":"+NowMinute+":"+NowSecond+"]-["+ExTime+"] ʕ•͡ᴥ•ʔ");
		console.group("參數設定");
		console.log("%c地點："+branch_name, "font-weight:bold;");
		console.log("%c日期："+date, "font-weight:bold;");
		console.log("%c場次："+session_time, "font-weight:bold;");
		console.log("%c課程："+ClassString, "font-weight:bold;");
		console.groupEnd("參數設定");
		if(((SetDay-NowDate)/(1000 * 60 * 60 * 24)) >7)
		{
			console.error("日期輸入錯誤！（大於八天）");
			alert("日期輸入有誤，請重新設定參數！")
			Flag=1;
		}
		else if(((SetDay-NowDate)/(1000 * 60 * 60 * 24)) >6 && ((SetDay-NowDate)/(1000 * 60 * 60 * 24)) <7)
			console.warn("Server端尚未換日，還要"+parseInt((((SetDay-NowDate)-518400000)/(1000*3600)))+"小時"+parseInt((((SetDay-NowDate)-518400000)/(1000*60))%60)+"分"+parseInt((((SetDay-NowDate)-518400000)/(1000))%60)+"秒後才可送出預約。");
		else if(((SetDay-NowDate)/(1000 * 60 * 60 * 24)) >5.5)
			console.warn("距二階座位開放，還有"+parseInt((((SetDay-NowDate)-475200000)/(1000*3600)))+"小時"+parseInt((((SetDay-NowDate)-475200000)/(1000*60))%60)+"分"+parseInt((((SetDay-NowDate)-475200000)/(1000))%60)+"秒。"); //475200000
		
		function PickSession(Seat_Session){
			var WantSession = new Array();
			for(var i=0;i<Seat_Session.length;i++)
				WantSession.push(Seat_Session[i]);
			console.log("%c-正在送出場次"+ WantSession + "的預約(っ●ω●)っ-", "font-weight:bold;");
			$.ajax({
				url: '/book-seat/student/bookSeat/book',
				cache: false,
				dataType: 'json',
				type:'POST',
				data:{
					class_data : $.trim(class_data) ,
					date : $.trim(date) ,
					branch_no : $.trim(branch_no) ,
					session_time : WantSession ,
					access_token : $.trim(access_token)
				},
				error: function(xhr) {
					console.log("%c-場次"+ WantSession + "預約失敗 o'_'o ", "font-weight:bold;");
				},
				success: function(data) {
					$.ajax({
						url: '/book-seat/student/bookSeat/returnCheck',
						cache: false,
						dataType: 'json',
						type:'POST',
						data:{
							returnTxt : "Y" ,
							date : data.USE_DATE,
							branch_no : data.BRANCH_NO,
							session_text : data.SEAT_SESSION,
							subject_no : data.SUBJECT_NO
						},
						error: function(xhr) {
							console.log("%c-場次"+ WantSession + "預約失敗 o'_'o ", "font-weight:bold;");
						},
						success: function(data2) {
							console.group("["+NowYear+"/"+NowMonth+"/"+NowDay+" "+NowHour+":"+NowMinute+":"+NowSecond+"]  預約成功(っ●ω●)っ");
							console.log("%c預約地點："+branch_name, "font-weight:bold;");
							console.log("%c預約日期："+date, "font-weight:bold;");
							console.log("%c預約節次："+WantSession, "font-weight:bold;");
							console.log("%c預約課程："+ClassString, "font-weight:bold;");
							$(".top-banner").append("  預約地點："+branch_name+"<br>  預約日期："+date+"<br>  預約節次："+WantSession+"<br>  預約課程："+ClassString+" "+"<br>  預約成功！<br>");
							console.groupEnd("["+NowYear+"/"+NowMonth+"/"+NowDay+" "+NowHour+":"+NowMinute+":"+NowSecond+"]  預約成功(っ●ω●)っ");
							while(WantSession.length){
								var WSTemp = WantSession.pop();
								session_time.splice(session_time.indexOf(WSTemp),1);
							}
							//location.href = '/book-seat/student/learningRecord/list';
						}
					});
				}
			});
		}
		$.ajax({
			url: '/book-seat/student/bookSeat/sessionTime',
			cache: false,
			async: false,
			dataType: 'json',
			type:'POST',
			data:{
				date : date ,
				branch_no : branch_no
			},
			error: function(xhr) {
				alert('Fail 請檢查參數設定是否有誤及網路連線是否正常');
			},
			success: function(SESSION) {
				setTimeout('Pick();', 2000);
				var NowDate = new Date(NowYMD);
				var SetDay = new Date(date+" 00:00:00");
				var warn=0;
				if(!Seat)
					console.group("場次資訊");
				if(SESSION != null && SESSION.length > 0){
					var ModeSession_time = new Array();
					for(i = 0 ; i < SESSION.length ; i ++){
						var session_timeQ = SESSION[i];
						for(j = 0 ; j < SESSION.length ; j++){
							if(session_time[j] == session_timeQ.SEGMENT)
							{
								warn=1;
								break;
							}
							else
								warn=0;
						}
						if(parseInt(session_timeQ.HASCLASS) > 0){
								if(warn==1)
								{
									console.error("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 已預約成功（還有"+session_timeQ.SEATNUM+"個位置）", "font-weight:bold;");
									session_time.splice(session_time.indexOf(session_timeQ.SEGMENT),1);
								}
								else
									console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 已預約成功（還有"+session_timeQ.SEATNUM+"個位置）");
						}else if(parseInt(session_timeQ.SEATNUM) == 0){
								if(warn==1)
									console.warn("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 滿場中", "font-weight:bold;");
								else
									console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 滿場中");
						}else if(parseInt(session_timeQ.OFFCLASS) > 0){
								if(warn==1)
								{
									console.error("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 停課中", "font-weight:bold;");
								}
								else
									console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 停課中");
						}else{
							if(((SetDay-NowDate)/86400000)<5.5)
							{
									if(warn==1)
									{
										console.warn("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 有"+session_timeQ.SEATNUM+"個位置", "font-weight:bold;");
										ModeSession_time.push(session_timeQ.SEGMENT);
									}
									else
										console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 有"+session_timeQ.SEATNUM+"個位置");
							}
							else if(((SetDay-NowDate)/86400000)>=6)
							{
									if(warn==1)
										console.warn("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 還有"+session_timeQ.SEATNUM+"個位置（尚未開放預約）", "font-weight:bold;");
									else
										console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 還有"+session_timeQ.SEATNUM+"個位置（尚未開放預約）");
							}
							else if(((SetDay-NowDate)/86400000)>=5.5)
							{
									if(warn==1)
									{
										console.warn("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 還有"+session_timeQ.SEATNUM+"個位置 or 一階沒位置", "font-weight:bold;");
										ModeSession_time.push(session_timeQ.SEGMENT);
									}
									else
										console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 還有"+session_timeQ.SEATNUM+"個位置 or 一階沒位置");
							}
							else
							{
									if(warn==1)
									{
										console.warn("%c第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 有"+session_timeQ.SEATNUM+"個位置", "font-weight:bold;");
										ModeSession_time.push(session_timeQ.SEGMENT);
									}
									else
										console.log("第「"+session_timeQ.SEGMENT+"」場（"+session_timeQ.INIT_TIME+"～"+session_timeQ.END_TIME+"） 有"+session_timeQ.SEATNUM+"個位置");
							}
						}		
					}
					console.groupEnd("場次資訊");
					if(Mode==1 && ModeSession_time.length)
					    PickSession(ModeSession_time);
					else if(Mode==2 && ModeSession_time.length){
						for(var i=0;i<ModeSession_time.length;i++)
							PickSession(ModeSession_time[i]);
					}	
				}
			}	
		});
		console.groupEnd("["+NowYear+"/"+NowMonth+"/"+NowDay+" "+NowHour+":"+NowMinute+":"+NowSecond+"]-["+ExTime+"] ʕ•͡ᴥ•ʔ");
	}
	if(session_time.length==0)
	{
		Flag=1;
		alert("都撿完啦");
		location.href = '/book-seat/student/learningRecord/list';
	}
}