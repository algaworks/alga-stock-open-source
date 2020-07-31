import React, { useState } from 'react'
import Header from '../components/Header'
import Container from '../shared/Container'
import Form from '../shared/Form'
import Input from '../shared/Input'
import { Grid, Button } from '@material-ui/core'

const LoginView: React.FC = () => {
  const [credentials, setCredentials] = useState({ user: '', pass: '' })

  const handleFormSubmit = () => {
    console.log(credentials)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  return <div>
    <Header title="Login: Alga Stock" />
    <Container>
      <Form title="Login" onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              fullWidth
              onChange={handleInputChange}
              value={credentials.user}
              name="user"
              label="Username"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              onChange={handleInputChange}
              value={credentials.pass}
              name="pass"
              label="Password"
              type="password"
              required
            />
          </Grid>
          <Grid item xs={12} justify="flex-end">
            <Button type="submit" color="primary" variant="contained" >
              Login
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  </div>
}

export default LoginView
