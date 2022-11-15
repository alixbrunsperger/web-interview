import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuidv4 } from 'uuid'
import { DeadLineBadge } from './DeadLineBadge'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {Object.values(todos).map((todo, index) => {
            const { id, title, completed, deadline } = todo
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '8px' }} variant='h6'>
                  {index + 1}
                </Typography>
                <TextField
                  sx={{ flexGrow: 1, marginTop: '1rem' }}
                  label='What to do?'
                  value={title}
                  //disabled={completed}
                  onChange={(event) => {
                    const updatedTodos = {
                      // immutable update
                      ...todos,
                      [id]: { ...todo, title: event.target.value },
                    }
                    saveTodoList(todoList.id, { todos: updatedTodos })
                    setTodos(updatedTodos)
                  }}
                />
                <TextField
                  sx={{ margin: '1rem 0.5rem 0', width: 140 }}
                  id='date'
                  label='Set a deadline'
                  type='date'
                  defaultValue={deadline}
                  onChange={(event) => {
                    const updatedTodos = {
                      // immutable update
                      ...todos,
                      [id]: { ...todo, deadline: event.target.value },
                    }
                    saveTodoList(todoList.id, { todos: updatedTodos })
                    setTodos(updatedTodos)
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {deadline ? <DeadLineBadge deadline={deadline} /> : <CalendarTodayIcon />}
                <Button
                  sx={{ margin: '8px 0' }}
                  size='small'
                  color='secondary'
                  onClick={() => {
                    const updatedTodos = {
                      // immutable update
                      ...todos,
                      [id]: { ...todo, completed: !completed },
                    }
                    saveTodoList(todoList.id, { todos: updatedTodos })
                    setTodos(updatedTodos)
                  }}
                >
                  <CheckCircleIcon color={completed ? 'success' : 'disabled'} />
                </Button>
                <Button
                  sx={{ margin: '8px 0' }}
                  size='small'
                  color='error'
                  onClick={() => {
                    // immutable delete
                    const { [id]: todo, ...newTodos } = todos
                    saveTodoList(todoList.id, { todos: newTodos })
                    setTodos(newTodos)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            )
          })}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                const uid = uuidv4()
                const newTodos = { ...todos, [uid]: { id: uid, title: '', completed: false } }
                saveTodoList(todoList.id, { todos: newTodos })
                setTodos(newTodos)
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
