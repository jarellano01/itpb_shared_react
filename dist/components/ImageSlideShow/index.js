import React, { useEffect, useRef } from 'react';
import useWindowSize from "../../hooks/useWindowSize";
import PinchZoomPan from "../PinchZoomPan";
import Slider from "react-slick";
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const useStyles = createUseStyles({
  main: {
    visibility: 'hidden',
    position: "fixed",
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.3s linear'
  },
  isOpen: {
    visibility: 'visible',
    opacity: 1
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  slider: {
    height: '100vh'
  }
});

const ImageSlideShow = ({
  isOpen,
  close,
  imageIndex = 0,
  images
}) => {
  const classes = useStyles();
  const {
    height: initialHeight,
    width: initialWidth
  } = useWindowSize();
  const sliderRef = useRef();
  useEffect(() => {
    sliderRef.current.slickGoTo(imageIndex, true);
  }, [imageIndex]);
  return React.createElement("div", {
    className: classNames(classes.main, isOpen && classes.isOpen)
  }, React.createElement(Slider, {
    ref: sliderRef,
    className: classes.slider
  }, images.map(page => {
    return React.createElement(PinchZoomPan, {
      img: page,
      key: page,
      initialDims: {
        width: initialWidth,
        height: initialHeight
      }
    });
  })), React.createElement("button", {
    className: classes.close,
    onClick: close
  }, "X"));
};

export default ImageSlideShow;