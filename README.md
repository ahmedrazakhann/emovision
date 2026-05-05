<div >

# EmoVision Real-Time Facial Emotion Recognition

**A computer vision application that detects and classifies human facial expressions in real-time, powered by a custom-trained deep learning model running entirely in the browser.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Deep Learning](https://img.shields.io/badge/Deep%20Learning-CNN-blueviolet?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

 **[Live Demo Try it in your Browser](https://emotion-detect-six.vercel.app)**

</div>

---

## Overview

EmoVision is a real-time emotion detection system that uses your webcam to analyse facial expressions and predict emotional states no server required. The entire inference pipeline runs client-side in the browser using TensorFlow.js, making it fast, private, and accessible from any device.

The underlying CNN model was trained from scratch on labelled facial expression datasets and then ported to TensorFlow.js for browser-native execution. This project demonstrates the full cycle from model training to production deployment of a computer vision system.

---

## Detected Emotions

| Emotion | Description |
|---------|-------------|
| 😊 Happy | Smiling or joyful expression |
| 😢 Sad | Downturned features, visible distress |
| 😠 Angry | Furrowed brows, tense expression |
| 😲 Surprised | Wide eyes, open mouth |
| 😐 Neutral | Resting face with no dominant emotion |
| 😨 Fearful | Raised brows, wide eyes |
| 🤢 Disgusted | Nose wrinkle, curled lip |

---

## System Architecture

```
Webcam Input
      │
      ▼
┌─────────────────────┐
│   Face Detection     │  ← react-use-face-detection
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Frame Extraction   │  ← Real-time canvas capture
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   CNN Inference     │  ← TensorFlow.js (browser-side)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Emotion Output     │  ← Classified label + confidence
└─────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React.js |
| ML Runtime | TensorFlow.js |
| Model Architecture | Convolutional Neural Network (CNN) |
| Face Detection | react-use-face-detection |
| Deployment | Vercel |
| Package Manager | Yarn |

---

## Key Highlights

- **Fully client-side inference** — no data is sent to any server. All processing happens locally in the browser.
- **Custom-trained CNN model** — the emotion recognition model was trained from scratch, not a pre-built wrapper.
- **Real-time performance** — processes live webcam frames continuously with low latency.
- **Zero installation for end users** — accessible directly via browser with a single link.

---

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedrazakhann/emovision.git
cd emovision
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Run Locally

```bash
yarn run start
```

Open `http://localhost:3000` in your browser and allow webcam access when prompted.

### 4. Production Build

```bash
yarn run build
```

---

## How It Works

1. The webcam feed is captured and streamed to a canvas element in real-time.
2. A face detection layer locates and isolates the facial region from each frame.
3. The cropped face region is preprocessed and passed to the TensorFlow.js CNN model.
4. The model returns a probability distribution across all emotion classes.
5. The highest-confidence prediction is displayed as the current emotional state.

---

## Model Details

The CNN was trained independently on a multi-class facial expression dataset. The trained model was exported and converted to TensorFlow.js format for browser-native execution using `@tensorflow/tfjs`. This eliminates the need for any backend inference server.

---

## Live Demo

The application is deployed and publicly accessible. No account, installation, or setup required.

👉 **[emotion-detect-six.vercel.app](https://emotion-detect-six.vercel.app)**

---

## Author

**Ahmed Raza Khan** — Full-Stack Engineer · AWS Certified ML Associate

[theahmedraza.com](https://theahmedraza.com) · [LinkedIn](https://linkedin.com/in/ahmedrazakhannn) · [ahmed@theahmedraza.com](mailto:ahmed@theahmedraza.com)

---

<div align="center">
  <sub>Built at the intersection of computer vision and the open web.</sub>
</div>
