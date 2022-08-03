import { useReducer } from "react";
import "./styles.css";
import TaskList from "../TaskList/TaskList";
import ReduceContents from "../../contexts/reduceContents";
import ShowSelection from "../ShowSelection/ShowSelection";
import { useMediaQuery } from "react-responsive";

function reducer(state, action) {
  let allListCopy = [...state.allList];
  let activeListCopy = [...state.activeList];
  let completedListCopy = [...state.completedList];

  switch (action.type) {
    case "add":
      !action.payload.isComplete ? activeListCopy.push(action.payload) : completedListCopy.push(action.payload);
      return { ...state, allList: [...state.allList, { ...action.payload }], activeList: activeListCopy, completedList: completedListCopy };
    case "remove":
      return { ...state, allList: allListCopy.filter((ele) => ele.id !== action.id), activeList: activeListCopy.filter((ele) => ele.id !== action.id), completedList: completedListCopy.filter((ele) => ele.id !== action.id) };
    case "toggle-isComplete":
      state.allList.forEach((ele) => (ele.isComplete = ele.id !== action.id ? ele.isComplete : !ele.isComplete ? true : false));
      return { ...state, activeList: [...state.allList].filter((ele) => !ele.isComplete), completedList: [...state.allList].filter((ele) => ele.isComplete) };
    case "changeList":
      return { ...state, showList: action.value, activeList: activeListCopy.filter((ele) => !ele.isComplete), completedList: completedListCopy.filter((ele) => ele.isComplete) };
    case "clearComplete":
      return { ...state, allList: allListCopy.filter((ele) => !ele.isComplete), completedList: [] };
    case "themeToggle":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    default:
      break;
  }
}

function UserInterface() {
  let [state, dispatch] = useReducer(reducer, { theme: "dark", isMobile: true, showList: "allList", allList: [], activeList: [], completedList: [] });
  const isMobile = useMediaQuery({ query: "(max-width: 375px)" });

  return (
    <div id="container" className={state.theme === "light" ? "lightTheme" : null}>
      <div id="header" style={{ background: state.theme === "light" && isMobile ? `url("/images/bg-mobile-light.jpg")` : state.theme === "dark" && isMobile ? `url("/images/bg-mobile-dark.jpg")` : state.theme === "light" && !isMobile ? `url("/images/bg-desktop-light.jpg") no-repeat` : `url("/images/bg-desktop-dark.jpg") no-repeat` }}></div>
      <div id="app">
        <div id="appTitle">
          TODO <img id="mode" src={state.theme === "light" ? "/images/icon-moon.svg" : "/images/icon-sun.svg"} alt="Light Switch Icon" onClick={() => dispatch({ type: "themeToggle" })} />
        </div>
        <ReduceContents.Provider value={{ state, dispatch }}>
          <div id="appContainer">
            <TaskList />
            <ShowSelection />
          </div>
        </ReduceContents.Provider>
      </div>
    </div>
  );
}

export default UserInterface;
