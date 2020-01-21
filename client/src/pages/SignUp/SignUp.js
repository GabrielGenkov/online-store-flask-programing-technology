import React from 'react'
import { Container, Button, Form } from 'semantic-ui-react'


const SignUp = () => {
    return (
        <Container>
            <Form>
                <Form.Input fluid label='Username' placeholder='Username' />
                <Form.Input fluid type="email" label='Email' placeholder='Email' />
                <Form.Input fluid type="password" label='Password' placeholder='Password' />
                <Button type='submit'>Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUp;