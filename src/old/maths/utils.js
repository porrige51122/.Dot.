export function crossLine(r1, r2) {
  let a = r1[0],
    b = r1[1],
    c = r1[2],
    d = r1[3];
  let p = r2[0],
    q = r2[1],
    r = r2[2],
    s = r2[3];
  // check if cross
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

export function sameLine(r1, r2) {
  let a = r1[0],
    b = r1[1],
    c = r1[2],
    d = r1[3],
    p = r2[0],
    q = r2[1],
    r = r2[2],
    s = r2[3];
  // check if same line
  if (a == p && b == q && c == r & d == s) {
    return true;
  } else if (a == r && b == s && c == p & d == q) {
    return true;
  }
  return false;

}
