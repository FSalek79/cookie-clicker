function main(){
	addBuilding("Cursor",50,1);
	addBuilding("Candy Farm",500,3);
	addBuilding("Candy Machine",2000,10);
	addBuilding("Candy Mine",50000,60);
	addBuilding("Candy Factory",200000,300);
	addBuilding("Timemachine",1000000,2000);
    
    //load gamedata
	var load = loadAll();
    if(!(isNaN(load[0])) && load[0])
        candies=parseInt(load[0]);
    else
        candies=0;
    if(load[1]){
        buildingsTmp = load[1].split(",");
        z=0;
        if(buildingsTmp.length%4==0){
            for(i=0;i<buildingsTmp.length/4;i++){
                tmp=[];
                for(j=i*4;j<i*4+4;j++){
                    tmp.push(buildingsTmp[z]);
                    z++;
                }
                buildings[i]=[];
                buildings[i]=tmp;
            }
        }
    }
    /*if(!(isNaN(load[2])) && load[2] && !isNaN(load[3]) && load[3] && !isNaN(load[4]) && load[4]){
        level = load[2];
        experience = load[3];
        experience_next=load[4];
        actualizeExperience();
    }*/
    cps();              //to calculate cps
	actualizeCandies();
    actualizeCps();
	setInterval(function(){cps()},100);	//calculate CP/S, every 100 ms to look better ;)
}
