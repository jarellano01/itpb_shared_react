import React, { useState } from 'react';
import { PhotoSwipeGallery } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import useWindowSize from "../../hooks/useWindowSize";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  main: {
    "& .pswp__img": {
      objectFit: 'contain'
    },
    "& .pswp-thumbnails": {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px'
    }
  }
});

function PhotoSwipeGallery2({
  items
}) {
  const dims = useWindowSize();
  const classes = useStyles();

  const gettingData = (ps, index, item) => {
    item.w = dims.width;
    item.h = dims.height;
  };

  const getDoubleTapZoom = (isMouseClick, item) => {
    if (isMouseClick) {
      return 2;
    } else {
      return item.initialZoomLevel < 0.7 ? 1 : 2;
    }
  };

  const getThumbnailContent = item => {
    return React.createElement("img", {
      src: item.thumbnail,
      style: {
        objectFit: 'contain',
        width: '100%'
      }
    });
  };

  const options = {
    preload: [1, 1],
    shareButtons: [{
      id: 'facebook',
      label: 'Share on Facebook',
      url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}'
    }, {
      id: 'twitter',
      label: 'Tweet',
      url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'
    }, {
      id: 'download',
      label: 'Download image',
      url: '{{raw_image_url}}',
      download: true
    }],
    getDoubleTapZoom: getDoubleTapZoom,
    closeOnScroll: false,
    fullscreenEl: false,
    allowPanToNext: true
  };
  return React.createElement("div", {
    className: classes.main
  }, React.createElement(PhotoSwipeGallery, {
    items: items,
    options: options,
    thumbnailContent: getThumbnailContent,
    gettingData: gettingData,
    getDoubleTapZoom: getDoubleTapZoom
  }));
}

export default PhotoSwipeGallery2;