function componentToHex(c) {
  var hex = (+c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


//--------- cmyk to rgb
function cmyk2rgb(c, m, y, k, normalized){
  c = (c / 100);
  m = (m / 100);
  y = (y / 100);
  k = (k / 100);
  
  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;
  
  var r = 1 - c;
  var g = 1 - m;
  var b = 1 - y;
  
  if(!normalized){
      r = Math.round(255 * r);
      g = Math.round(255 * g);
      b = Math.round(255 * b);
  }
  
  return {
      r: r,
      g: g,
      b: b
  }
}

function rgb2cmyk(r, g, b, normalized){
  var c = 1 - (r / 255);
  var m = 1 - (g / 255);
  var y = 1 - (b / 255);
  var k = Math.min(c, Math.min(m, y));
  
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  
  if(!normalized){
      c = Math.round(c * 10000) / 100;
      m = Math.round(m * 10000) / 100;
      y = Math.round(y * 10000) / 100;
      k = Math.round(k * 10000) / 100;
  }
  
  c = isNaN(c) ? 0 : c;
  m = isNaN(m) ? 0 : m;
  y = isNaN(y) ? 0 : y;
  k = isNaN(k) ? 0 : k;
  
  return {
      c: Math.round(c),
      m: Math.round(m),
      y: Math.round(y),
      k: Math.round(k)
  }
}

// rgb to hls
function RGBToHSL(r, g, b){
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return {
    h: Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    s: Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
    l: Math.round((100 * (2 * l - s)) / 2),
  }
}

// hls to rgb
function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  let a = s*Math.min(l, 1-l);
  let f = (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3, 9-k,1),-1);
  return {
    r: Math.round(f(0)*255),
    g: Math.round(f(8)*255),
    b: Math.round(f(4)*255)
  }

}

//--------------- cmyk

let C_slider = document.getElementById('C_slider');
let col = document.getElementById('color_picker')
let C = document.getElementById('C')
let M = document.getElementById('M')
let Y = document.getElementById('Y')
let K = document.getElementById('K')
let R = document.getElementById('R')
let G = document.getElementById('G')
let B = document.getElementById('B')

let H = document.getElementById('H')
let S = document.getElementById('S')
let L = document.getElementById('L')




C_slider.addEventListener("input",function(){
  C.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l

});

C.addEventListener("input", function(){
  C_slider.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

let M_slider = document.getElementById('M_slider');
M_slider.addEventListener("input",function(){
  M.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
});

M.addEventListener("input", function(){
  M_slider.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

let Y_slider = document.getElementById('Y_slider');

Y.addEventListener("input", function(){
  Y_slider.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

Y_slider.addEventListener("input",function(){
  Y.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
});

let K_slider = document.getElementById('K_slider');
K_slider.addEventListener("input",function(){
  K.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
});

K.addEventListener("input", function(){
  K_slider.value = this.value
  rgb = cmyk2rgb(C.value, M.value, Y.value, K.value)
  col.value = rgbToHex(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  hsl = RGBToHSL(rgb.r, rgb.g, rgb.b)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

//--------------- rgb

let R_slider = document.getElementById('R_slider');

R_slider.addEventListener("input",function(){
  R.value = this.value
  col.value = rgbToHex(R.value, G.value, B.value)
  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k

  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
}); 

R.addEventListener("input", function(){
  R_slider.value = this.value
  col.value = rgbToHex(R.value, G.value, B.value)
  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k

  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

let G_slider = document.getElementById('G_slider');
G_slider.addEventListener("input",function(){
  G.value = this.value
  col.value = rgbToHex(R.value, G.value, B.value)
  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k

  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
}); 

G.addEventListener("input", function(){
  G_slider.value = this.value
  col.value = rgbToHex(R.value, G.value, B.value)
  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k

  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

let B_slider = document.getElementById('B_slider');
B_slider.addEventListener("input",function(){
  B.value = this.value
  col.value = rgbToHex(R.value, G.value, B.value)
  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k

  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
}); 

B.addEventListener("input", function(){
  B_slider.value = this.value
  col.value = rgbToHex(R.value, G.value, B.value)
  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  M.value = cmyk.m
  Y.value = cmyk.y
  K.value = cmyk.k

  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})

// ------------- rgb to hsl
let H_slider = document.getElementById('H_slider');
H_slider.addEventListener("input",function(){
  H.value = this.value
  rgb = hslToRgb(+H.value, +S.value, +L.value)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k

}); 

H.addEventListener("input", function(){
  H_slider.value = this.value
  rgb = hslToRgb(+H.value, +S.value, +L.value)
  console.log(rgb.r, rgb.g, rgb.b)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k
});

let S_slider = document.getElementById('S_slider');
S_slider.addEventListener("input",function(){
  S.value = this.value
  rgb = hslToRgb(+H.value, +S.value, +L.value)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k
}); 

S.addEventListener("input", function(){
  S_slider.value = this.value
  rgb = hslToRgb(H.value, S.value, L.value)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k
});

let L_slider = document.getElementById('L_slider');
L_slider.addEventListener("input",function(){
  L.value = this.value
  rgb = hslToRgb(H.value, S.value, L.value)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k
}); 

H.addEventListener("input", function(){
  H_slider.value = this.value
  rgb = hslToRgb(H.value, S.value, L.value)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(rgb.r, rgb.g, rgb.b)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k
});

// ------------- color
col.addEventListener("input", function(){
  rgb = hexToRgb(this.value)
  R.value = rgb.r
  R_slider.value = rgb.r
  G.value = rgb.g
  G_slider.value = rgb.g
  B.value = rgb.b
  B_slider.value = rgb.b

  cmyk = rgb2cmyk(R.value, G.value, B.value)
  C.value = cmyk.c
  C_slider.value = cmyk.c
  M.value = cmyk.m
  M_slider.value = cmyk.m
  Y.value = cmyk.y
  Y_slider.value = cmyk.y
  K.value = cmyk.k
  K_slider.value = cmyk.k
  
  hsl = RGBToHSL(R.value, G.value, B.value)
  H.value = hsl.h
  H_slider.value = hsl.h
  S.value = hsl.s
  S_slider.value = hsl.s
  L.value = hsl.l
  L_slider.value = hsl.l
})