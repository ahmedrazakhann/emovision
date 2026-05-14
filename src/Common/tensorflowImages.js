import * as tf from "@tensorflow/tfjs";
import {
  PRED_RESIZE_SHAPE,
  RESIZE_SHAPE,
} from "../Constants/emotionRecognizer.constant";

const treatImg = (img, bb) => {
  const tensor = img instanceof tf.Tensor ? img : tf.browser.fromPixels(img, 3);
  const expanded = tensor.shape.length === 3 ? tensor.expandDims(0) : tensor;
  
  if (bb) {
    // cropAndResize expects [y1, x1, y2, x2] normalized coordinates
    const boxes = tf.tensor2d([bb.yCenter, bb.xCenter, bb.yCenter + bb.height, bb.xCenter + bb.width], [1, 4]);
    const boxInd = tf.tensor1d([0], 'int32');
    const cropped = tf.image.cropAndResize(expanded, boxes, boxInd, RESIZE_SHAPE);
    
    // Cleanup if we created a temporary tensor
    if (expanded !== img && expanded.shape.length === 4) {
      // We can't easily cleanup here because we return a new tensor derived from it
      // but tf.tidy handles this.
    }
    
    return cropped.reshape(PRED_RESIZE_SHAPE);
  }
  
  return tf.image.resizeBilinear(expanded, RESIZE_SHAPE).reshape(PRED_RESIZE_SHAPE);
};

export { treatImg };
