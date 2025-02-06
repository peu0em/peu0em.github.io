{
  let current=document.documentElement.getAttribute('lang');
  let selector = document.getElementById("lang-select");
  selector.addEventListener("change",()=>{
    if(selector.value!=current){
      window.location.href = (window['langUrl_'+selector.value])?window['langUrl_'+selector.value]:"/404-language";
    }
  });
}