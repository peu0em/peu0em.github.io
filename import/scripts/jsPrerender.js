document.body.dataset.theme = 
window.localStorage.getItem("theme")?window.localStorage.getItem("theme"):
window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":
"default"
;