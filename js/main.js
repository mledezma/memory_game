"use strict";var game=function(){function i(){document.getElementById("currentScore").innerText=a,g===r.length/2&&alert("You won")}function t(){if(!(d>=2||(d++,this.isClicked))){var m=r[this.index].replace("img/cards/","").replace(".jpg",""),u=this.querySelector("img");c=e,e=this,(s=n)===(n=m)?(o=!0,a+=100,g+=2,i()):o=!1,o&&[c,e].forEach(function(i){i.removeEventListener("click",t),i.classList.add("is-deleted")}),u.src=r[this.index],this.classList.add("is-horizontal-rotated"),function(i){setTimeout(function(){n=0,i.classList.remove("is-horizontal-rotated"),i.isClicked=!1,d--,setTimeout(function(){i.querySelector("img").src="img/card-sample.jpg"},500)},2e3)}(this),this.isClicked=!0}}var e,c,r=["img/cards/1.jpg","img/cards/2.jpg","img/cards/3.jpg","img/cards/4.jpg","img/cards/5.jpg","img/cards/6.jpg","img/cards/7.jpg","img/cards/8.jpg","img/cards/9.jpg","img/cards/10.jpg"],n=0,s=-1,a=0,o=!1,d=0,g=0;return{init:function(){var i=document.querySelectorAll(".card");r=(r=function(i){return i.concat(i)}(r)).sort(function(){return.5-Math.random()}),function(i){i.forEach(function(i,e){i.isClicked=!1,i.index=e,i.addEventListener("click",t)})}(i)}}}();game.init();