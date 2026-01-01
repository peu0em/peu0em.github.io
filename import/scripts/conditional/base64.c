#define WASM_EXPORT __attribute__((visibility("default")))

extern unsigned char __heap_base;
const char base64Table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

WASM_EXPORT unsigned char* getHeapBase(){ return (unsigned char*)&__heap_base; }

WASM_EXPORT unsigned int base64Encode(int outPtr, int inPtr, int len){
  unsigned char* memory = (unsigned char*)&__heap_base;
  char* out = (char*)(memory + outPtr);
  unsigned int count,outCount=0;
  int c0, c1, c2;
  for(count = 0; count+2<len; count+=3){
    c0 = memory[inPtr+count], c1 = memory[inPtr+count+1], c2= memory[inPtr+count+2];
    out[outCount] = base64Table[(c0 >> 2) & 63];
    out[outCount+1] = base64Table[(c0 & 3) << 4 | (c1 >> 4) & 15];
    out[outCount+2] = base64Table[(c1 & 15) << 2 | (c2 >> 6) & 3];
    out[outCount+3] = base64Table[(c2 & 63)];
    outCount += 4;
  }
  if(count < len){
    c0 = memory[inPtr+count];
    out[outCount] = base64Table[(c0 >> 2) & 63];
    if(count+1 < len){
      c1 = memory[inPtr+count+1];
      out[outCount+1] = base64Table[(c0 & 3) << 4 | (c1 >> 4) & 15];
      out[outCount+2] = base64Table[(c1 & 15) << 2];
      out[outCount+3] = '=';
    } else{
      out[outCount+1] = base64Table[(c0 & 3) << 4];
      out[outCount+2] = '=';
      out[outCount+3] = '=';
    }
    outCount += 4;
  }
  out[outCount] = '\0';
  return outCount;
}

WASM_EXPORT unsigned int base64Decode(int outPtr, int inPtr, int len){
  unsigned char* memory = (unsigned char*)&__heap_base;
  if(len%4 != 0){
    return 0;
  } else{
    unsigned char deTable[256];
    for(int tN=0; tN<64; tN++) deTable[(unsigned char)base64Table[tN]] = tN;
    deTable['='] = 255;

    char* out = (char*)(memory + outPtr);
    unsigned int count,outCount;
    int c0,c1,c2,c3;
    for(count = 0; count<len-4; count+=4){
      outCount = count/4*3;
      c0 = deTable[(unsigned char)memory[inPtr+count]], c1 = deTable[(unsigned char)memory[inPtr+count+1]], c2 = deTable[(unsigned char)memory[inPtr+count+2]], c3 = deTable[(unsigned char)memory[inPtr+count+3]];
      out[outCount] = (c0 << 2) | (c1 >> 4);
      out[outCount+1] = ((c1 & 15) << 4) | (c2 >> 2);
      out[outCount+2] = ((c2 & 3) << 6) | c3;
    }
    outCount = count/4*3;
    c0 = deTable[(unsigned char)memory[inPtr+count]], c1 = deTable[(unsigned char)memory[inPtr+count+1]], c2 = deTable[(unsigned char)memory[inPtr+count+2]], c3 = deTable[(unsigned char)memory[inPtr+count+3]];
    out[outCount] = c0 << 2;
    if(c1 != 255){
      out[outCount] |= c1 >> 4;
      out[outCount+1] = ((c1 & 15) << 4);
      if(c2 != 255){
        out[outCount+1] |= (c2 >> 2);
        out[outCount+2] = (c2 & 3) << 6;
        if(c3 != 255){
          out[outCount+2] |= c3;
          out[outCount+3] = '\0';
          return outCount+2;
        } else{
            out[outCount+3] = '\0';
            return outCount+2;
        }
      } else{ 
        out[outCount+2] = '\0';
        return outCount+1;
      }
    } else{
       out[outCount+1] = '\0';
       return outCount;
    }
  }
}