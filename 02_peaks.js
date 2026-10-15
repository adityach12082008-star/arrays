const r = require("raylib");

function init() {
    const WIDTH = 800;
    const HEIGHT = 600;
    const data = [12, 34, 6, 4, 31, 5, 4, 24, 12, 34, 76, 108, 46, 51, 2];
    const maxValue = max(data);
    const maxPercent = (90 / 100) * HEIGHT;
    const scalingFactor = maxPercent / maxValue;
    const gap = 50;
    const radius = 3;
    return { WIDTH, HEIGHT, data, maxValue, scalingFactor, gap, radius };
}

function setup() {
    const w = init();

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(w.WIDTH, w.HEIGHT, "peak");
    r.SetTargetFPS(60);

    return w;
}

function max(arr) {
    let maxValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue)
            maxValue = arr[i];
    }

    return maxValue;
}

function getPoints(i, w) {
    return {
        x: i * w.gap,
        y: w.HEIGHT - (w.data[i] * w.scalingFactor),
    }
}

function drawLine(w, i) {
    const start = getPoints(i, w);
    const end = getPoints(i + 1, w);
    r.DrawLineEx(start, end, w.radius, r.BLACK);
}

function drawLineGraph(w) {
    for (let i = 0; i < w.data.length - 1; i++) {
        drawLine(w, i);
    }
}

function getPeaks(w) {
    let peakIndexes = [];

    for (let j = 1; j < w.data.length - 1; j++) {
        if (isPeak(w, j)) {
            peakIndexes.push(j);
        }
    }

    return peakIndexes;
}

function drawPeaks(peakIndexes, w) {
    for (let i = 0; i < peakIndexes.length; i++) {
        drawPeakAtPosition(peakIndexes[i], w)
    }
}

function drawPeakAtPosition(i, w) {
    r.DrawCircleV(getPoints(i, w), 5, r.RED);
}

function isPeak(w, j) {
    return (w.data[j] > w.data[j - 1]) && (w.data[j] > w.data[j + 1]);
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawLineGraph(w);
    const peakIndexes = getPeaks(w);
    drawPeaks(peakIndexes, w);

    r.EndDrawing();
}

function loop(w) {
    while (!r.WindowShouldClose()) {
        draw(w);
    }
}

function main() {
    const w = setup();
    loop(w);
}

main();