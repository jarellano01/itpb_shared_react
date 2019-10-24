import React, {useState} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlideShow from "../ImageSlideShow";
import {createUseStyles} from "react-jss";

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];

const useStyles = createUseStyles({
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
});

const ImageGridSlideShow = ({images}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const selectAndOpenSlideShow = (imageIndex) => {
    setSelectedImage(imageIndex);
    setIsOpen(true)
  };
  return (
    <div>
      <div className={classes.imageGrid}>
        {
          images.map((page, i) => {
            return (
              <img
                src={page}
                key={page}
                style={{
                  width: '200px',
                }}
                onClick={() => selectAndOpenSlideShow(i)}
              />
            )
          })
        }
      </div>
      <ImageSlideShow isOpen={isOpen} close={close} imageIndex={selectedImage} images={pages} />
    </div>
  )
};

export default ImageGridSlideShow;