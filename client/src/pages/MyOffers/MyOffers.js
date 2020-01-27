import React, { useEffect, useState } from 'react';
import './MyOffers.css'

import { MyOffer } from '../../components/MyOffer'
import API from '../../api'

const MyOffers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await API.get("items")
        setOffers(res.data)
    }

    return(
        <div className="container">
            {offers.map(offer => 
                <MyOffer key={offer.id} refreshOffers={fetchOffers} offer={offer}/>
            )}
        </div>
    )
}

export default MyOffers;