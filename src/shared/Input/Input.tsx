import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'

const Input: React.FC<TextFieldProps> = (props) => {
  return <TextField
    {...props}
  />
}

export default Input