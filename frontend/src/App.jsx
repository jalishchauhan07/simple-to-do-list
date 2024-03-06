/* eslint-disable no-unused-vars */
import ToDoList from "./components/todoList";
import { useState } from "react";
function App() {
  const [_, setRefresh] = useState(false);
  function refresh() {
    window.location.reload();
  }
  return (
    <>
      <ToDoList setRefresh={refresh} />
    </>
  );
}

export default App;
