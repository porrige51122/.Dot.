export function dist(x1, y1, x2, y2) {
  return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5)
}

export function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1)
}

export function checkDuplicate(array, line) {
  for (let i = 0; i < array.length; i++) {
    if (this.sameLine(array[i], line)) {
      return i;
    }
  }
  return -1;
}

export function sameLine(a, b) {
  return (a.a === b.a && a.b === b.b) || (a.b === b.a && a.a === b.b)
}

export function lineThroughCircle(x1, y1, x2, y2, cx, cy, cr) {
  let nearest = this.nearestPoint(x1, y1, x2, y2, cx, cy);
  if ((x1 <= nearest.x && nearest.x <= x2) || (x1 >= nearest.x && nearest.x >= x2)) {
    if ((y1 <= nearest.y && nearest.y <= y2) || (y1 >= nearest.y && nearest.y >= y2)) {
      let dist = this.dist(cx, cy, nearest.x, nearest.y);
      if (dist <= cr)
        return true;
    }
  }
  return false;
}

export function nearestPoint(x1, y1, x2, y2, cx, cy) {
  let dir = this.normalize(x2 - x1, y2 - y1);
  let vx = cx - x1;
  let vy = cy - y1;
  let d = this.dot(vx, vy, dir.x, dir.y);
  let outx = x1 + dir.x * d;
  let outy = y1 + dir.y * d;
  return { x: outx, y: outy };
}

export function dot(x1, y1, x2, y2) {
  return (x1 * x2) + (y1 * y2);
}

export function normalize(x, y) {
  let mag = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  return { x: x / mag, y: y / mag };
}

export function checkCross(array, line) {
  for (let i = 0; i < array.length; i++) {
    if (this.crossLine(array[i], line)) {
      return true;
    }
  }
  return false;
}

export function crossLine(la, lb) {
  let a = la.a.x;
  let b = la.a.y;
  let c = la.b.x;
  let d = la.b.y;
  let p = lb.a.x;
  let q = lb.a.y;
  let r = lb.b.x;
  let s = lb.b.y;

  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}
