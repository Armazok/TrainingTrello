import {Checkbox, IconButton, ListItem} from '@mui/material'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import RemoveCircle from '@mui/icons-material/RemoveCircle'
import {ChangeEvent, FC, memo} from 'react'
import {removeTaskTC, updateTaskTC} from '../../tasks-reducer'
import {RequestStatusType, TaskStatuses, TaskType} from '../../../../types/types'
import {useAppDispatch} from '../../../../app/hooks'
import React from 'react'

type TaskPropsType = {
  task: TaskType
  todolistId: string
  entityStatus: RequestStatusType
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId, entityStatus}) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskTC(task.id, todolistId))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    dispatch(updateTaskTC(todolistId, task.id, {status}))
  }
  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC(todolistId, task.id, {title}))
  }

  const isDone = task.status === TaskStatuses.Completed

  const disabled = task.entityStatus === 'loading'

  return (
    <ListItem
      key={task.id}
      className={isDone ? 'isDone' : 'notIsDone'}
      style={{
        padding: '0px',
        justifyContent: 'space-between',
        textDecoration: isDone ? 'line-through' : 'none',
      }}
    >
      <Checkbox
        checked={isDone}
        onChange={changeTaskStatus}
        size={'small'}
        disabled={disabled}
      />
      <EditableSpan value={task.title}
                    onChange={changeTaskTitle}
                    disabled={disabled}
      />
      <IconButton onClick={removeTask}
                  disabled={disabled}
      >
        <RemoveCircle
          color={disabled ? 'disabled' : 'secondary'}
          fontSize={'small'}
        />
      </IconButton>
    </ListItem>
  )
})