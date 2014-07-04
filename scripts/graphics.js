//rotating epic cookie *__*
var rotation=0;	//cookie rotation

//Cookie click
var cookie_size=0;//0=100%
var cookie_grow=1;//1=cookie gets bigger, 0=cookie gets smaller
var isClicking=0;
var inter;
var cps;

var cloudPosition=[100,440,280];
var width=$(window).width();

//buildmenu
var buildMenuVisible=0;
var statsMenuVisible=0;
function rotateCandy(){
	$("#lollipop").css("transform","rotate("+rotation+"deg)");
	rotation+=2;
}

function clickCandy(){
	$("#lolli_gfx").css("width",160+cookie_size+"px");
	$("#lolli_gfx").css("height",160+cookie_size+"px");
	$("#lolli_gfx").css("margin-top",(-0.5)*(cookie_size)+"px");
	$("#lolli_gfx").css("margin-left",(-0.5)*(cookie_size)+"px");
	if(cookie_grow==1)
		cookie_size+=2;
	else if(cookie_grow==0)
		cookie_size-=2;
		
	if(cookie_size>=20)
		cookie_grow=0;
    if(cookie_size<=0){
        isClicking=0;
        cookie_grow=1;
        $("#lolli_gfx").css("width","100%");
        $("#lolli_gfx").css("height","100%");
        clearInterval(inter);
    }
}

function clickBuildPage(){
	if(buildMenuVisible==0){
   		$("#window").show();
        $("#statsWindow").hide();
        $("#buildWindow").show();
		buildMenuVisible=1;
	}else if(buildMenuVisible==1){
		$("#window").hide();
        $("#buildWindow").hide();
		buildMenuVisible=0;
	}
}
function clickStatsPage(){
	if(statsMenuVisible==0){
        $("#buildWindow").hide();
   		$("#statsWindow").show();
   		$("#window").show();
		statsMenuVisible=1;
	}else if(statsMenuVisible==1){
        $("#statsWindow").hide();
		$("#window").hide();
		statsMenuVisible=0;
	}
}

function addBuildingTab(title,price,cps,lvl){
	var html = '<a href="javascript: build(\''+title+'\');" style="text-decoration: none;"><div id="" class="tab">';
        html+= '<table style="width: 90%;margin: 0 auto;font-size: 12px;"><tr><td style="font-size: 22px;color: #555;">';
        html+= '<td style="text-align: left;"><img style="padding-top:8px;" src="images/icons/'+title+'.png"></img><span class="level">'+lvl+'</span></td><td style="text-align: center;">'+title+'</td><td style="padding-top:6px;">';
        html+= Math.floor(price)+' <img src="images/lollipop_small.png" style="width:12px;height:12px;"/><br />'+cps+' CPS</td></tr></table></div></a>';
		$("#buildWindowTabs").append(html);
}

function moveClouds(){
		for(i=0;i<3;i++){
			cloudPosition[i]+=(3-i+1);
        	$("#cloud"+i).css("margin-left",cloudPosition[i]);
            if(cloudPosition[i]>=width+50)
                cloudPosition[i]=-200;
		}
}

function actualizeBuildingPage(){
	$("#buildWindowTabs").html("");
	for(i=0;i<buildings.length;i++){
		addBuildingTab(buildings[i][0],buildings[i][1],buildings[i][2],buildings[i][3],buildings[i][4]);
	}
}

function actualizeCandies(){
	$("#candies").html(Math.floor(candies));	
}

function actualizeExperience(){
    percent = Math.floor(experience/experience_next*100);
    $("#green").css("width",percent+"%");
    $("#leveltext").html("Level "+level);
}

function actualizeCps(){
    $("#cps").html(CPS);
}

function actualize(){
	actualizeBuildingPage();
	actualizeCandies();	
}
// ------------------------------------- //
$("#lollipop").click(function(){
    if(isClicking==0){
        isClicking=1;
        inter = setInterval(function(){clickCandy();},1);
    }
});

$("#build").click(function(){
	clickBuildPage();
});

$("#stats").click(function(){
	clickStatsPage();

});

setInterval(function(){rotateCandy();},30);
setInterval(function(){moveClouds();},50);

$( document ).ready(function() {
	for(i=0;i<buildings.length;i++){
		addBuildingTab(buildings[i][0],buildings[i][1],buildings[i][2],buildings[i][3],buildings[i][4]);
	}
});
