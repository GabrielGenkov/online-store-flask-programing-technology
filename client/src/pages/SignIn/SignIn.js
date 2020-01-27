import React, { useState } from 'react'
import { Container, Button, Form, Message } from 'semantic-ui-react'

import API from '../../api'
import { Redirect } from 'react-router-dom'

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleSignIn = e => {
        e.preventDefault()
        setLoading(true)
        API.post("users", {email, password}).then(res => {
            setResponse(res)
            setLoading(false)
        }).catch(err => {
            setResponse(err.response)
            setLoading(false)
        })
    }   

    if(response && response.status === 200){
        sessionStorage.setItem("access_token", response.data.access_token)
        sessionStorage.setItem("refresh_token", response.data.refresh_token)
        return <Redirect to="/" />
    }

    return (
        <Container>
            <Form onSubmit={handleSignIn}>
                <Form.Input id="email" fluid type="email" onChange={e => setEmail(e.target.value)} label='Email' placeholder='Email' />
                <Form.Input id="password" fluid type="password" onChange={e => setPassword(e.target.value)} label='Password' placeholder='Password' />
                {response && 
                    <Message negative>
                        <Message.Header>Ooops!</Message.Header>
                        <p>{response.data.error.message}</p>
                    </Message>
                }
                <Button loading={loading} type='submit'>Sign In</Button>
            </Form>
        </Container>
    )
}

export default SignIn;