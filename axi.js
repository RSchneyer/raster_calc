const toInt16 = createToInt(16);
const toInt20 = createToInt(20);

function assembleData(){
    var colorData = [
        document.getElementById('r').value,
        document.getElementById('g').value,
        document.getElementById('b').value,
        document.getElementById('a').value
    ];
    var posData = [
        document.getElementById('w').value,
        document.getElementById('x').value,
        document.getElementById('y').value,
        document.getElementById('z').value
    ];
    var rastPosData = [
        document.getElementById('w').value,
        viewportX(document.getElementById('x').value),
        viewportY(document.getElementById('y').value),
        document.getElementById('z').value
    ];

    document.getElementById("vp_text_hex").innerHTML = "0x" + assembleTexture(true);
    document.getElementById("vp_norm_hex").innerHTML = "0x" + assembleNormal(true);
    document.getElementById("vp_color_hex").innerHTML = "0x" + assembleColor(colorData, true);
    document.getElementById("vp_pos_hex").innerHTML = "0x" + assemblePosition(posData, true);

    document.getElementById("vp_axi").innerHTML = "0x" + assembleTexture() + assembleNormal() + assembleColor(colorData) + assemblePosition(posData);
    document.getElementById("vp_axi_readable").innerHTML = "0x" + assembleTexture(true) + "__" + assembleNormal(true) + "__" + assembleColor(colorData, true) + "__" + assemblePosition(posData, true);

    document.getElementById("rast_x").innerHTML = viewportX(document.getElementById('x').value);
    document.getElementById("rast_y").innerHTML = viewportY(document.getElementById('y').value);
    document.getElementById("rast_text_hex").innerHTML = "0x" + assembleTexture(true);
    document.getElementById("rast_norm_hex").innerHTML = "0x" + assembleNormal(true);
    document.getElementById("rast_color_hex").innerHTML = "0x" + assembleColor(colorData, true);
    document.getElementById("rast_pos_hex").innerHTML = "0x" + assemblePosition(rastPosData, true);

    document.getElementById("rast_axi").innerHTML = "0x" + assembleTexture() + assembleNormal() + assembleColor(colorData) + assemblePosition(posData);
    document.getElementById("rast_axi_readable").innerHTML = "0x" + assembleTexture(true) + "__" + assembleNormal(true) + "__" + assembleColor(colorData, true) + "__" + assemblePosition(posData, true);
}

function assembleTexture(pretty){
    if(pretty != true){
        return "00000000000000000000000000000000";
    }else{
        return "00000000_00000000_00000000_00000000";
    }
}
function assembleNormal(pretty){
    if(pretty != true){
        return "00000000000000000000000000000000";
    }else{
        return "00000000_00000000_00000000_00000000";
    }
}
// [r,g,b,a]
function assembleColor(colorData, pretty){
    var retstring="";
    console.log("Color:");
    console.log(colorData);
    var r_hex = convertColor(colorData[0]);
    var g_hex = convertColor(colorData[1]);
    var b_hex = convertColor(colorData[2]);
    var a_hex = convertColor(colorData[3]);
    var hex_arr = [a_hex,b_hex,g_hex,r_hex];
    
    if(pretty != true){
        hex_arr.forEach(function(val){
            retstring += val;
        });
    }else{
        retstring += a_hex + "_" + b_hex + "_" + g_hex + "_" + r_hex;
    }
    console.log(retstring);
    return retstring;
}
// [w,z,y,x]
function assemblePosition(posData, pretty){
    var retstring="";
    console.log("Position:");
    console.log(posData);
    var w_hex = converPosition(posData[0]);
    var x_hex = converPosition(posData[1]);
    var y_hex = converPosition(posData[2]);
    var z_hex = converPosition(posData[3]);
    
    var hex_arr = [w_hex,z_hex,y_hex,x_hex];
    if(pretty != true){
        hex_arr.forEach(function(val){
            retstring += val;
        });
    }else{
        retstring += w_hex + "_" + z_hex + "_" + y_hex + "_" + x_hex;
    }
    console.log(retstring);
    return retstring;
}
//0-255 to q16.16
function convertColor(color){
    var floatVal = parseFloat(color)/255;
    var hex_int = toInt16(Math.floor(floatVal)).toString(16);
    var hex_dec = Math.floor(((floatVal % 1) * 65536)).toString(16);
    var hex_q16_16 = hex_int.padStart(4,"0") + hex_dec.padStart(4,"0");
    return hex_q16_16;
}
//-1 to 1 to q16.16
function converPosition(pos){
    var floatVal = parseFloat(pos);
    
    var floatToInt = Math.trunc(floatVal * 65536);
    var hex_q16_16;
    if(floatVal >= 0){
        hex_q16_16 = floatToInt.toString(16);
    }else{
        var t1 = "fff";
        var temp = (-1 * Math.trunc((Math.abs(floatVal) % 1) * 65536));
        //Int20 to get around Int16 overflowing
        var t2 = toInt20(temp).toString(16).padStart(5, "0");
        //check special -1 case
        hex_q16_16 = (floatVal == -1) ? "ffff0000" : t1 + t2;
    }
    return hex_q16_16.padStart(8, "0");
}

function viewportX(x){
    return (1920/2 * (parseFloat(x)+1)+0).toString();
}

function viewportY(y){
    return (1080/2 * (parseFloat(y)+1)+0).toString();
}

// to deal with two's compliment
function createToInt(size) {
    if (size < 2) {
        throw new Error('Minimum size is 2');
    }
    else if (size > 64) {
        throw new Error('Maximum size is 64');
    }

    // Determine value range
    const maxValue = (1 << (size - 1)) - 1;
    const minValue = -maxValue - 1;

    return (value) => {
        if (value > maxValue || value < minValue) {
            console.warn(maxValue);
            console.warn(minValue);
            console.warn(value);
            throw new Error(`Int${size} overflow`);
        }

        if (value < 0) {
            return (1 << size) + value;
        }
        else {
            return value;
        }
    };
}