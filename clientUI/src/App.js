import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import NetworkStatusBar from "./features/NetworkCheck/NetworkStatusBar";
import NetWorkCheck from "./features/NetworkCheck/NetworkCheck";

function App() {
  return (
    <Provider store={store}>
      <NetWorkCheck />
      <div className="App">
        <NetworkStatusBar />
      </div>
    </Provider>
  );
}

export default App;
