"use strict";var game=function(){function e(){d.forEach(function(e){e.removeEventListener("click",t),e.classList.add("is-deleted")}),d=[],o=!1}function i(){document.getElementById("currentScore").innerText=c,s===n.length&&setTimeout(function(){alert("You won")},1e3)}function t(){if(!(d.length>=2||this.isClicked)){var t=this.querySelector(".back");d.push(this),t.style.backgroundImage="url("+r+n[this.index].src+")",this.classList.add("is-horizontal-rotated"),this.isClicked=!0,o?e():2===d.length&&(!function(){var t=n[d[0].index],r=n[d[1].index];t.id===r.id?(o=!0,c+=100,s+=2,e(),i()):o=!1}(),setTimeout(function(){d.forEach(function(e){var i=e.querySelector(".back");e.classList.remove("is-horizontal-rotated"),e.isClicked=!1,d=[],setTimeout(function(){i.style.backgroundImage=""},1e3)})},1e3))}}var n=[{src:"1.jpg",id:1},{src:"2.jpg",id:2},{src:"3.jpg",id:3},{src:"4.jpg",id:4},{src:"5.jpg",id:5},{src:"6.jpg",id:6},{src:"7.jpg",id:7},{src:"8.jpg",id:8},{src:"9.jpg",id:9},{src:"10.jpg",id:10}],r="img/cards/",c=0,o=!1,s=0,d=[];return{init:function(){var e=document.querySelectorAll(".card");n=function(e){return e.sort(function(){return.5-Math.random()})}(n=function(e){return e.concat(e)}(n)),function(e){e.forEach(function(e,i){e.isClicked=!1,e.index=i,e.addEventListener("click",t)})}(e)},serviceWorker:function(){"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").then(function(e){console.log("SW registered: ",e)}).catch(function(e){console.log("SW registration failed: ",e)})})}}}();game.serviceWorker(),game.init();