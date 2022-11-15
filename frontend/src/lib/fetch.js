const backendUrl = 'http://localhost:3001'

export const fetchTodoLists = async () => {
  const res = await fetch(`${backendUrl}/todo-lists`)
  return res.json()
}

export const updateTodoList = async (todoList) => {
  const res = await fetch(`${backendUrl}/todo-list/${todoList.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoList),
  })
  return res.json()
}