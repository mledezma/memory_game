"use strict";var game=function(){function e(){d.forEach(function(e){e.removeEventListener("click",n),e.classList.add("is-deleted")}),d=[],s=!1}function t(){document.getElementById("currentScore").innerText=c,console.log("currentScore",c),console.log("maxScore",l),console.log("maxScoreLocal",o()),c>l&&(l=c,document.getElementById("maxScore").innerText=l,"undefined"!=typeof Storage?localStorage.setItem("maxScore",l):alert("The local storage is not supported")),a===r.length&&setTimeout(function(){alert("You won")},1e3)}function n(){if(!(d.length>=2||this.isClicked)){var n=this.querySelector(".back");d.push(this),n.style.backgroundImage="url("+i+r[this.index].src+")",this.classList.add("is-horizontal-rotated"),this.isClicked=!0,s?e():2===d.length&&(!function(){var n=r[d[0].index],o=r[d[1].index];n.id===o.id?(s=!0,c+=100,a+=2,e(),t()):s=!1}(),setTimeout(function(){d.forEach(function(e){var t=e.querySelector(".back");e.classList.remove("is-horizontal-rotated"),e.isClicked=!1,d=[],setTimeout(function(){t.style.backgroundImage=""},1e3)})},1500))}}function o(){if("undefined"!=typeof Storage){return localStorage.getItem("maxScore")}alert("The local storage is not supported")}var r=[{src:"1.jpg",id:1},{src:"2.jpg",id:2},{src:"3.jpg",id:3},{src:"4.jpg",id:4},{src:"5.jpg",id:5},{src:"6.jpg",id:6},{src:"7.jpg",id:7},{src:"8.jpg",id:8},{src:"9.jpg",id:9},{src:"10.jpg",id:10}],i="img/cards/",c=0,s=!1,a=0,d=[],l=0;return{init:function(){l=o(),document.getElementById("maxScore").innerText=l;var e=document.querySelectorAll(".card");r=(r=function(e){return e.concat(e)}(r)).sort(function(){return.5-Math.random()}),function(e){e.forEach(function(e,t){e.isClicked=!1,e.index=t,e.addEventListener("click",n)})}(e)},serviceWorker:function(){"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("../sw.js").then(function(e){console.log("SW registered: ",e)}).catch(function(e){console.log("SW registration failed: ",e)})})}}}();game.serviceWorker(),game.init();