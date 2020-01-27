import React, { useEffect, useState } from 'react';
import './Home.css'

import API from '../../api'
import{ Card } from 'semantic-ui-react';

const Home = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await API.get("offers")
            console.log(res.data)
            setOffers(res.data)
        })()
    }, [])
    
    return(
        <div className="container">
            {offers.map(offer => 
                <Card
                    key={offer.id}
                    header={offer.title}
                    meta={new Date(offer.publication_date).toDateString()}
                    description={offer.description}
                />
            )}
        </div>
    )
}

export default Home;