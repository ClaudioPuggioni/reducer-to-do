import "./styles.css";
import { useContext } from "react";
import reduceContents from "../../contexts/reduceContents";

function TaskItem(props) {
  let reducerCtxt = useContext(reduceContents);

  return (
    <div className="taskItem">
      <input
        type="button"
        className={props.task.isComplete ? "completeBtn" : "incompleteBtn"}
        onClick={(e) => {
          reducerCtxt.dispatch({ type: "toggle-isComplete", id: props.task.id });
        }}
        value={props.task.isComplete ? "✔" : ""}
      ></input>
      <div className={props.task.isComplete ? "taskComplete" : "taskText"}>{props.task.value}</div>
      <button
        id="delBtn"
        onClick={() => {
          reducerCtxt.dispatch({ type: "remove", id: props.task.id });
        }}
      >
        <img className="delCross" src="/images/icon-cross.svg" alt="Delete Cross" />
      </button>
    </div>
  );
}

export default TaskItem;
