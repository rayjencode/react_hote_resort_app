import React, { Component } from 'react';
import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        roomType: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false,
    };

    // Get Data
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'beachResortRoom',
            });

            // console.log(response.items);

            // let rooms = this.formatData(response.items);
            let rooms = this.formatData(items);
            let maxPrice = Math.max(...rooms.map((item) => item.price));
            let maxSize = Math.max(...rooms.map((item) => item.size));

            this.setState({
                rooms: rooms.sort((item) => -item.price),
                sortedRooms: rooms,
                featuredRooms: rooms.filter((item) => item.featured === true),
                loading: false,
                price: maxPrice,
                maxPrice,
                size: maxSize,
                maxSize,
            });

            return response;
        } catch (error) {
            console.log((`error`, error));
        }
    };

    componentDidMount() {
        // Get Data
        this.getData();
    }

    formatData(items) {
        let tempItems = items.map((item) => {
            let id = item.sys.id;
            let images = item.fields.images.map((image) => {
                return image.fields.file.url;
            });

            let room = { ...item.fields, images, id };

            return room;
        });

        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        let room = tempRooms.find((room) => room.slug === slug);

        return room;
    };

    handleChange = (e) => {
        // const type = e.target.type;
        // const name = e.target.name;
        // const value = e.target.value;

        const target = e.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // console.log(target, value, name);

        this.setState(
            {
                [name]: value,
            },
            this.filterRooms
        );
    };

    filterRooms = () => {
        let {
            rooms,
            roomType,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets,
        } = this.state;

        let tempRooms = [...rooms];
        capacity = parseInt(capacity);
        price = parseInt(price);

        // Filter Room Type
        if (roomType !== 'all') {
            tempRooms = tempRooms.filter((item) => item.type === roomType);
        }

        // Filter Room Capacity
        if (capacity.length !== 0) {
            tempRooms = tempRooms.filter((item) => item.capacity >= capacity);
        }

        // Filter Room Price
        tempRooms = tempRooms.filter((item) => item.price <= price);

        // Filter Room Size
        tempRooms = tempRooms.filter(
            (item) => item.size >= minSize && item.size <= maxSize
        );

        // Filter Breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter((item) => item.breakfast === true);
        }
        // Filter pets
        if (pets) {
            tempRooms = tempRooms.filter((item) => item.pets === true);
        }

        this.setState({
            sortedRooms: tempRooms,
        });
    };

    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange,
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
