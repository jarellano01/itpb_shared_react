import React, {useState} from 'react'
import { useSpring, animated, to } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import './styles.css'
import * as R from 'ramda'

// const boundaries = [-50, 250, 50, -250];

document.addEventListener('gesturestart', e => e.preventDefault())
document.addEventListener('gesturechange', e => e.preventDefault())

const getOffsets = (zoom, {width, height}) => {
  const widthHalf = width / 2;
  const heightHalf = height / 2;
  const yOffset = (heightHalf * zoom) - heightHalf;
  const xOffset = (widthHalf * zoom) - widthHalf;
  return {xOffset, yOffset}
};
const preventDragHandler = e => e.preventDefault();

export default function Card({ img, initialDims }) {
  const domTarget = React.useRef(null);

  const [{ x, y, zoom, scale, width, height }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    zoom: 0,
    scale: 1,
    immediate: true,
    ...initialDims,
  }));
  const bind = useGesture(
    {
      onDrag: ({ movement, memo = [x.getValue(), y.getValue(), scale.getValue() + zoom.getValue()] }) => {
        const zoom = memo[2];
        const {xOffset, yOffset} = getOffsets(zoom, initialDims);
        const newX = clamp(memo[0] + movement[0], -xOffset, xOffset);
        const newY = clamp(memo[1] + movement[1], -yOffset, yOffset);
        set({
          x: newX,
          y: newY,
        });
        return memo
      },
      onPinch: ({ offset: [d, a] }) => {
        const newZoom = Math.min(d / 100, .5);
        if(newZoom < 0) {
          set({ zoom: 0, x: 0, y: 0 })
        } else {
          set({zoom: newZoom})
        }
      }
    },
    { domTarget, event: { passive: false } }
  );
  React.useEffect(bind, [bind]);
  return (
    <animated.img
      ref={domTarget}
      className="img-wrapper"
      src={img}
      alt="test"
      onDragStart={preventDragHandler}
      style={{
        x,
        y,
        scale: to([scale, zoom], (s, z) => s + z),
        width,
        height
      }}>
    </animated.img>
  )
}
