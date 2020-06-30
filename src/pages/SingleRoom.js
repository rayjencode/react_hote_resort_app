import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultBG from '../images/room-9.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';
import { FaCheckSquare } from 'react-icons/fa';
import { RoomContext } from '../context';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBG,
            mainBG: '',
        };
    }

    static contextType = RoomContext;

    componentDidMount() {}

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);

        if (!room) {
            return (
                <div className="error">
                    <h3>No such room could be found</h3>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </div>
            );
        }

        const {
            name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images,
        } = room;

        const handleChange = (e) => {
            this.setState({
                mainBG: e.target.src,
            });
        };

        return (
            <>
                <StyledHero img={images[0]}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            Back to Rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-mainImages">
                        <img src={this.state.mainBG || images[0]} alt={name} />
                    </div>
                    <div className="single-room-images">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={name}
                                onClick={(e) => handleChange(e)}
                            />
                        ))}
                    </div>
                    <div className="single-room-info">
                        <article className="description">
                            <h3>Details </h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Info</h3>
                            <h6>price: ${price}</h6>
                            <h6>Size: {size} SQFT</h6>
                            <h6>
                                max capacity :{' '}
                                {capacity > 1
                                    ? `${capacity} people`
                                    : `${capacity} person`}
                            </h6>
                            <h6>{pets ? `pets allowed` : `No pets allowed`}</h6>
                            <h6>
                                {breakfast &&
                                    'free breakfast included included'}
                            </h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>

                    <ul className="extras">
                        {extras.map((item, index) => (
                            <li key={index}>
                                {' '}
                                <FaCheckSquare className="fafaicon" /> {item}
                            </li>
                        ))}
                    </ul>
                </section>
            </>
        );
    }
}
