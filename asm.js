var ISA_DATA =  {
    "00":{name:"nop", psuedoCode:function(){return "Do Nothing."}, desc:"No Operation"},
    "01":{name:"swizzle", psuedoCode:function(vd, va, l0,l1,l2,l3){return `v${vd} =  {${va}.${l0}, ${va}.${l1}, ${va}.${l2}, ${va}.${l3}`}, desc:"Shuffle (permute) lanes of va and store in vd."},
    "02":{name:"ldilo", psuedoCode:function(vd, imm){return `v${vd} = {${imm},${imm},${imm},${imm}}`}, desc:"Load zero-extended immediate i into all lanes of vd"},
    "03":{name:"ldihi", psuedoCode:function(vd, imm){return `v${vd} = WIP`}, desc:"Load immediate i<<16 into all lanes of vd."},
    "04":{name:"ld", psuedoCode:function(vd, va, imm){return `v${vd}[0] = Mem[v${va}[0] + ${imm}]`}, desc:"Load 32-bit word from data memory"},
    "05":{name:"st", psuedoCode:function(va, imm, vb){return `Mem[v${va}[0] + ${imm}] = v${vb}[0]`}, desc:"Store 32-bit word to data memory."},
    "06":{name:"infifo", psuedoCode:function(vd, b){return `v${vd}[0] = InFIFO[${b}]`}, desc:"Load 32-bit word from input FIFO"},
    "07":{name:"outfifo", psuedoCode:function(vb, d){return `OutFIFO[${d}] = v${vb}[0]`}, desc:"Store 32-bit word to output FIFO."},
    "08":{name:"insert", psuedoCode:function(vd, vb, va){return `v${vd} = {${vb}.x, ${va}.y, ${va}.z, ${va}.w}`}, desc:"Insert lane i from vb into va"},
    "09":{name:"insert", psuedoCode:function(vd, vb, va){return `v${vd} = {${va}.x, ${vb}.x, ${va}.z, ${va}.w}`}, desc:"Insert lane i from vb into va"},
    "0A":{name:"insert", psuedoCode:function(vd, vb, va){return `v${vd} = {${va}.x, ${va}.y, ${vb}.x, ${va}.w}`}, desc:"Insert lane i from vb into va"},
    "0B":{name:"insert", psuedoCode:function(vd, vb, va){return `v${vd} = {${va}.x, ${va}.y, ${va}.z, ${vb}.x}`}, desc:"Insert lane i from vb into va"},
    "0C":{name:"interleavelo", psuedoCode:function(vd, va, vb){return `v${vd} = {v${va}.x, v${vb}.x, v${va}.y, v${vb}.y}`}, desc:"Interleave the low lanes of va and vb"},
    "0D":{name:"interleavehi", psuedoCode:function(vd, va, vb){return `v${vd} = {v${va}.z, v${vb}.z, v${va}.w, v${vb}.w}`}, desc:"Interleave the high lanes of va and vb."},
    "0E":{name:"interleavelopairs", psuedoCode:function(vd, va, vb){return `v${vd} = {v${va}.x, v${va}.y, v${vb}.x, v${vb}.y}`}, desc:"Interleave the low lane-pairs of va and vb"},
    "0F":{name:"interleavehipairs", psuedoCode:function(vd, va, vb){return `v${vd} = {v${va}.z, v${va}.w, v${vb}.z, v${vb}.w}`}, desc:"Interleave the high lane-pairs of va and vb."},
    "10":{name:"add", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = v${va}.{xyzw} + v${vb}.{xyzw}`}, desc:"Integer add lanes of va and lanes of vb"},
    "11":{name:"sub", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = v${va}.{xyzw} - v${vb}.{xyzw}`}, desc:"Integer subtract lanes of vb from lanes of va."},
    "18":{name:"and", psuedoCode:function(vd, va, vb){return `v${vd} = v${va} & v${vb}`}, desc:"Bitwise AND of va with vb."},
    "19":{name:"or",  psuedoCode:function(vd, va, vb){return `v${vd} = v${va} | v${vb}`}, desc:"Bitwise OR of va with vb."},
    "1A":{name:"xor", psuedoCode:function(vd, va, vb){return `v${vd} = v${va} ^ v${vb}`}, desc:"Bitwise XOR of va with vb."},
    "1C":{name:"shl", psuedoCode:function(vd, va, vb){return `v${vd} = v${va}.x << v${vb}.x, v${va}.y << v${vb}.y, v${va}.z << v${vb}.z, v${va}.w << v${vb}.w`}, desc:"Shift-left lanes of va by lanes of vb."},
    "1D":{name:"shr", psuedoCode:function(vd, va, vb){return `v${vd} = v${va}.x >> v${vb}.x, v${va}.y >> v${vb}.y, v${va}.z >> v${vb}.z, v${va}.w >> v${vb}.w`}, desc:"Shift-right lanes of va by lanes of vb"},
    "1E":{name:"sar", psuedoCode:function(vd, va, vb){return `v${vd} = v${va}.x >> v${vb}.x, v${va}.y >> v${vb}.y, v${va}.z >> v${vb}.z, v${va}.w >> v${vb}.w`}, desc:"Shift-arithmetic-right lanes of va by lanes of vb"},
    "20":{name:"fadd", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = v${va}.{xyzw} + v${vb}.{xyzw}`}, desc:"Fixed-point (Q16.16) add lanes of va to lanes of vb. Note, should be equivalent to add."},
    "21":{name:"fsub", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = v${va}.{xyzw} - v${vb}.{xyzw}`}, desc:"Fixed-point (Q16.16) subtract lanes of vb from lanes of va. Note, should be equivalent to sub."},
    "22":{name:"fmul", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = v${va}.{xyzw} * v${vb}.{xyzw}`}, desc:"Fixed-point (Q16.16) multiply lanes of va by lanes of vb. Different truncation than integer multiplication"},
    "23":{name:"fdiv", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = v${va}.{xyzw} / v${vb}.{xyzw}`}, desc:"Fixed-point (Q16.16) divide lanes of va by lanes of vb. Different truncation than integer division."},
    "24":{name:"fneg", psuedoCode:function(vd, va){return `v${vd}.{xyzw} = -v${va}.{xyzw}`}, desc:"Negate lanes of va."},
    "25":{name:"fsqrt", psuedoCode:function(vd, va){return `v${vd}.{xyzw} = sqrt(v${va}.{xyzw})`}, desc:"Fixed-point (Q16.16) square root of lanes of va."},
    "26":{name:"fmax", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = max(v${va}.{xyzw}, v${vb}.{xyzw})`}, desc:"Select the maximum of each lane of va and vb."},
    "28":{name:"fpow", psuedoCode:function(vd, va, vb){return `v${vd}.{xyzw} = pow(v${va}.{xyzw}, v${vb}.{xyzw})`}, desc:"Fixed-point (Q16.16) raise va to the values of vb"},
    "FF":{name:"done", psuedoCode:function(){return "Program over, loop to start"}, desc:"Signal completion of the program."}
};
var binToVal = {"00":"x", "01":"y", "10":"z", "11":"w"};
var DOESNT_USE_ALL_3 = ["nop", 
                        "swizzle",
                        "ldilo",
                        "ldihi",
                        "infifo",
                        "outfifo",
                        "insert",
                        "fneg",
                        "fsqrt",
                        "done"];

function decodeInstruction(){
    var instrHex = document.getElementById("hex_instr").value.toUpperCase();
    if(instrHex.slice(0,2)==="0x"){
        instrHex = instrHex.slice(2);
    }
    console.log(instrHex);
    var instrBin = hex2bin(instrHex,32);
    var mnemonic = getInstructionMnemonic(instrHex);
    var instrString = instructionBuilder(instrHex);
    var psuedoCode = getPsuedoCode(instrHex);
    document.getElementById("mnemonic").innerHTML = mnemonic;
    document.getElementById("desc").innerHTML = ISA_DATA[instrHex.slice(0,2)].desc;
    document.getElementById("instr_str").innerHTML = instrString;
    document.getElementById("bin_rep").innerHTML = chunk(instrBin,4).join(" ");
    document.getElementById("psuedo").innerHTML = psuedoCode;
    console.log(psuedoCode);
    console.log(chunk(instrBin,4).join(" "));
    console.log(instrBin.length);
}

function instructionBuilder(instrHex){
    var psuedoCode = "";
    var instrMne = getInstructionMnemonic(instrHex);
    psuedoCode += (instrMne + " ");
    if(!DOESNT_USE_ALL_3.includes(instrMne)){
        if(instrMne != "ld" && instrMne != "st"){
            psuedoCode += "v"+getRegVal(1, instrHex)+", ";
            psuedoCode += "v"+getRegVal(2, instrHex)+", ";
            psuedoCode += "v"+getRegVal(3, instrHex);
        }
        else{
            if(instrMne === "ld"){
                psuedoCode += "v"+getRegVal(1, instrHex)+", ";
                psuedoCode += "[v"+getRegVal(2, instrHex)+ " + ";
                psuedoCode += getRegVal(3, instrHex) + "]";
            }
            else{// st
                psuedoCode += "[v"+getRegVal(2,instrHex)+" + ";
                psuedoCode += getRegVal(1, instrHex)+"], ";
                psuedoCode += "v"+getRegVal(3, instrHex);
            }
        }
    }
    else if(instrMne === "ldilo" || instrMne === "ldihi"){
        psuedoCode += "v"+getRegVal(1,instrHex)+", ";
        psuedoCode += hexToDec(instrHex.slice(4));
    }
    else if(instrMne === "swizzle"){
        psuedoCode += "v"+getRegVal(1, instrHex)+", v"+getRegVal(2,instrHex)+", ";
        psuedoCode += binToVal[hex2bin(instrHex[7], 4).slice(2)];
        psuedoCode += binToVal[hex2bin(instrHex[7], 4).slice(0,2)];
        psuedoCode += binToVal[hex2bin(instrHex[6], 4).slice(2)];
        psuedoCode += binToVal[hex2bin(instrHex[6], 4).slice(0,2)];
    }
    else if(instrMne === "infifo" || instrMne === "outfifo"){
        if(instrMne === "infifo"){
            psuedoCode += "v"+getRegVal(1, instrHex)+", "+getRegVal(3, instrHex);
        }
        else{
            psuedoCode += getRegVal(1, instrHex)+", v"+getRegVal(3, instrHex);
        }
    }
    else if(instrMne === "insert"){
        psuedoCode += "v"+getRegVal(1,instrHex)+", v"+getRegVal(2,instrHex)+", v"+getRegVal(3, instrHex)+", ";
        psuedoCode += binToVal[hex2bin(instrHex[1], 4).slice(2)];
    }
    else if(instrMne==="fneg" || instrMne === "fsqrt"){
        psuedoCode += "v"+getRegVal(1, instrHex)+", v"+getRegVal(2, instrHex);
    }
    return psuedoCode;
}

function getInstructionMnemonic(instrHex){
    var mnemonicHex = instrHex.slice(0,2);
    return ISA_DATA[mnemonicHex].name;
}
function getPsuedoCode(instrHex){
    var instrData = ISA_DATA[instrHex.slice(0,2)];
    var instrMne = instrData.name;
    if(!DOESNT_USE_ALL_3.includes(instrMne)){
        if(instrMne != "ld" && instrMne != "st"){
            return instrData.psuedoCode(getRegVal(1, instrHex), getRegVal(2, instrHex), getRegVal(3,instrHex));
        }
        else{
            if(instrMne === "ld"){
                return "WIP";
            }
            else{// st
                return "WIP";
            }
        }
    }
    return "WIP";
}
//regNum = 1: 2,4
//regNum = 2: 4, 6
//regNum = 3: 6, 8
function getRegVal(regNum, instrHex){
    var regHex = instrHex.slice(regNum*2, (regNum*2)+2);
    var regDecVal = hexToDec(regHex);
    return regDecVal;
}
function hexToDec(s) {
    var i, j, digits = [0], carry;
    for (i = 0; i < s.length; i += 1) {
        carry = parseInt(s.charAt(i), 16);
        for (j = 0; j < digits.length; j += 1) {
            digits[j] = digits[j] * 16 + carry;
            carry = digits[j] / 10 | 0;
            digits[j] %= 10;
        }
        while (carry > 0) {
            digits.push(carry % 10);
            carry = carry / 10 | 0;
        }
    }
    return digits.reverse().join('');
}
function hex2bin(hex, len){
    return (parseInt(hex, 16).toString(2)).padStart(len, '0');
}
function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret
};