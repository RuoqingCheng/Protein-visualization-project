class Mat4 {
  constructor(a, b, c, d, e, f, g, h, i, j, k, l, m, o, n, p) {
    this.arr = [a, b, c, d, e, f, g, h, i, j, k, l, m, o, n, p];
  }
  multMat4(mat4) {
    return new Mat4(

    );
  }
  multVec4(vec4) {
    return new Vec4();
  }
}

class Vec4 {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

class Vec3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  normalize() {
    var dist = this.distance();
    this.x /= dist;
    this.y /= dist;
    this.z /= dist;
  }
  distance() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
}

var PDB = {
  Mat4: Mat4,
  Vec4: Vec4,
  Vec3: Vec3,
  translateMat: function (x, y, z) {
    return new Mat4(1, 0, 0, x,
                    0, 1, 0, y,
                    0, 0, 1, z,
                    0, 0, 0, 1);
  },
  rotationMat: function (angle, axis) {
    var x = axis.x,
        y = axis.y,
        z = axis.z,
        cosine = Math.cos(angle),
        sine = Math.sin(angle),
        a = cosine + x * x * (1 - cosine),
        b = x * y * (1 - cosine) - z * sine,
        c = x * z * (1 - cosine) + y * sine,
        d = y * x * (1 - cosine) + z * sine,
        e = cosine + y * y * (1 - cosine),
        f = y * z * (1 - cosine) - x * sine,
        g = z * x * (1 - cosine) - y * sine,
        h = z * y * (1 - cosine) + x * sine,
        i = cosine + z * z * (1 - cosine);
    return mat4(a, b, c, 0,
                e, f, g, 0,
                h, i, j, 0,
                0, 0, 0, 1);
  },
  quaternionMat: function (x, y, z, w) {
    var angle = 2 * Math.acos(w),
        sw = Math.sqrt(1 - w * w),
        axis = new Vec3(x / sw, y / sw, z / sw);
    return this.rotationMat(angle, axis);
  }
}
