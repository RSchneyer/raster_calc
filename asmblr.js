var INSTR_DATA = {as_hex:"", as_bin:"",
    "nop":{               as_hex:"00", as_bin:"0000 0000", arg_count:0, is_weird:false,},
    "swizzle":{           as_hex:"01", as_bin:"0000 0001", arg_count:3, is_weird:true,},
    "ldilo":{             as_hex:"02", as_bin:"0000 0010", arg_count:2, is_weird:false,},
    "ldihi":{             as_hex:"03", as_bin:"0000 0011", arg_count:2, is_weird:false,},
    "ld":{                as_hex:"04", as_bin:"0000 0100", arg_count:2, is_weird:true,},
    "st":{                as_hex:"05", as_bin:"0000 0101", arg_count:2, is_weird:true,},
    "infifo":{            as_hex:"06", as_bin:"0000 0110", arg_count:2, is_weird:false,},
    "outfifo":{           as_hex:"07", as_bin:"0000 0111", arg_count:2, is_weird:false,},
    "insert":{            as_hex:"0",  as_bin:"0000 10",   arg_count:4, is_weird:true,},
    "interleavelo":{      as_hex:"0C", as_bin:"0000 1100", arg_count:3, is_weird:false,},
    "interleavehi":{      as_hex:"0D", as_bin:"0000 1101", arg_count:3, is_weird:false,},
    "interleavelopairs":{ as_hex:"0E", as_bin:"0000 1110", arg_count:3, is_weird:false,},
    "interleavehipairs":{ as_hex:"0F", as_bin:"0000 1111", arg_count:3, is_weird:false,},
    "add":{               as_hex:"10", as_bin:"0001 0000", arg_count:3, is_weird:false,},
    "sub":{               as_hex:"11", as_bin:"0001 0001", arg_count:3, is_weird:false,},
    "and":{               as_hex:"18", as_bin:"0001 1000", arg_count:3, is_weird:false,},
    "or":{                as_hex:"19", as_bin:"0001 1001", arg_count:3, is_weird:false,},
    "xor":{               as_hex:"1A", as_bin:"0001 1010", arg_count:3, is_weird:false,},
    "shl":{               as_hex:"1C", as_bin:"0001 1100", arg_count:3, is_weird:false,},
    "shr":{               as_hex:"1D", as_bin:"0001 1101", arg_count:3, is_weird:false,},
    "sar":{               as_hex:"1E", as_bin:"0001 1110", arg_count:3, is_weird:false,},
    "fadd":{              as_hex:"20", as_bin:"0010 0000", arg_count:3, is_weird:false,},
    "fsub":{              as_hex:"21", as_bin:"0010 0001", arg_count:3, is_weird:false,},
    "fmul":{              as_hex:"22", as_bin:"0010 0010", arg_count:3, is_weird:false,},
    "fdiv":{              as_hex:"23", as_bin:"0010 0011", arg_count:3, is_weird:false,},
    "fneg":{              as_hex:"24", as_bin:"0010 0100", arg_count:2, is_weird:false,},
    "fsqrt":{             as_hex:"25", as_bin:"0010 0101", arg_count:2, is_weird:false,},
    "fmax":{              as_hex:"26", as_bin:"0010 0110", arg_count:3, is_weird:false,},
    "fpow":{              as_hex:"28", as_bin:"0010 1000", arg_count:3, is_weird:false,},
    "done":{              as_hex:"FF", as_bin:"1111 1111", arg_count:0, is_weird:false,}
}




function assembleInstruction(){
    var instr_str = document.getElementById("instr").value;
    var name = instr_str.split(' ')[0];             // Grab up to first space
    var first_space_index = instr_str.indexOf(" "); // and its index

    var first_comma_index = instr_str.indexOf(",");
    var first_arg = instr_str.substring(first_space_index+1, first_comma_index);

    var second_comma_index = instr_str.indexOf(",", first_comma_index+1);
    var second_arg = instr_str.substring(first_comma_index+2, second_comma_index)
    var final_arg = instr_str.substring(second_comma_index+2);
    
    var instr_data = INSTR_DATA[name.toLowerCase()];
    var curr_instr_hex = instr_data.as_hex;
    var curr_instr_bin = instr_data.as_bin;


    if(!is_insert(instr_data)){ // insert instruction is a whole thing
        if(instr_data.arg_count == 0){ // nop and done
            curr_instr_hex += " 00 00 00";
            curr_instr_bin += " 0000 0000 0000 0000 0000 0000";
        }
        else if(instr_data.arg_count == 2){
            if(!instr_data.is_weird){
                var first_arg_num = parseInt(first_arg.match(/\d/g)[0], 10);
                console.log("hea dfasd ",dec2bin(first_arg_num));
                curr_instr_bin += " "+dec2bin(first_arg_num);
            }
            else {

            }
        }
    }





    console.log(instr_data);
    console.log(name);
    console.log(first_arg);
    console.log(second_arg);
    console.log(final_arg);

    document.getElementById("instr_hex").textContent = curr_instr_hex;
    document.getElementById("instr_bin").textContent = curr_instr_bin;
}



function dec2bin(dec){
    var bin_arr = (dec>>>0).toString(2).padStart(8,'0').split("") // array of 8 strings
    bin_arr.splice(4,0," "); // insert a space after 4 elemnts
    return bin_arr.join('');
}
function is_insert(instr){ return instr.arg_count == 4; }