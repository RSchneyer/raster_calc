// From: http://www.nixtu.info/2010/08/html5-canvas-gradients-triangle.html
function lerp(a, b, fac) {
    var ret = [];

    for (var i = 0; i < Math.min(a.length, b.length); i++) {
        ret[i] = a[i] * (1 - fac) + b[i] * fac;
    }

    return ret;
}

function intersectLines(a, b, c, d) {
    // http://www.ahristov.com/tutorial/geometry-games/intersection-lines.html
    var denum = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);

    if (denum == 0) {
        return null;
    }

    var xi = ((c.x - d.x) * (a.x * b.y - a.y * b.x) -
        (a.x - b.x) * (c.x * d.y - c.y * d.x)) / denum;
    var yi = ((c.y - d.y) * (a.x * b.y - a.y * b.x) -
        (a.y - b.y) * (c.x * d.y - c.y * d.x)) / denum;

    return new Point(xi, yi);
}

function project(target, initial, current) {
    var delta = initial.sub(target);

    if( (delta.x == 0) && (delta.y == 0) ) {
        return target;
    }

    var t = current.sub(target).mul(delta).div(delta.toDistSquared());

    return delta.mul(t.x + t.y).add(target);
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

function distance(a, b) {
    return a.sub(b).toDist();
}

function Triangle(p1, p2, p3) {
    this.init(p1, p2, p3);
}
Triangle.prototype = {
    init: function(p1, p2, p3) {
        // vertex access
        this[0] = new Point(p1[0], p1[1]);
        this[1] = new Point(p2[0], p2[1]);
        this[2] = new Point(p3[0], p3[1]);

        // edge access
        this.edges = [
            [this[1], this[2]],
            [this[0], this[2]],
            [this[0], this[1]]
        ];
    }
}

function Circle(location, radius) {
    this.init(location, radius);
}
Circle.prototype = {
    init: function(location, radius) {
        this.location = location? new Point(location[0], location[1]): new Point();
        this.radius = radius? radius: 1;
    },
    contains: function(p) {
        return p.sub(this.location).toDist() <= this.radius;
    },
    intersect: function(p1, p2) {
        // http://local.wasp.uwa.edu.au/~pbourke/geometry/sphereline/
        var dp = p2.sub(p1);
        var a = dp.toDistSquared();
        var b = 2 * (dp.x * (p1.x - this.location.x) +
            dp.y * (p1.y - this.location.y));
        var c = this.location.toDistSquared() + p1.toDistSquared() - 2 *
            (this.location.x * p1.x + this.location.y * p1.y) -
            this.radius * this.radius;

        var bb4ac = b * b - 4 * a * c;

        var epsilon = 0.0001;
        if (Math.abs(a) < epsilon || bb4ac < 0) {
            return [];
        }

        if (bb4ac == 0) {
            return [p2.sub(p1).mul(-b / (2 * a)).add(p1)];
        }

        var mu1 = (-b + Math.sqrt(bb4ac)) / (2 * a);
        var mu2 = (-b - Math.sqrt(bb4ac)) / (2 * a);

        return [p2.sub(p1).mul(mu1).add(p1), p2.sub(p1).mul(mu2).add(p1)]
    }
}

function Point(x, y) {
    this.init(x, y);
}
Point.prototype = {
    init: function(x, y) {
        this.x = x? x: 0;
        this.y = y? y: 0;
    },
    add: function(other) {
        return this._operationTemplate(other, function(a, b) {return a + b});
    },
    sub: function(other) {
        return this._operationTemplate(other, function(a, b) {return a - b});
    },
    mul: function(other) {
        return this._operationTemplate(other, function(a, b) {return a * b});
    },
    div: function(other) {
        return this._operationTemplate(other, function(a, b) {return a / b});
    },
    ceil: function() {
        return this._operationTemplate(null, function(a) {return Math.ceil(a)});
    },
    floor: function() {
        return this._operationTemplate(null, function(a) {return Math.floor(a)});
    },
    round: function() {
        return this._operationTemplate(null, function(a) {return Math.round(a)});
    },
    _operationTemplate: function(other, op) {
        if(isNumber(other)) {
            return new Point(op(this.x, other), op(this.y, other));
        }

        if(other == null) {
            return new Point(op(this.x), op(this.y));
        }

        return new Point(op(this.x, other.x), op(this.y, other.y));
    },
    toDist: function() {
        return Math.sqrt(this.toDistSquared());
    },
    toDistSquared: function() {
        return this.x * this.x + this.y * this.y;
    },
    normalize: function() {
        return this.div(this.toDist());
    },
    invert: function() {
        return new Point(-this.x, -this.y);
    },
    closest: function(points) {
        return this._findTemplate(points,
            function() {
                return Number.MAX_VALUE;
            },
            function(dist, recordDist) {
                return dist < recordDist;
            }
        );
    },
    farthest: function(points) {
        return this._findTemplate(points,
            function() {
                return 0;
            },
            function(dist, recordDist) {
                return dist > recordDist;
            }
        );
    },
    _findTemplate: function(points, init, compare) {
        var record = init();
        var recordPoint = points[0];

        for (var i = 1; i < points.length; i++) {
            var point = points[i];
            var dist = this.sub(point).toDist();

            if (compare(dist, record)) {
                record = dist;
                recordPoint = point;
            }
        }

        return recordPoint;
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}