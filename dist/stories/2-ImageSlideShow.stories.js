import React from 'react';
import PinchZoomPanExample from '../components/PinchZoomPan/sample';
import ImageSlideShow from '../components/ImageSlideShow';
import ImageGridSlideShow from "../components/ImageGridSlideShow";
const pages = ['https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'];
export default {
  title: 'ImageSlideShow'
};
export const PinchZoomPan = () => {
  return React.createElement(PinchZoomPanExample, {
    img: pages[1],
    initialDims: {
      height: 500,
      width: 500
    }
  });
};
export const slideShow = () => {
  return React.createElement(ImageSlideShow, {
    images: pages,
    isOpen: true
  });
};
export const clickSlideShow = () => {
  return React.createElement(ImageGridSlideShow, {
    images: pages
  });
};