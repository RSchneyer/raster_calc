function calc(path){
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

    var triObj = {p0:[x0,y0],p1:[x1,y1],p2:[x2,y2]};

    document.getElementById("ib").innerHTML = isInBounds(triObj, [xp, yp]);

    findSubAreas(triObj, [xp,yp]);
    findC7sandC8s(triObj, [xp,yp]);

    var p0_data = {coords:[x0, y0], colors:[r0, g0, b0, 255]};
    var p1_data = {coords:[x1, y1], colors:[r1, g1, b1, 255]};
    var p2_data = {coords:[x2, y2], colors:[r2, g2, b2, 255]};
    var p_data  = {coords:[xp, yp]};
    draw(path, p0_data, p1_data, p2_data, p_data);
}
function toFixedPoint(data){
    return Math.floor(Math.round(data * Math.pow(2, 16))).toString(2); 
}
function draw(drawP, p0Obj, p1Obj, p2Obj, pObj){
    var canvas = document.getElementById("canvas");
    var triangle = new Triangle(p0Obj.coords, p1Obj.coords, p2Obj.coords);
    triangle[0].color = p0Obj.colors;
    triangle[1].color = p1Obj.colors;
    triangle[2].color = p2Obj.colors;
    var triangleGradient = function(point) {
        var DEFAULTCOLOR = [0, 0, 0, 0];
        var ret = [0, 0, 0, 0];

        for (var i = 0; i < 3; i++) {
            var v1 = triangle.edges[i][0];
            var v2 = triangle.edges[i][1];
            var v3 = triangle[i];
            var isect = intersectLines(v1, v2, v3, point);

            if (isect) {
                var pointVertexDist = distance(point, v3);
                var isectVertexDist = distance(isect, v3);

                if (pointVertexDist <= isectVertexDist) {
                    var lerpFac = 1 - pointVertexDist /
                        isectVertexDist;

                    for (var j = 0; j < ret.length; j++) {
                        ret[j] += v3.color[j] * lerpFac;
                    }
                } else {
                    return DEFAULTCOLOR;
                }
            } else {
                return DEFAULTCOLOR;
            }
        }

        return ret;
    }
    process(canvas, triangleGradient, pObj);
    if(drawP){
        drawPath({p0:p0Obj.coords, p1:p1Obj.coords, p2:p2Obj.coords});
    }
}

function findSubAreas(triangleObj, testPoint){
    var ap0 = areaFromPoints(triangleObj.p0, triangleObj.p1, testPoint);
    var ap1 = areaFromPoints(triangleObj.p1,triangleObj.p2,testPoint);
    var ap2 = areaFromPoints(triangleObj.p2,triangleObj.p0,testPoint);

    document.getElementById("a_p0").innerHTML = ap0;
    document.getElementById("a_p1").innerHTML = ap1;
    document.getElementById("a_p2").innerHTML = ap2;
}
function findC7sandC8s(triangleObj, testPoint){
    var C7_0 = triangleObj.p0[1] - triangleObj.p1[1];
    var C7_1 = triangleObj.p1[1] - triangleObj.p2[1];
    var C7_2 = triangleObj.p2[1] - triangleObj.p0[1];

    document.getElementById("c7_0").innerHTML = C7_0;
    document.getElementById("c7_1").innerHTML = C7_1;
    document.getElementById("c7_2").innerHTML = C7_2;

    var C8_0 = triangleObj.p1[0] - triangleObj.p0[0];
    var C8_1 = triangleObj.p2[0] - triangleObj.p1[0];
    var C8_2 = triangleObj.p0[0] - triangleObj.p2[0];

    document.getElementById("c8_0").innerHTML = C8_0;
    document.getElementById("c8_1").innerHTML = C8_1;
    document.getElementById("c8_2").innerHTML = C8_2;
}