var quiz=[];
var num="";
var diffi="";
var cate="";
var type="";
var ii=0;
var url="https://opentdb.com/api.php?amount=";
var answers=[];
var useranswers=[];	

$(document).ready(function(){acts();});

function getData(){	
	if(num=="")
	{
	num=Math.floor(Math.random()*10);
	num=5+(num%6);
	url=url+num;
	}
	//console.log(url+"  "+num);
	fetch(url)
	.then(response => response.json())
	.then(json => quiz.push(json))
	.then(
function(){
	var data=quiz[0];
	if(data.response_code==0){
		var arr=[];
		arr=data.results;
		showquiz(arr);
	}
	else{
		console.log("Sorry User!!, Some Error Occured.Please Try Again"); 
	}	
})
}

function showquiz(arr){
		
	document.getElementById("qu").innerHTML="";	

	var rad="<input type='checkbox' onclick=clked(this); id=";

	for(var i=0;i<arr.length;i++){
		var x="<p id=p"+i+">";
		x+="<b>Category - "+arr[i].category+"<br>Difficulty - "+arr[i].difficulty+"</b><br><br>"+arr[i].question+"<br>";

		var opn=Math.floor(Math.random()*10);
		opn=opn%(arr[i].incorrect_answers.length+1);

		for(var j=0,k=0;j<arr[i].incorrect_answers.length+1;j++)
		{
			if(j==opn){answers.push(j);x+=rad+i+j+">&nbsp;"+arr[i].correct_answer+"&emsp;&emsp;&emsp;&emsp;"}
			else{x+=rad+i+j+">&nbsp;"+arr[i].incorrect_answers[k]+"&emsp;&emsp;&emsp;&emsp;";k++;}
		}
		
		useranswers.push(-1);
		x+="<br><br><br>"+(i+1)+"/"+num+"</p>";
		document.getElementById("qu").innerHTML+=x;
	}
	showques();
}

function showques(){	
	for(var j=0;j<num;j++){
		var x="p"+j;
		if(j==ii)
		{document.getElementById(x).style.display='block';}
		else
		{document.getElementById(x).style.display='none';}
	}
}

function next(){
	if(ii!=num){ii=ii+1;showques();}
	if(ii==num){
		document.getElementById("buttons").style.display='none';
		var count=0;
		for(var p=0;p<answers.length;p++)
		{
			if(answers[p]==useranswers[p]){count=count+1;}
		}
		document.getElementById("qu").innerHTML="<span id='res'>"+count+"/"+num+"</span>";
		document.getElementById("qu").innerHTML+="<br><br><button id='requiz' onclick='reset();'>Requiz</button>";
	}
}
function previous(){if(ii!=0){ii=ii-1;showques();}}

function clked(b){
	if(useranswers[(b.id)[0]]!=-1){
		document.getElementById((b.id)[0]+useranswers[(b.id)[0]]).checked=false;
	}

	useranswers[(b.id)[0]]=(b.id)[1];
	document.getElementById((b.id)[0]+useranswers[(b.id)[0]]).checked=true;
	
}


function reset(){
	quiz=[];
	answers=[];
	useranswers=[];
	ii=0;
	num="";
	diffi="";
	cate="";
	type="";
	url="https://opentdb.com/api.php?amount=";
	document.getElementById("qu").innerHTML='<br><br><span style="color:red;font-size:30px;">Getting Data..... </span><br>Refresh if it takes long';
	document.getElementById("buttons").style.display='block';
	acts();
}

function acts(){
	document.getElementById("nocho").style.display="none";
	document.getElementById("optbuts").style.display="block";
	document.getElementById("cho").style.display="block";	
	document.getElementById("nochoice").addEventListener("click",shownocho);
}

function shownocho(){	
	document.getElementById("optbuts").style.display="none";
	document.getElementById("cho").style.display="none";		
	document.getElementById("nocho").style.display="block";
	getData();
	
}

function startquiz(){
	num=document.getElementsByName("no")[0].value;
	diffi="&difficulty="+document.getElementsByName("diffi")[0].value;
	cate="&category="+document.getElementsByName("cate")[0].value;
	type="&type="+document.getElementsByName("typ")[0].value;
	
	if(diffi=="&difficulty=any"){diffi="";}
	if(cate=="&category=any"){cate="";}
	if(type=="&type=any"){type="";}
	if(num>50||num<0){setcol("no","red");}
	else{url=url+num+cate+diffi+type;}

	shownocho();
	
		
}

function setcol(x,col)
{	
	var el=document.getElementsByName(x)[0];
	el.style.borderColor=""+col+"";
}


