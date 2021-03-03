const toInt16 = createToInt(16);

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

    document.getElementById("text_hex").innerHTML = "0x" + assembleTexture();
    document.getElementById("norm_hex").innerHTML = "0x" + assembleNormal();
    document.getElementById("color_hex").innerHTML = "0x" + assembleColor(colorData);
    document.getElementById("pos_hex").innerHTML = "0x" + assemblePosition(posData);

    document.getElementById("axi").innerHTML = "0x" + assembleTexture() + assembleNormal() + assembleColor(colorData) + assemblePosition(posData);
    document.getElementById("axi_readable").innerHTML = "0x" + assembleTexture() + "_" + assembleNormal() + "_" + assembleColor(colorData) + "_" + assemblePosition(posData);


}

function assembleTexture(){
    return "00000000000000000000000000000000";
}
function assembleNormal(){
    return "00000000000000000000000000000000";
}
// [r,g,b,a]
function assembleColor(colorData){
    var retstring="";
    console.log(colorData);
    var r_hex = convertColor(colorData[0]);
    var g_hex = convertColor(colorData[1]);
    var b_hex = convertColor(colorData[2]);
    var a_hex = convertColor(colorData[3]);
    var hex_arr = [a_hex,b_hex,g_hex,r_hex];
    hex_arr.forEach(function(val){
        console.log(val);
        retstring += "_"+val;
    });
    console.log(retstring);
    return retstring;
}
// [w,z,y,x]
function assemblePosition(posData){
    var retstring="";
    var w_hex = converPosition(posData[0]);
    var x_hex = converPosition(posData[1]);
    var y_hex = converPosition(posData[2]);
    var z_hex = converPosition(posData[3]);
    
    var hex_arr = [w_hex,z_hex,y_hex,x_hex];
    hex_arr.forEach(function(val){
        console.log(val);
        retstring += "_"+val;
    });
    return retstring;
}
//0-255 to q16.16
function convertColor(color){
    var floatVal = parseFloat(color)/255;
    var hex_int = toInt16(Math.floor(floatVal)).toString(16);
    var hex_dec = Math.floor(((floatVal % 1) * 65536)).toString(16);
    var hex_q16_16 = hex_int.padStart(4,"0") + hex_dec.padStart(4,"0");
    console.log(hex_q16_16);
    return hex_q16_16;
}
//-1 to 1 to q16.16
function converPosition(pos){
    var floatVal = parseFloat(pos);
    var hex_int = toInt16(Math.floor(floatVal)).toString(16);
    var hex_dec = Math.floor(((Math.abs(floatVal) % 1) * 65536)).toString(16);
    var hex_q16_16 = hex_int.padStart(4,"0") + hex_dec.padStart(4,"0");
    console.log(hex_q16_16);
    return hex_q16_16;
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