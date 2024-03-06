/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./todolist.module.css";

export default function ToDoList({ setRefresh }) {
  const [input, setInput] = useState({});
  const [task, setTask] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:8080/getList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("error");
      }
      const data = await response.json();
      setTask(data.data);
    })();
  }, []);

  async function buttonHandle(event) {
    if (event.target.name === "add") {
      const response = await fetch("http://localhost:8080/insertList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        alert("error");
      }
    } else if (event.target.name === "delete") {
      const response = await fetch("http://localhost:8080/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(event.target.id) }),
      });
      if (!response.ok) {
        alert("error");
      }
    }
    setRefresh();
  }

  function changeHandle(event) {
    if (event.target.name === "completed") {
      setInput(
        Object.assign({}, input, { [event.target.name]: event.target.checked })
      );
    } else {
      setInput(
        Object.assign({}, input, { [event.target.name]: event.target.value })
      );
    }
  }

  async function checkboxChange(event) {
    const response = await fetch("http://localhost:8080/updateList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(event.target.id),
        completed: event.target.checked,
      }),
    });
    if (!response.ok) {
      alert("error");
    } else {
      setRefresh();
    }
  }
  return (
    <div className={styles.container}>
      <h2>To Do List</h2>
      <div className={styles.addTask}>
        <input
          className={styles.input}
          onChange={changeHandle}
          type="text"
          name="title"
          placeholder="Add Task"
        />
        <input
          className={styles.input}
          onChange={changeHandle}
          name="description"
          type="te
          xt"
          placeholder="Add Description"
        />
        <label>
          <input type="checkbox" name="completed" onChange={changeHandle} />{" "}
          Task is Completed
        </label>
        <button className={styles.addBtn} name="add" onClick={buttonHandle}>
          Add Task
        </button>
      </div>
      <ListTask
        task={task}
        changeEvent={checkboxChange}
        buttonHandle={buttonHandle}
      />
    </div>
  );
}

function ListTask({ task, changeEvent, buttonHandle }) {
  return task === undefined || task.length == 0 ? (
    <div></div>
  ) : (
    <div className={styles.taskList}>
      {task &&
        task.map((el) => (
          <div key={el.id} className={styles.list}>
            <input
              type="checkbox"
              checked={el.completed}
              onChange={changeEvent}
              id={el.id}
            />
            <div>
              <h3>{el.title}</h3>
              <p>{el.description}</p>
            </div>
            <button
              name="delete"
              className={styles.deleteBtn}
              id={el.id}
              onClick={buttonHandle}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
