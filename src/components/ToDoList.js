import { Button } from "react-bootstrap";
function TodoList ({todoList, completeTask, deleteTask}){
    return (
        <>
        <h3>List of Todo Tasks</h3>
        <ul>
            {
                todoList.map((item, index) => (
                   <li key={index}>
                        {/* <input type="checkbox" onChange={() => completeTask(index)} checked = {item.isCompleted} /> */}
                        <input type="checkbox" onChange={() => completeTask(item.id)} checked = {item.isCompleted} />
                        <span style={{textDecoration: item.isCompleted ? "line-through" : ""}}>{item.task}</span>
                        {' '}
                        {/* <Button variant="success" onClick={() => completeTask(index)}>√</Button>{' '} */}
                        <Button variant="success" onClick={() => completeTask(item.id)}>√</Button>{' '}
                        <Button variant="danger" onClick={() => deleteTask(item.id)}>X</Button>
                        
                   </li>     
                ))
            }
        </ul>
        </>
    );
};

export default TodoList;