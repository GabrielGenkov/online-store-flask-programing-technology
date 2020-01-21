import React from 'react'
import { Container, Button, Form } from 'semantic-ui-react'


const SignIn = () => {
    return (
        <Container>
            <Form>
                <Form.Input fluid label='Username' placeholder='Username' />
                <Form.Input fluid type="password" label='Password' placeholder='Password' />
                <Button type='submit'>Sign In</Button>
            </Form>
        </Container>
    )
}

export default SignIn;