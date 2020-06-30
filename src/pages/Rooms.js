import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import RoomContainer from '../components/RoomContainer';

const Rooms = () => {
    return (
        <>
            <Hero hero="roomsHero">
                <Banner
                    title="Our Rooms"
                    subtitle="PROMO CODE of 15% 'STAYHOME15' "
                >
                    <Link to="/" className="btn-primary">
                        back to home
                    </Link>
                </Banner>
            </Hero>
            <RoomContainer />
        </>
    );
};

export default Rooms;
