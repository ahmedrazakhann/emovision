import { EMOTIONS, NO_MODEL } from "../Constants/emotionRecognizer.constant";
import * as tf from "@tensorflow/tfjs";
import magnifyResults from "./magnifyResults";
import { treatImg } from "./tensorflowImages";

const predict = (emotionRecognizer, state, imageSource, bb) => {
  if (!state.isModelSet) {
    return NO_MODEL;
  }

  return tf.tidy(() => {
    const tfResizedImage = treatImg(imageSource, bb);
    const prediction = emotionRecognizer.predict(tfResizedImage);
    const data = Array.from(prediction.dataSync());
    return magnifyResults(EMOTIONS)(data);
  });
};

export { predict };
