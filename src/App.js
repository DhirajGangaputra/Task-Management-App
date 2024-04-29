import './App.css'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

const App = () => {
  const [enterTask, setEnterTask] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [taskList, setTaskList] = useState([])

  const takeInput = event => {
    setEnterTask(event.target.value)
  }

  const handleTagChange = event => {
    setSelectedTag(event.target.value)
  }

  const addTheTask = () => {
    if (enterTask.trim() === '' || selectedTag === '') {
      alert('Please enter a task and select a tag.')
      return
    }
    const newTask = {id: uuidv4(), task: enterTask, tag: selectedTag}
    setTaskList([...taskList, newTask])
    setEnterTask('')
  }

  const filteredTasks = selectedTag
    ? taskList.filter(task => task.tag === selectedTag)
    : taskList

  return (
    <div className="app-container">
      <form className="input-task-container" onSubmit={addTheTask}>
        <h1 className="main-heading">Create a task!</h1>
        <div className="input-container">
          <label htmlFor="taskinput" className="label">
            Task
          </label>
          <input
            type="text"
            id="taskinput"
            value={enterTask}
            placeholder="Enter the task here"
            onChange={takeInput}
            className="input-box"
          />
        </div>
        <div className="input-container">
          <label htmlFor="tagsinput" className="label">
            Tags
          </label>
          <select
            id="tagsinput"
            value={selectedTag}
            onChange={handleTagChange}
            className="input-box"
          >
            {tagsList.map(tag => (
              <option key={tag.optionId} value={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
      <div className="output-container">
        <div className="input-container">
          <h1 className="tags-btn-label">Tags</h1>
          <div>
            {tagsList.map(tag => (
              <li>
                <button
                  type="button"
                  className="tag-btn"
                  key={tag.optionId}
                  onClick={() => setSelectedTag(tag.optionId)}
                >
                  {tag.displayText}
                </button>
              </li>
            ))}
          </div>
        </div>
        <div className="input-container">
          <h1 className="tags-btn-label">Tasks</h1>
          <div id="task-container-id">
            {filteredTasks.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              <ul>
                {filteredTasks.map(task => (
                  <li key={task.id} className="added-task">
                    <p className="what-task-is">{task.task}</p>
                    <button type="button" className="add-task-btn">
                      {task.tag}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
