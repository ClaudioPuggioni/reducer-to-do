import { useContext, useRef } from "react";
import reduceContents from "../../contexts/reduceContents";
import TaskItem from "../TaskItem/TaskItem";
import "./styles.css";

function TaskList() {
  let reducerCtxt = useContext(reduceContents);
  let statusBtn = useRef(null);
  let inputTxt = useRef(null);

  return (
    <div id="taskList">
      <div id="inputTask">
        <input
          ref={statusBtn}
          type="button"
          className="incompleteBtn"
          id="stagBtn"
          onClick={(e) => {
            e.preventDefault();
            e.target.value = e.target.value === "" ? "✔" : "";
            e.target.value === "✔" ? inputTxt.current.classList.add("taskComplete") : inputTxt.current.classList.remove("taskComplete");
            statusBtn.current.className = statusBtn.current.classList.contains("incompleteBtn") ? "completeBtn" : "incompleteBtn";
          }}
        />
        <input
          id="inputBox"
          type="text"
          ref={inputTxt}
          placeholder="Create a new todo..."
          onKeyDown={(e) => {
            if (["Enter", "NumpadEnter"].includes(e.key)) {
              e.preventDefault();
              reducerCtxt.dispatch({ type: "add", payload: { id: Date.now(), isComplete: statusBtn.current.classList.contains("incompleteBtn") ? false : true, value: e.target.value } });
              if (statusBtn.current.classList.contains("completeBtn")) {
                statusBtn.current.classList.remove("completeBtn");
                statusBtn.current.classList.add("incompleteBtn");
                statusBtn.current.value = "";
              }
              if (inputTxt.current.classList.contains("taskComplete")) inputTxt.current.classList.remove("taskComplete");
              reducerCtxt.state.showList = "allList";
              e.target.value = "";
            }
          }}
        />
      </div>

      <div id="tasksListed" style={{ opacity: reducerCtxt.state.allList.length === 0 ? "0" : "100%" }}>
        {reducerCtxt.state[`${reducerCtxt.state.showList}`].map((ele) => {
          return (
            <>
              <TaskItem key={ele.id} task={ele} />
              <div className="taskDivider" />
            </>
          );
        })}
        <div id="tasksListedFooter">
          <div id="tasksListedFooterTxt">
            <div id="tasksCompletedFooter">{reducerCtxt.state.activeList.length} items left</div>
            <button id="clearCompleteBtn" onClick={() => reducerCtxt.dispatch({ type: "clearComplete" })}>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
