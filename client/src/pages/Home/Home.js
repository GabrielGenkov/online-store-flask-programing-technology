import React, { useEffect, useState } from 'react';
import './Home.css'

import { PurchasableOffer } from '../../components/PurchasableOffer'
import API from '../../api'

import { Icon, Pagination, Input, Search } from 'semantic-ui-react'

const Home = () => {
    const [offers, setOffers] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [activePage, setActivePage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [search, setSearch] = useState("");

    const fetchOffers = async () => {
        setIsLoading(true);
        const res = await API.get("offers", {
            params: {
                search,
                page: activePage,
                count: itemsPerPage
            }
        });
        setOffers(res.data.offers)
        setPageCount(res.data.page_count);
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchOffers();
    }, [search, itemsPerPage, activePage]);
    
    const handleSearchChange = (e, {value}) => {
        setSearch(value)
    }

    const handlePageChange = (e, {activePage}) => {
        setActivePage(activePage);
    }
    
    return(
        <>
            <div className="container">
                <Search
                    loading={isLoading}
                    onSearchChange={handleSearchChange}
                    showNoResults={false}
                    value={search}
                />
            </div>
            <div className="container">
                {offers.map(offer => 
                    <PurchasableOffer key={offer.id} refreshOffers={fetchOffers} offer={offer}/>
                )}
                <Pagination
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    activePage={activePage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
                <Input type="number" min={5} max={50} value={itemsPerPage} onChange={e => setItemsPerPage(e.target.value)}/>
            </div>
        </>
    )
}

export default Home;