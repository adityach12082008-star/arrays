const r = require("raylib");

function setup() {
    const WIDTH = 300;
    const HEIGHT = 600;
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const maxValue = max(data);
    const nintyPercentage = (90 / 100) * HEIGHT;
    const scalingFactor = nintyPercentage / maxValue;
    const average = arrayAverage(data, scalingFactor);
    const averageHeight = average / data.length;
    const barWidth = 20;
    const gapWidth = 2;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Averages");
    r.SetTargetFPS(60);

    const w = { WIDTH, HEIGHT, data, maxValue, scalingFactor, barWidth, gapWidth, averageHeight };
    return w;
}

function arrayAverage(object, scalingFactor) {
    let average = 0;
    for (let i = 0; i < object.length; i++) {
        average += object[i] * scalingFactor;
    }
    return average;
}

function max(arr) {
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue)
            maxValue = arr[i];
    }
    return maxValue;
}

function drawBar(bar) {
    r.DrawRectangleRec(bar, r.DARKBLUE);
}


function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawBars(w);

    drawAverageLine(w);

    r.EndDrawing();
}

function drawBars(w) {

    for (let j = 0; j < w.data.length; j++) {

        const barHeight = w.scalingFactor * w.data[j];
        const bar = {
            x: j * (w.barWidth + w.gapWidth),
            y: w.HEIGHT - barHeight,
            width: w.barWidth,
            height: barHeight,
        }

        drawBar(bar);
    }
}

function drawAverageLine(w) {

    const x1 = 0;
    const y1 = w.HEIGHT - w.averageHeight;
    const x2 = w.WIDTH;
    const y2 = w.HEIGHT - w.averageHeight;

    r.DrawLine(x1, y1, x2, y2, r.RED);
}

function loop(w) {
    while (!r.WindowShouldClose()) {
        // no update!
        draw(w);
    }
}
function main() {
    const w = setup();
    loop(w);
}
main();