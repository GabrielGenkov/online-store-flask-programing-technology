import React from 'react'
import { Card } from 'semantic-ui-react'
import './PurchasedOffers.css'

const PurchasedOffers = () => {
    let test = {
        image: "https://picsum.photos/300/200",
        header: "Purchased offer",
        meta: "19.01.2020",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
    let cards = [1, 2, 3, 4, 5, 6, 7 , 8, 9, 10]
    return(
        <div className="container">
            {cards.map(i => 
                <Card
                    key={i}
                    image={test.image}
                    header={test.header}
                    meta={test.meta}
                    description={test.description}
                    // extra={extra}
                />
            )}
        </div>
    )
}

export default PurchasedOffers;