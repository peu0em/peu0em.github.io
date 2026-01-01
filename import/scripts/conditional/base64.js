{
  const MAXLEN = 100000;
  const memory = new WebAssembly.Memory({ initial: 5 });
  const TEXT_PTR = 1024, BASE64_PTR = TEXT_PTR + MAXLEN;
  let base64Wsm;

  function listenerOn(){
    const textBox = document.getElementById('text-box'), base64Box = document.getElementById('base64-box');
    if(base64Wsm){
      const heapBase = base64Wsm.exports.getHeapBase()?base64Wsm.exports.getHeapBase():0;
      textBox.addEventListener('input',()=>{
        let textOrg = textBox.value;
        if(textOrg.length > 0){
          const text = new TextEncoder().encode((textOrg.length > MAXLEN)?textOrg.slice(0,MAXLEN):textOrg);
          const len = text.length;
          new Uint8Array(memory.buffer,heapBase+TEXT_PTR,len).set(text);

          base64Box.value = new TextDecoder().decode(new Uint8Array(memory.buffer,heapBase+BASE64_PTR,base64Wsm.exports.base64Encode(BASE64_PTR,TEXT_PTR,len)));
        }
      });
      base64Box.addEventListener('input',()=>{
        let textOrg = base64Box.value;
        if(textOrg.length > 0){
          const text = new TextEncoder().encode((textOrg.length > MAXLEN)?textOrg.slice(0,MAXLEN):textOrg);
          const len = text.length;
          new Uint8Array(memory.buffer,heapBase+BASE64_PTR,len).set(text);

          outLen = base64Wsm.exports.base64Decode(TEXT_PTR,BASE64_PTR,len);

          textBox.value = new TextDecoder().decode(new Uint8Array(memory.buffer,heapBase+TEXT_PTR,outLen));
        }
      });

      const params = new URLSearchParams(window.location.search);
      if(params.has('text')){
        textBox.value = params.get('text');
        textBox.dispatchEvent(new Event('input',{ bubbles: true }));
      }
      if(params.has('base64')){
        base64Box.value = params.get('base64');
        base64Box.dispatchEvent(new Event('input',{ bubbles: true }));
      }
    }
  }

  (async ()=>{
    const {instance} = await WebAssembly.instantiateStreaming(await fetch('/import/scripts/conditional/base64.wasm'), { env: { memory } });
    base64Wsm = instance;
    
    if(document.readyState == "loading"){
      document.addEventListener("DOMContentLoaded", listenerOn);
    } else listenerOn();
  })();
}

document.addEventListener("DOMContentLoaded",()=>{
  const textBox = document.getElementById('text-box'), base64Box = document.getElementById('base64-box');

  document.getElementById('text-copy').addEventListener('click',()=>{
    if(textBox.value){ navigator.clipboard.writeText(textBox.value); }
  });
  document.getElementById('text-paste').addEventListener('click',()=>{
    (async ()=>{
      const paste = await navigator.clipboard.readText();
      textBox.value = paste;
      textBox.dispatchEvent(new Event('input',{ bubbles: true }));
    })();
  });
  document.getElementById('text-delete').addEventListener('click',()=>{
    textBox.value = "";
    textBox.focus();
  });
  document.getElementById('base64-copy').addEventListener('click',()=>{
    if(base64Box.value){ navigator.clipboard.writeText(base64Box.value); }
  });
  document.getElementById('base64-paste').addEventListener('click',()=>{
    (async ()=>{
      const paste = await navigator.clipboard.readText();
      base64Box.value = paste;
      base64Box.dispatchEvent(new Event('input',{ bubbles: true }));
    })();
  });
  document.getElementById('base64-delete').addEventListener('click',()=>{
    base64Box.value = "";
    base64Box.focus();
  });
});