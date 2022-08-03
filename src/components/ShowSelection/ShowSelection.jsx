import "./styles.css";
import { useContext, useRef } from "react";
import reduceContents from "../../contexts/reduceContents";

function ShowSelection(props) {
  let reducerCtxt = useContext(reduceContents);
  let allBtnRef = useRef(null);
  let activeBtnRef = useRef(null);
  let completedBtnRef = useRef(null);

  function hover(ref, hovered) {
    if (ref.current && hovered) {
      if (reducerCtxt.state.showList !== `${ref.current.id.slice(0, ref.current.id.length - 3)}List`) {
        ref.current.style.cursor = "pointer";
        ref.current.style.color = "var(--hover-color)";
      } else {
        ref.current.style.cursor = "";
      }
    } else if (ref.current) {
      if (reducerCtxt.state.showList !== `${ref.current.id.slice(0, ref.current.id.length - 3)}List`) {
        ref.current.style.cursor = "";
        ref.current.style.color = "var(--font-color2)";
      }
    }
  }

  return (
    <div id="showSelection" style={{ opacity: reducerCtxt.state.allList.length === 0 ? "0" : "100%" }}>
      <button ref={allBtnRef} className="showBtn" id="allBtn" style={{ color: reducerCtxt.state.showList === "allList" ? "var(--active-color)" : "var(--font-color2)" }} onClick={() => reducerCtxt.dispatch({ type: "changeList", value: "allList" })} onMouseEnter={() => hover(allBtnRef, true)} onMouseLeave={() => hover(allBtnRef, false)}>
        All
      </button>
      <button ref={activeBtnRef} className="showBtn" id="activeBtn" style={{ color: reducerCtxt.state.showList === "activeList" ? "var(--active-color)" : "var(--font-color2)" }} onClick={() => reducerCtxt.dispatch({ type: "changeList", value: "activeList" })} onMouseEnter={() => hover(activeBtnRef, true)} onMouseLeave={() => hover(activeBtnRef, false)}>
        Active
      </button>
      <button ref={completedBtnRef} className="showBtn" id="completedBtn" style={{ color: reducerCtxt.state.showList === "completedList" ? "var(--active-color)" : "var(--font-color2)" }} onClick={() => reducerCtxt.dispatch({ type: "changeList", value: "completedList" })} onMouseEnter={() => hover(completedBtnRef, true)} onMouseLeave={() => hover(completedBtnRef, false)}>
        Completed
      </button>
    </div>
  );
}

export default ShowSelection;
