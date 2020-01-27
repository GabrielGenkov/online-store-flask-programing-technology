import React, { useEffect, useState } from 'react';

import { PurchasableOffer } from '../../components/PurchasableOffer'
import API from '../../api'

const PurchasedOffer = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await API.get("bought_items")
        setOffers(res.data)
    }
    
    return(
        <div className="container">
            {offers.map(offer => 
                <PurchasableOffer key={offer.id} refreshOffers={fetchOffers} offer={offer} disabled/>
            )}
        </div>
    )
}

export default PurchasedOffer;