import React from 'react';
import PhotoSwipeGallery from "../components/PhotoSwipeGallery";
import {images} from '../components/images'

console.log(images)
const CDN_URL = 'https://d1mzzbx2i0sary.cloudfront.net';
const getImageLink = (imageId, thumb=false) => {
  const key = images.images[imageId][!thumb ? 's3Key': 's3KeyThumb'];
  return `${CDN_URL}/${key}`
};
const imageIds = [
  "SampleEvent/Originals/2019102036584B",
  "SampleEvent/Originals/2019102036584C",
  "SampleEvent/Originals/2019102036584D",
  "SampleEvent/Originals/2019102036584A",
  "SampleEvent/Originals/2019102036311C",
  "SampleEvent/Originals/2019102036311B",
  "SampleEvent/Originals/2019102036311D",
  "SampleEvent/Originals/2019102036311A",
  "SampleEvent/Originals/2019101567961B",
  "SampleEvent/Originals/2019101567961C",
  "SampleEvent/Originals/2019101567961A",
  "SampleEvent/Originals/2019101567961D",
  "SampleEvent/Originals/2019101567845C",
  "SampleEvent/Originals/2019101567845A",
  "SampleEvent/Originals/2019101567845D",
  "SampleEvent/Originals/2019101567845B",
  "SampleEvent/Originals/2019101567603A",
  "SampleEvent/Originals/2019101567603B",
  "SampleEvent/Originals/2019101567603D",
  "SampleEvent/Originals/2019101567603C",
  "SampleEvent/Originals/2019101567434B",
  "SampleEvent/Originals/2019101567434A",
  "SampleEvent/Originals/2019101567434D",
  "SampleEvent/Originals/2019101567434C",
  "SampleEvent/Originals/2019101567187A",
  "SampleEvent/Originals/2019101567187B",
  "SampleEvent/Originals/2019101567187C",
  "SampleEvent/Originals/2019101567187D",
  "SampleEvent/Originals/2019101566568B",
];

const items = imageIds.map(imageId => ({
  src: getImageLink(imageId),
  thumbnail: getImageLink(imageId, true)
}));

export default {
  title: 'PhotoSwipeGallery',
};

export const PhotoSwipeGalleryDemo = () => {
  console.log(items)
  return (
    <PhotoSwipeGallery items={items} />
  )
};
