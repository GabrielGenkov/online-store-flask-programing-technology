import React, { useState} from 'react'
import { Container, Button, Form, Message } from 'semantic-ui-react'

import API from '../../api'
import { Redirect } from 'react-router-dom'

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState(null)

    const handleSignUp = e => {
        e.preventDefault()
        API.put("users", {username, email, password}).then(res => {
            setResponse(res)
        }).catch(err => {
            setResponse(err.response)
        })
    }   

    if(response && response.status === 200){
        return <Redirect to="/" />
    }
    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                <Form.Input id="username" onChange={e => setUsername(e.target.value)} fluid label='Username' placeholder='Username' />
                <Form.Input id="email" onChange={e => setEmail(e.target.value)} fluid type="email" label='Email' placeholder='Email' />
                <Form.Input id="password" onChange={e => setPassword(e.target.value)} fluid type="password" label='Password' placeholder='Password' />
                {response && 
                    <Message negative>
                        <Message.Header>Ooops!</Message.Header>
                        <p>{response.data.error.message}</p>
                    </Message>
                }
                <Button type='submit'>Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUp;