import { RecoilRoot } from "recoil";
import RouterWrap from "./routers/routes";
function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <RouterWrap />
      </div>
    </RecoilRoot>
  );
}

export default App;
