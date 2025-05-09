import {StrictMode} from "react"
import {Root, createRoot} from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
//import WebFont from 'webfontloader';
import {Provider} from "react-redux"
import * as serviceWorker from "./serviceWorker"
import {persistor, store} from "./redux/_store"
import {PersistGate} from "redux-persist/integration/react"

//styles
import "@/style/index.css"
import "@/style/colors.css"
import "@/style/style.css"

const root: Root = createRoot(
  document.getElementById("root") as HTMLElement
)

//Load fond
/*WebFont.load({
  google: { families: ['Open Sans:400,600,700', 'sans-serif'] }
})*/

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
