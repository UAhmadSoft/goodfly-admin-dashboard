import React, { useContext } from 'react';

import { Container } from '@material-ui/core';

import { OffersContext } from 'Contexts/OffersContext';
import SpecialOffers from './specialOffers';

const ArchieveOffers = () => {
  const { offers } = useContext(OffersContext);

  return (
    <Container style={{ marginTop: '3rem' }}>
      <SpecialOffers
        offers={offers?.filter((offer) => offer.archieve)}
        title='Archieved Offers'
        carouselTitle='Archieve'
      />
    </Container>
  );
};

export default ArchieveOffers;
