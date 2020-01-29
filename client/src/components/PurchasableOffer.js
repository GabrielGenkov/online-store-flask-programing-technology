import React, { useState } from 'react';
import { Card, Icon, Button, Label, Message } from 'semantic-ui-react'

import API from '../api'

export const PurchasableOffer = ({offer, refreshOffers, disabled=false}) => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const handleBuy = () => {
        setLoading(true)
        API.post(`offers/${offer.id}/buy`).then(res => {
            refreshOffers()
        }).catch(err => {
            if(err.response.status === 400){
                setErrorMessage(err.response.data.error.message)
            }
            setLoading(false)
        })
    }

    return (
        <Card
            header={offer.title}
            meta={new Date(offer.publication_date).toDateString()}
            description={offer.description}
            extra={
                <>  
                    {errorMessage &&
                        <Message negative>
                            <Message.Header>Ooops!</Message.Header>
                            <p>{errorMessage}</p>
                        </Message>
                    }
                    <div className="card-actions">
                        <Button as='div' labelPosition='right'>
                            <Button loading={loading} positive animated="vertical" onClick={handleBuy} disabled={disabled}>
                                <Button.Content hidden>Buy</Button.Content>
                                <Button.Content visible>
                                    <Icon name='shop' />
                                </Button.Content>
                            </Button>
                            <Label basic color="green" pointing='left'>
                                ${offer.price.toFixed(2)}
                            </Label>
                        </Button>
                        <span>
                            <Icon name='user' />
                            {offer.author.username}
                        </span>
                    </div>
                </>
            }
        />
    )
}