import React, { useEffect, useState } from 'react'

import { useRouteMatch, useHistory } from 'react-router-dom'

import {
    Button,
    Form,
    Input,
    TextArea,
    Container,
    Icon
} from 'semantic-ui-react'

import API from '../../api'
  
const EditOffer = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0.0)
    const [description, setDescription] = useState("")

    const [deleteLoading, setDeleteLoading] = useState(false)

    const match = useRouteMatch("/profile/myoffers/:offer_id/edit")
    const history = useHistory()

    const handleDelete = async () => {
        setDeleteLoading(true)
        await API.delete(`offers/${match.params.offer_id}`)
        history.push("/profile/myoffers")

    }

    useEffect(() => {
        (async () => {
            const res = await API.get(`offers/${match.params.offer_id}`)
            setTitle(res.data.title)
            setPrice(res.data.price)
            setDescription(res.data.description)
        })()
    }, [])

    const handleSave = async e => {
        e.preventDefault()
        await API.put(`offers/${match.params.offer_id}`, {title, price, description})
        history.push("/profile/myoffers")
    }

    return (
        <Container>
            <Form onSubmit={handleSave}>
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
                <Form.Field control={Button} positive>
                    <Icon name='save' /> Save changes
                </Form.Field>
                <Button loading={deleteLoading} negative onClick={handleDelete}>
                    <Icon name='delete' /> Delete
                </Button>
            </Form>
        </Container>
    )
}


export default EditOffer;