{
  let selector = document.getElementById("lang-select");
  selector.addEventListener("change",()=>{
    switch(selector.value){
        case "kr": break;
        case "en": window.location.href = (langUrlEn)?langUrlEn:"404-language.html"; break;
        default: console.log("Exception!");
      }
  });
}