import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      let newCount = state.count + 1;
      return { ...state, count: newCount };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "theme-update":
      let newTheme;
      if (state.theme === "light") {
        newTheme = "dark";
      } else {
        newTheme = "light";
      }
      return { ...state, theme: newTheme };
    case "name-change":
      return { ...state, name: action.value };
    default:
      return state;
  }
}

function App() {
  let [state, dispatch] = useReducer(reducer, { count: 0, theme: "light", list: "arnav" });

  return (
    <div className="app">
      <div className="row">
        <button onClick={() => dispatch({ type: "decrement" })} className="action">
          -
        </button>
        {state.count}
        <button onClick={() => dispatch({ type: "increment" })} className="action">
          +
        </button>
      </div>

      <div className="row">
        <button
          className="action"
          onClick={() => {
            dispatch({ type: "theme-update" });
          }}
        >
          Update Theme
        </button>
        Current Theme: {state.theme}
      </div>

      <div className="row" id="nameDiv">
        <input type="text" onChange={(e) => dispatch({ type: "name-change", value: e.target.value })} />
        <p> Hello, my name is, {state.name}</p>
      </div>
    </div>
  );
}

export default App;
