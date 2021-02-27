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
    var r_hex = parseInt(colorData[0], 10).toString(16);
    var g_hex = parseInt(colorData[1], 10).toString(16);
    var b_hex = parseInt(colorData[2], 10).toString(16);
    var a_hex = parseInt(colorData[3], 10).toString(16);
    var hex_arr = [a_hex,b_hex,g_hex,r_hex];
    hex_arr.forEach(function(val){
        console.log(val.padStart(2,"0"));
        val = val.padStart(2,"0");
        console.log(val);
        retstring += val;
    });
    console.log(retstring);
    return retstring;
}
function assemblePosition(posData){
    var retstring="";
    var w_hex = parseInt(posData[0], 10).toString(16);
    var x_hex = parseInt(posData[1], 10).toString(16);
    var y_hex = parseInt(posData[2], 10).toString(16);
    var z_hex = parseInt(posData[3], 10).toString(16);
    
    var hex_arr = [w_hex,z_hex,y_hex,x_hex];
    hex_arr.forEach(function(val){
        val = val.padStart(2,"0")
        retstring += val;
    });
    return retstring;
}