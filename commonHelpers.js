/* empty css                      */import{f}from"./assets/vendor-2b44ac2e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const c=document.querySelector("button"),a=document.querySelector("input");document.querySelector("[data-days]");const m=document.querySelector("[data-seconds]");let l;const h={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onChange(r){const t=new Date(r[0]);if(t.getTime()<=Date.now())return c.setAttribute("disabled","true"),alert("Please choose a date in the future");l=t.getTime(),c.removeAttribute("disabled")}};f("#datetime-picker",h);function p(r){const o=Math.floor(r/864e5),s=Math.floor(r%864e5/36e5),u=Math.floor(r%864e5%36e5/6e4),d=Math.floor(r%864e5%36e5%6e4/1e3);return console.log({days:o,hours:s,minutes:u,seconds:d}),{days:o,hours:s,minutes:u,seconds:d}}c.addEventListener("click",y);function y(r){c.setAttribute("disabled","true"),a.setAttribute("disabled","true");let t=l-Date.now(),i=setInterval(()=>{if(t<=0)clearInterval(i),c.removeAttribute("disabled"),a.removeAttribute("disabled");else{const n=p(t);g(n),t-=1e3,console.log(t)}},1e3,t)}function b(r){return`${r}`.padStart(2,"0")}function g({days:r,hours:t,minutes:i,seconds:n}){m.textContent=b(n)}
//# sourceMappingURL=commonHelpers.js.map
