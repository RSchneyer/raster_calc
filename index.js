

// var c1   = ((x1 - x0)*(y2 - y0)) - ((y1 - y0)*(x2 - x0));

// var c2_r = ((p1_r - p0_r)*(y2 - y0)) - ((y1 - y0)*(p2_r - p0_r));
// var c2_g = ((p1_g - p0_g)*(y2 - y0)) - ((y1 - y0)*(p2_g - p0_g));
// var c2_b = ((p1_b - p0_b)*(y2 - y0)) - ((y1 - y0)*(p2_b - p0_b));

// var c3_r = ((x1 - x0)*(p2_r - p0_r)) - ((p1_r - p0_r)*(x2 - x0));
// var c3_g = ((x1 - x0)*(p2_g - p0_g)) - ((p1_g - p0_g)*(x2 - x0));
// var c3_b = ((x1 - x0)*(p2_b - p0_b)) - ((p1_b - p0_b)*(x2 - x0));

// var c4 = 1/c1;

// var c5 = c2 * c4;
// var c6 = c3 * c4;




function calc(){
    var x0 = parseFloat(document.getElementById("x0").value);
    var y0 = parseFloat(document.getElementById("y0").value);
    var r0 = parseFloat(document.getElementById("r0").value);
    var g0 = parseFloat(document.getElementById("g0").value);
    var b0 = parseFloat(document.getElementById("b0").value);

    var x1 = parseFloat(document.getElementById("x1").value);
    var y1 = parseFloat(document.getElementById("y1").value);
    var r1 = parseFloat(document.getElementById("r1").value);
    var g1 = parseFloat(document.getElementById("g1").value);
    var b1 = parseFloat(document.getElementById("b1").value);

    var x2 = parseFloat(document.getElementById("x2").value);
    var y2 = parseFloat(document.getElementById("y2").value);
    var r2 = parseFloat(document.getElementById("r2").value);
    var g2 = parseFloat(document.getElementById("g2").value);
    var b2 = parseFloat(document.getElementById("b2").value);

    var xp = parseFloat(document.getElementById("xp").value);
    var yp = parseFloat(document.getElementById("yp").value);

    var c1   = ((x1 - x0)*(y2 - y0)) - ((y1 - y0)*(x2 - x0));
    document.getElementById("c1").innerHTML = c1;

    var c2_r = ((r1 - r0)*(y2 - y0)) - ((y1 - y0)*(r2 - r0));
    var c2_g = ((g1 - g0)*(y2 - y0)) - ((y1 - y0)*(g2 - g0));
    var c2_b = ((b1 - b0)*(y2 - y0)) - ((y1 - y0)*(b2 - b0));
    document.getElementById("c2_r").innerHTML = c2_r;
    document.getElementById("c2_g").innerHTML = c2_g;
    document.getElementById("c2_b").innerHTML = c2_b;

    var c3_r = ((x1 - x0)*(r2 - r0)) - ((r1 - r0)*(x2 - x0));
    var c3_g = ((x1 - x0)*(g2 - g0)) - ((g1 - g0)*(x2 - x0));
    var c3_b = ((x1 - x0)*(b2 - b0)) - ((b1 - b0)*(x2 - x0));
    document.getElementById("c3_r").innerHTML = c3_r;
    document.getElementById("c3_g").innerHTML = c3_g;
    document.getElementById("c3_b").innerHTML = c3_b;

    var c4 = 1/c1;
    document.getElementById("c4").innerHTML = c4;

    var c5_r = c2_r * c4;
    var c5_g = c2_g * c4;
    var c5_b = c2_b * c4;
    document.getElementById("c5_r").innerHTML = c5_r;
    document.getElementById("c5_g").innerHTML = c5_g;
    document.getElementById("c5_b").innerHTML = c5_b;

    var c6_r = c3_r * c4;
    var c6_g = c3_g * c4;
    var c6_b = c3_b * c4;
    document.getElementById("c6_r").innerHTML = c6_r;
    document.getElementById("c6_g").innerHTML = c6_g;
    document.getElementById("c6_b").innerHTML = c6_b;

    var c7 = (y0 - y1);
    var c8 = (x0 - x1);
    document.getElementById("c7").innerHTML = c7;
    document.getElementById("c8").innerHTML = c8;

    var p_r = ((xp - x0)*c5_r) + ((yp - y0)*c6_r) + r0;
    var p_g = ((xp - x0)*c5_g) + ((yp - y0)*c6_g) + g0;
    var p_b = ((xp - x0)*c5_b) + ((yp - y0)*c6_b) + b0;

    document.getElementById("p_r").innerHTML = p_r;
    document.getElementById("p_g").innerHTML = p_g;
    document.getElementById("p_b").innerHTML = p_b;

    var p_hex = "#"+Math.round(p_r).toString(16) + Math.round(p_g).toString(16) + Math.round(p_b).toString(16);
    console.log(p_hex);
    document.getElementById("calc").style.background = p_hex;

    var a = (((x0 - x2)*(y1 - y2)) - ((x1 - x2)*(y0 - y2)))/2;
    document.getElementById("a").innerHTML = a;

    var a_p = (((x0 - xp)*(y1 - yp)) - ((x1 - x2)*(y0 - yp)))/2;
    document.getElementById("a_p").innerHTML = a_p;
    
    var ib = (a*a_p > 0);
    // document.getElementById("ib").innerHTML = ib;


}


