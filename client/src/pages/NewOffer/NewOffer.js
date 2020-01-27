import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
    Button,
    Form,
    Input,
    TextArea,
    Container,
    Icon
} from 'semantic-ui-react'

import API from '../../api'

const NewOffer = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0.0)
    const [description, setDescription] = useState("")

    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const handleAdd = async e => {
        e.preventDefault()
        setLoading(true)
        await API.post(`offers`, {title, price, description})
        history.push("/profile/myoffers")
    }
    
    return (
        <Container>
            <Form onSubmit={handleAdd}>
                <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    label='Title'
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Form.Field
                    control={Input}
                    label='Price'
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder='Price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                </Form.Group>
                <Form.Field
                    control={TextArea}
                    label='Description'
                    maxLength="1024"
                    placeholder='Description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}

                />
                <Form.Field loading={loading} control={Button} positive>
                    <Icon name='plus' /> Add offer
                </Form.Field>
            </Form>
        </Container>
    )
}

export default NewOffer;