# 24T2 Ninja Training Project - Kuma

## 1. Overview
**Kuma** is a virtual study space application that allows users to setup and share their own 3D study spaces. The goal of this project is to create a stunning 3D web application that allows for live interactions between users.

## 2. Setup
1. ``` cd Backend && npm i ```
2. ``` cd Frontend && npm i ```
3. ``` npm run dev ``` in Frontend


## 3. Voice Calls Using Agora WebRTC
To handle voice calls, we will be utilizing Agora's Voice Call SDK. This API enables room joining functionality for both audio and video calls. To start using this API, simply paste your ```appId``` in the ```LiveChat.tsx``` file. 

Agora SDK Docs: https://docs.agora.io/en/api-reference?platform=react-js&product=all

Get an App Id + Developer Account: https://console.agora.io/

Sample Implementation Using React: https://www.agora.io/en/blog/building-a-video-chat-app-using-react-hooks-and-agora/


## 4. 3D Web Design Using Spline
Much of the 3D elements in this project will be done using Spline as an alternative to tools such as three.js + Blender. Spline is a beginner friendly 3D web design and modeling tool that allows for easy integration with frameworks such as React. To start building with Spline, view some of the resources listed below:

Spline Beginner Tutorial: https://www.youtube.com/watch?v=7vMRRT6nhKI

React + Spline Docs: https://github.com/splinetool/react-spline