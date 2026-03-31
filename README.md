# React-Redux RPG Engine

![Gameplay Preview](Screenshots/menu.png) ## 🎯 Project Scope & Purpose
This project is a browser-based RPG engine designed to demonstrate advanced **React** patterns and complex state management using **Redux**. The goal was to create a synchronized game world where multiple entities (Player & NPCs) interact in real-time within a predictable state container.

## 🚀 Key Technical Implementations

### 1. Centralized Game Loop (Redux TICK)
Unlike traditional React apps that rely only on component lifecycle, this game uses a **centralized TICK action** dispatched via Redux. This allows:
* Synchronized movement for all NPCs.
* Real-time combat interaction checks.
* Consistent state transitions across the entire game world.

### 2. Dynamic Map & Procedural Generation
* Implemented logic for terrain generation including trees, rocks, and water boundaries.
* **Collision Detection:** Integrated a coordinate-based system to restrict movement for both Player and AI entities.

### 3. Entity AI & Mechanics
* **NPC Behavior:** Automated movement patterns and state-based logic for enemies.
* **Combat System:** Directional attack logic and health-based entity removal managed through Redux reducers.
* **UI Rendering:** Optimized React rendering to update only the necessary map tiles and UI overlays.

## 🛠 Tech Stack & Tools
* **Frontend Library:** React (Functional Components, Hooks)
* **State Management:** Redux (Store, Actions, Reducers)
* **Language:** JSX / JavaScript (ES6+)
* **Build Tool:** Node.js / Create-React-App environment
* **Version Control:** Git / SourceTree

## 📁 How to Run (Local Setup)
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/GitBogdan8/react-redux-rpg-ibm.git](https://github.com/GitBogdan8/react-redux-rpg-ibm.git)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
