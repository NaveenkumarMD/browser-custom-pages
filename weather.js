const stackoverflow_conatiner_Node = document.getElementById('reputations');
const stackoverflow_badges_Node = document.getElementById('badges');
var silver_node=document.getElementById('silver');
var gold_node=document.getElementById('gold');
var bronze_node=document.getElementById('bronze');
fetch("https://powerful-badlands-76449.herokuapp.com/https://stackoverflow.com/users/flair/14353744.json")
    .then(res => res.json()).then(res => {
        console.log(res);
        stackoverflow_conatiner_Node.innerHTML = res.reputation;
        var silver;
        var gold;
        var bronze;
        var regex=/>\d+</gm;
        let re=new RegExp(regex);
        //badgeHtml matchall
        let badges=[]
        let matches=res.badgeHtml.matchAll(re);
        for(let match of matches){
            badges.push(match[0].replace("<","").replace(">",""));
        }
        if(badges.length==2){
            silver=badges[0];
            bronze=badges[1];
            gold=0
        }
        else if(badges.length==3){
            gold=badges[0];
            silver=badges[1];
            bronze=badges[2];
        }
        else{
            bronze=badges[0];
            gold=0;
            silver=0;
        }
        silver_node.innerHTML=silver;
        gold_node.innerHTML=gold;
        bronze_node.innerHTML=bronze;
    })
    .catch(err => console.log(err));