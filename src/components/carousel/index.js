import React, { useState, useEffect } from 'react';
import Uploader from '../uploader/index';
import Modal from '../modal/index';
import './carousel.css';


function Carousel() {
    const [carouselItems, setCarouselItems] = useState([]);
    const [activeItems, setActiveItems] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const carouselRefs = [];

    useEffect(async () => {
        const response = await fetch('../__mocks__/carousel.json');
        const data = await response.json();        
        const item = data.slice(0, 1);
        setCarouselItems(data);
        setActiveItems(item);
    }, [])

    const getItemByIndex = (index) => {
        return carouselItems.find((item, idx) => index === idx)
    }

    const next = () => {
        const item = getItemByIndex(nextIndex);
        if (!activeItems.find(eitem => item.id === eitem.id)) {
            const updated = [...activeItems, item];
            setActiveItems(updated);
        }
        setCurrentIndex(nextIndex);
        setNextIndex(nextIndex + 1);
        const firstItem = getItemByIndex(currentIndex);
        carouselRefs[firstItem.id].style.marginLeft = "-100%";

    }

    const prev = () => {
        setCurrentIndex(currentIndex - 1);
        setNextIndex(currentIndex);
        const firstItem = getItemByIndex(currentIndex - 1);
        carouselRefs[firstItem.id].style.marginLeft = "0";
    }

    const handleFileUpload = (item) => {
        const updatedCarouselItems = [...carouselItems];        
        const updatedActiveItems = [...activeItems];
        updatedCarouselItems.splice(currentIndex, 0, item);
        updatedActiveItems.splice(currentIndex, 0, item);
        setCarouselItems(updatedCarouselItems);
        setActiveItems(updatedActiveItems);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className="carousel-container">
                <div className="carousel-content">
                    {
                        activeItems.map((item) => {
                            return (
                                <div key={item.id} ref={content => carouselRefs[item.id] = content} className="carousel-item" onClick={() => { setShowModal(true) }}>
                                    <img alt={item.title} src={item.url} className="carousel-image" />
                                </div>
                            )
                        })
                    }

                </div>
                <button className="prev" disabled={currentIndex === 0} onClick={prev}>&#8249;</button>
                <button className="next" disabled={nextIndex === carouselItems.length} onClick={next}>&#8250;</button>
            </div>
            <Uploader handleFileUpload={handleFileUpload} />
            {showModal && <Modal item={getItemByIndex(currentIndex)} handleClose={handleClose} />}
        </>
    )
}

export default Carousel;