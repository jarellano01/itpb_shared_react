import React, {useState} from 'react'
import { useSpring, animated, to } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import {createUseStyles} from 'react-jss';
import './styles.css'
import * as R from 'ramda';
document.addEventListener('gesturestart', e => e.preventDefault())
document.addEventListener('gesturechange', e => e.preventDefault())

const getOffsets = (zoom, {width, height}, heightZoomFactor) => {
  const widthHalf = width / 2;
  const heightHalf = height / 2;
  const yOffset = heightHalf *  Math.max(zoom, heightZoomFactor) - heightHalf;
  const xOffset = widthHalf * Math.max(zoom, 1/heightZoomFactor) - widthHalf;
  return {xOffset: R.clamp(0, 10000, xOffset), yOffset: R.clamp(0, 10000, yOffset)}
};
const preventDragHandler = e => e.preventDefault();

const useStyles = createUseStyles({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8b8b8',
    cursor: 'pointer',
    // objectFit: 'contain',
  }
});

export default function PinchZoomPan({ img, initialDims }) {
  const classes = useStyles();
  const [imgDims, setImgDims] = useState({});
  const [objRatio, setObjRatio] = useState(1);
  const domTarget = React.useRef(null);

  const [{ x, y, zoom, scale }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    zoom: 0,
    scale: 1,
    immediate: true,
  }));
  const bind = useGesture(
    {
      onDrag: ({ movement, memo = [x.getValue(), y.getValue(), scale.getValue() + zoom.getValue()] }) => {
        const [x, y, zoom] = memo;
        const initalRatio = initialDims.height / initialDims.width;
        const heightZoomFactor = objRatio / initalRatio;
        const [xMovement, yMovement] = movement;
        const {xOffset, yOffset} = getOffsets(zoom, initialDims, heightZoomFactor);

        const newX = R.clamp(-xOffset, xOffset, x + xMovement);
        const newY = R.clamp(-yOffset, yOffset, y + yMovement);
        set({
          x: heightZoomFactor < zoom ? newX : 0 ,
          y: 1/heightZoomFactor < zoom ? newY: 0,
        });
        return memo
      },
      onPinch: ({ delta: [d, a], active, memo = [zoom.getValue()]}) => {
        const lowerBound = active ? -0.25 : 0;
        const upperBound = active ? 1.25 : 0.5;
        const normalizedNewZoom = (d / 100) + memo[0];

        const newZoom = {zoom: R.clamp(lowerBound, upperBound, normalizedNewZoom)};
        if(newZoom > 0) {
          newZoom.x = 0;
          newZoom.y = 0;
        }
        set(newZoom)
      }
    },
    { domTarget, event: { passive: false } }
  );
  const setImageDimensions = ({target: {offsetWidth: width, offsetHeight: height}}) => {
    const imgRatio = height / width;
    setObjRatio(imgRatio);
    setImgDims({objectFit: 'contain', width: '100%', height: '100%'})
  };

  React.useEffect(bind, [bind]);
  return (
    <animated.div style={initialDims} className={classes.main}>
      <animated.img
        onLoad={setImageDimensions}
        ref={domTarget}
        className={classes.imgWrapper}
        src={img}
        alt="test"
        onDragStart={preventDragHandler}
        style={{
          x,
          y,
          ...imgDims,
          scale: to([scale, zoom], (s, z) => s + z),
        }}
      />
    </animated.div>
  )
}
