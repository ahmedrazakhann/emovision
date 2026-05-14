import { useFaceDetection } from "react-use-face-detection";
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "../stylesheet/WebcamModified.css";
import { URL_EMOTION_RECOGNITION_MODEL } from "../Constants/url.constant";
import drawOnCanvas from "../Common/canvas";
import VideoOnCanvas from "./VideoOnCanvas";
import SwitchCamera from "./SwitchCamera";
import { FACE_DETECTION_PROPS } from "../Constants/faceDetection.constant";
import { loadModel } from "../Common/tensorflowModel";

type stateType = { model: any, facingMode: string, isModelSet: boolean };

const _init_state = {
  model: null,
  isModelSet: false,
};

const ManageVideoOnCanvas = () => {
  const { webcamRef, boundingBox } = useFaceDetection(FACE_DETECTION_PROPS);
  let canvasRef = useRef(null);

  const [state, setState]: [stateType, Function] = useState(_init_state);
  const [constraints, setConstraints] = useState({
    facingMode: "user",
  });

  const boundingBoxRef = useRef(boundingBox);
  const stateRef = useRef(state);

  useEffect(() => {
    boundingBoxRef.current = boundingBox;
  }, [boundingBox]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
        drawOnCanvas(
          stateRef.current,
          context,
          webcamRef.current.video,
          boundingBoxRef.current,
          stateRef.current.model
        );
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [canvasRef, webcamRef]);

  useEffect(() => {
    if (!state.isModelSet) {
      // MODEL EMOTION RECOGNITION
      tf.ready().then(() =>
        loadModel(URL_EMOTION_RECOGNITION_MODEL, setState, state)
      );
    }
  }, [state, setState]);

  return (
    <div>
      <SwitchCamera
        setConstraints={setConstraints}
        isModelLoaded={state.isModelSet}
      />
      <VideoOnCanvas
        canvasRef={canvasRef}
        webcamRef={webcamRef}
        constraints={constraints}
      />
    </div>
  );
};

export default ManageVideoOnCanvas;
