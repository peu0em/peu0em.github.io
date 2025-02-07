function themeChange(){
  switch(document.body.dataset.theme){
    case "default":
      document.body.dataset.theme = "dark";
      window.localStorage.setItem("theme","dark");
    break;
    case "dark":
      document.body.dataset.theme = "default";
      window.localStorage.setItem("theme","default");
    break;
    default:
      console.log("No Theme");
  }
}