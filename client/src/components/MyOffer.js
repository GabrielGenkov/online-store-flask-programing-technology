import React, { useState } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import API from '../api'

export const MyOffer = ({offer, refreshOffers}) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        await API.delete(`offers/${offer.id}`)
        await refreshOffers()
    }

    return (
        <Card
            header={offer.title}
            meta={new Date(offer.publication_date).toDateString()}
            description={offer.description}
            extra={
                <div className="card-actions">
                    <Button inverted loading={loading} color="red" onClick={handleDelete}>
                        <Icon name='delete' /> Delete
                    </Button>
                    {offer.buyer &&
                        <span>
                            Bought by&nbsp;
                            {offer.buyer.username}
                        </span>
                    }
                    {!offer.buyer &&
                        <Button as={Link} to={`/profile/myoffers/${offer.id}/edit`} positive>
                            <Icon name='pencil alternate' /> Edit
                        </Button>
                    }
                </div>
            }
        />
    )
}