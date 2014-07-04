candies=0;
level=1;
experience=0;
experience_next=100;
buildings=[];
CPS=0;
$("#lollipop").click(function(){
	candies+=level;
    experience+=level;
    if(experience>=experience_next){
        level++;
        experience_next*=experience_next*1^(1+(level/10));
    }
	save("experience",experience);
	save("experience_next",experience_next);
	save("level",level);
    actualizeCandies();
    actualizeExperience();
});

function addBuilding(name,price,cps){
	buildings.push([name,price,cps,0]);
}

function build(name){
	for(i=0;i<buildings.length;i++){
		if(buildings[i][0]==name){
			if(candies>=buildings[i][1]){
				candies-=buildings[i][1];	//pay for your building
				buildings[i][1]*=1.1;		//make next level more expensive
				buildings[i][1]=buildings[i][1];//round it
				buildings[i][3]++;			//make level higher
				actualize();
				save("buildings",buildings);
                actualizeCps();
			}
			break;
		}
	}
}

function saveAll(){
	localStorage.setItem("candies", candies);
	localStorage.setItem("buildings", buildings);
	localStorage.setItem("level", level);
	localStorage.setItem("experience", experience);
	localStorage.setItem("experience_next", experience_next);
}

function loadAll(){
	var ret=[];
	ret.push(localStorage.getItem("candies"));
	ret.push(localStorage.getItem("buildings"));
	ret.push(localStorage.getItem("level"));
	ret.push(localStorage.getItem("experience"));
	ret.push(localStorage.getItem("experience_next"));
	return ret;
}

function save(name,value){
	localStorage.setItem(name, value);
}

function load(element){
	return localStorage.getItem(element);
}

function cps(){
    cpsTmp=0;
	for(i=0;i<buildings.length;i++){
		cpsTmp+=buildings[i][2]*buildings[i][3];
	}
	candies+=(cpsTmp/10);
    CPS=cpsTmp;
    actualizeCandies();
	save("candies",candies);	//save candies every second
}
