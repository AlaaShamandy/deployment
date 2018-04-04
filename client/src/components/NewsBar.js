import React from 'react';
import Masonry from 'react-masonry-component';


export default function NewsBar(props) {
  const { newsCards } = { newsCards: props.newsCards };
  return (
    <Masonry className="my-gallery-class">
      {newsCards}
    </Masonry>
  );
}
