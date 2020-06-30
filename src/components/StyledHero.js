import styled from 'styled-components';
import defaultBG from '../images/room-10.jpeg';

const StyledHero = styled.header`
    min-height: 60vh;
    background: url(${(props) => props.img || defaultBG}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default StyledHero;
