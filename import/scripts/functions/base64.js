const MAXLEN = 100000;
const memory = new WebAssembly.Memory({ initial: 5 });
const TEXT_PTR = 1024, BASE64_PTR = TEXT_PTR + MAXLEN;
let base64Wsm;

function listenerOn(){
  const encodeBox = document.getElementById('encode-box'), decodeBox = document.getElementById('decode-box');
  if(base64Wsm){
    const heapBase = base64Wsm.exports.getHeapBase()?base64Wsm.exports.getHeapBase():0;
    encodeBox.addEventListener('input',()=>{
      let textOrg = encodeBox.value;
      if(textOrg.length > 0){
        const text = new TextEncoder().encode((textOrg.length > MAXLEN)?textOrg.slice(0,MAXLEN):textOrg);
        const len = text.length;
        new Uint8Array(memory.buffer,heapBase+TEXT_PTR,len).set(text);

        decodeBox.value = new TextDecoder().decode(new Uint8Array(memory.buffer,heapBase+BASE64_PTR,base64Wsm.exports.base64Encode(BASE64_PTR,TEXT_PTR,len)));
      }
    });
    decodeBox.addEventListener('input',()=>{
      let textOrg = decodeBox.value;
      if(textOrg.length > 0){
        const text = new TextEncoder().encode((textOrg.length > MAXLEN)?textOrg.slice(0,MAXLEN):textOrg);
        const len = text.length;
        new Uint8Array(memory.buffer,heapBase+BASE64_PTR,len).set(text);

        outLen = base64Wsm.exports.base64Decode(TEXT_PTR,BASE64_PTR,len);

        encodeBox.value = new TextDecoder().decode(new Uint8Array(memory.buffer,heapBase+TEXT_PTR,outLen));
      }
    });
  }
}

(async ()=>{
  const {instance} = await WebAssembly.instantiateStreaming(await fetch('/import/scripts/functions/base64.wasm'), { env: { memory } });
  base64Wsm = instance;
  
  if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", listenerOn);
  } else listenerOn();
})();

