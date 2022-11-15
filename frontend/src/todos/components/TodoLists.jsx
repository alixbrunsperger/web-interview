import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { fetchTodoLists, updateTodoList } from '../../lib/fetch'

const isListCompleted = (todoList) => {
  const todos = Object.values(todoList.todos)
  const completedTodos = todos.filter(({ completed }) => !!completed)
  return completedTodos.length === todos.length
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon color={key === activeList ? 'secondary' : 'action'} />
                  {isListCompleted(todoLists[key]) ? <CheckCircleIcon color={'success'} /> : null}
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] ? (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const updatedList = { ...todoLists[id], todos }
            updateTodoList(updatedList)
            setTodoLists({
              ...todoLists,
              [id]: updatedList,
            })
          }}
        />
      ) : null}
    </Fragment>
  )
}
