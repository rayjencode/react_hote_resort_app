import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';

const getUnique = (items, value) => {
    return [...new Set(items.map((item) => item[value]))];
};

const RoomFilter = () => {
    const context = useContext(RoomContext);
    const {
        rooms,
        handleChange,
        roomType,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
    } = context;

    // Get Unique type
    let types = getUnique(rooms, 'type');
    types = ['all', ...types];
    types = types.map((type, index) => (
        <option value={type} key={index}>
            {type}
        </option>
    ));

    let capacities = getUnique(rooms, 'capacity');
    capacities = capacities.map((item, index) => (
        <option value={item} key={index}>
            {item}
        </option>
    ));

    return (
        <section className="filter-container">
            <Title title="Search Rooms" />

            <form className="filter-form">
                {/* Select Type */}

                <div className="form-group">
                    <label htmlFor="roomType">room type</label>
                    <select
                        name="roomType"
                        id="roomType"
                        value={roomType}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>

                {/* End of Select Type */}

                {/* Select Capacity */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {capacities}
                    </select>
                </div>

                {/* End of Capacity */}

                {/* price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input
                        type="range"
                        className="form-control"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                    />
                </div>
                {/* end price  */}

                {/* size  */}
                <div className="form-group">
                    <label htmlFor="size">room size SQFT</label>
                    <div className="size-nputs">
                        <input
                            type="number"
                            name="minSize"
                            id="size"
                            value={minSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                        <input
                            type="number"
                            name="maxSize"
                            id="size"
                            value={maxSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                    </div>
                </div>
                {/* end size  */}

                {/* extra checkbox  */}
                <div className="form-group">
                    <div className="single-extra">
                        <input
                            type="checkbox"
                            name="breakfast"
                            id="breakfast"
                            checked={breakfast}
                            onChange={handleChange}
                        />
                        <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input
                            type="checkbox"
                            name="pets"
                            id="pets"
                            checked={pets}
                            onChange={handleChange}
                        />
                        <label htmlFor="pets">Pets</label>
                    </div>
                </div>
                {/* end extra breakfast  */}
            </form>
        </section>
    );
};

export default RoomFilter;
