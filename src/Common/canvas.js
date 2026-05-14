import * as tf from "@tensorflow/tfjs";
import { predict } from "./tensorflowPredictions";
import {
  EMOTION_PANEL_BG_COLOR,
  EMOTION_PANEL_COLOR,
  SIZE_EMOTION_PANEL,
} from "../Constants/canvas.constant";

const _setRectStyle = (context) => {
  context.lineWidth = "0.8";
  context.strokeStyle = "red";
};

const _getRectDim = (boundingBox, canvasWidth, canvasHeight) => {
  const width = boundingBox.width * canvasWidth;
  const height = boundingBox.height * canvasHeight;
  const x = boundingBox.xCenter * canvasWidth;
  const y = boundingBox.yCenter * canvasHeight - SIZE_EMOTION_PANEL;
  return { x, y, width, height };
};

const _drawRect = (context, dims) => {
  context.beginPath();
  _setRectStyle(context);
  context.rect(dims.x, dims.y + SIZE_EMOTION_PANEL, dims.width, dims.height);
  context.stroke();
};

const _setFillStyle = (context, color) => (context.fillStyle = color);

const _drawPanel = (context, dims) => {
  context.fillRect(dims.x, dims.y, dims.width, SIZE_EMOTION_PANEL);
};

const _setFont = (context) => (context.font = SIZE_EMOTION_PANEL + "px serif");

const _drawText = (context, text, dims) => {
  context.fillText(text, dims.x, dims.y + SIZE_EMOTION_PANEL, dims.width);
};

const _drawEmotionPanel = (context, dims, prediction) => {
  _setFillStyle(context, EMOTION_PANEL_BG_COLOR);
  _drawPanel(context, dims);
  _setFont(context);
  _setFillStyle(context, EMOTION_PANEL_COLOR);
  _drawText(context, prediction, dims);
};

const _isBoundingBoxPositive = (boundingBox) =>
  boundingBox.xCenter >= 0 &&
  boundingBox.yCenter >= 0 &&
  boundingBox.width > 0 &&
  boundingBox.height > 0;

const _clearCanvas = (context) =>
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

const _drawImage = (video, context) =>
  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

const _drawPrediction = (context, bb, dims, emotionRecognizer, state, video) =>
  _drawEmotionPanel(
    context,
    dims,
    predict(emotionRecognizer, state, video, bb)
  );

const drawOnCanvas = (
  state,
  context,
  video,
  boundingBoxes,
  emotionRecognizer
) => {
  const { width: canvasWidth, height: canvasHeight } = context.canvas;
  _clearCanvas(context);
  _drawImage(video, context);

  if (boundingBoxes.length > 0 && state.isModelSet) {
    tf.tidy(() => {
      const videoTensor = tf.browser.fromPixels(video, 3);
      for (const bb of boundingBoxes) {
        if (_isBoundingBoxPositive(bb)) {
          const dims = _getRectDim(bb, canvasWidth, canvasHeight);
          _drawRect(context, dims);
          _drawPrediction(context, bb, dims, emotionRecognizer, state, videoTensor);
        }
      }
    });
  } else {
    for (const bb of boundingBoxes) {
      if (_isBoundingBoxPositive(bb)) {
        const dims = _getRectDim(bb, canvasWidth, canvasHeight);
        _drawRect(context, dims);
      }
    }
  }
};

export default drawOnCanvas;
