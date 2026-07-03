let color_palette = ["#ffa0dcff", "#a8fffbff", "#ffcccc", "#ffff99", "#ffffff"];
let basePalette = ["#99ccff", "#ffffcc"];
let padding = 100;
async function setup() {
  createCanvas(2000, 1400); // 畫布大小：width, height
  background(random(basePalette)); // 背景顏色

  let xsum = 0;
  // 使用迴圈繪製 - 底色層
  for (let i = 0; i < 30; i++) {
    let x = xsum;
    let y = 0;
    let xCount = int(random(5, 20));
    let yCount = 350;
    let R = 4;
    let xSpan = R + random(2, 5);
    let ySpan = R + random(3);

    RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
    xsum += xCount * xSpan;
    await sleep(10);
  }

  // 使用迴圈重複繪製 - 中間層
  for (let i = 0; i < 600; i++) {
    let x = random(-padding, width);
    let y = random(-padding, height);
    let xCount = int(random(5, 20));
    let yCount = int(random(20, 200));
    let R = 4;
    let xSpan = R + random(2, 5);
    let ySpan = R + random(3);
    RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
    await sleep(10);
  }

  // 只畫一次
  noLoop();
}

function draw() {}

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小
function RJ_rect(_x, _y, _xCount, _yCount, _xSpan, _ySpan, _R) {
  let mainClr = random(color_palette); // 隨機選一個顏色
  let fade_scale = random(); // 0-1

  // 繪製點點矩陣
  for (let i = 0; i < _xCount; i++) {
    let px = i * _xSpan + _x; // 計算 x 座標
    for (let j = 0; j < _yCount; j++) {
      let py = j * _ySpan + _y; // 計算 y 座標

      let fade_rate = j / _yCount; // 0-1
      fade_rate = map(fade_rate, 0, 1, 0, fade_scale);

      if (random() > fade_rate) {
        push(); // 儲存畫布目前狀態
        translate(px, py); // 移動畫布原點

        fill(mainClr); // 填色
        noStroke(); // 不要外框線
        let r = _R * random(0.8, 1.5);
        circle(0, 0, r); //

        if (random() < 0.02) {
          print(1);
          // stroke(255)
          noStroke();
          fill(random(color_palette));
          rotate(random(TWO_PI));
          textSize(random(30, 70));
          text("＊", 0, 0);
        }
        pop(); // 回復至畫布先前狀態
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
