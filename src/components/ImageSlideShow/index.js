import React from 'react'
import Card from "./card";
import { animated } from 'react-spring'
import useWindowSize from "../../hooks/useWindowSize";

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];
const Index = () => {
  const {height: initialHeight, width: initialWidth} = useWindowSize();
  console.log(initialHeight, initialWidth)
  return (
    <div id='root'>
        <animated.div className="animated-container">
          <animated.div className="carousel-container">
            <animated.div className="carousel-content" style={{width: initialWidth, height: initialHeight}}>
              <Card
                img={pages[1]}
                initialDims={{width: initialWidth, height: initialHeight}}
              />
            </animated.div>
          </animated.div>
        </animated.div>
    </div>
  )
};

export default Index;