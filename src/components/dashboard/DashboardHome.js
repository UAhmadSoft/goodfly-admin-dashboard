import React, { useContext, useState } from 'react';

// * MUI ----------------
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Badge,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  Add,
  Work,
  ViewList,
  Loyalty,
  Storefront,
  Description,
} from '@material-ui/icons';
//  -------------------- //
import { Plus as PlusIcon, File as FileIcon } from 'react-feather';
import LineChart from './LineChart';
import Person from '@material-ui/icons/Person';

import {
  fbSvg,
  instagramSvg,
  snapchatSvg,
  pinterestSvg,
  telegramSvg,
  twitterSvg,
  youtubeSvg,
} from 'Assets/img';

import useStyles from './DashboardHomeStyles';
import { ReactSVG } from 'react-svg';
import useTextInput from 'hooks/useTextInput';
import CreateCard from './CreateCard';
import { AuthContext } from 'Contexts/AuthContext';
import { OrderContext } from 'Contexts/OrderContext';
import { OffersContext } from 'Contexts/OffersContext';
import { ReservationsContext } from 'Contexts/ReservationsContext';
import { CustomersContext } from 'Contexts/CustomersContext';

const DashboardHome = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { customers } = useContext(CustomersContext);
  const { orders } = useContext(OrderContext);
  const { offers, customOffers } = useContext(OffersContext);
  const { reservations } = useContext(ReservationsContext);

  // TODO add mesages, comments...

  const [clientNumber, handleTxtChange] = useTextInput('');
  const [searchBy, setSearchBy] = useState('plane');

  const handleChange = (event, nextView) => {
    setSearchBy(nextView);
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 900 }} mb={8} mt={2}>
        <Typography variant='h5' color='textSecondary' gutterBottom>
          Welcome to goodgly Dashboard . {user?.fullName}
        </Typography>
        <Typography
          variant='h5'
          fontWeight='normal'
          color='textSecondary'
        >
          Welcome to goodfly Dashboard . Hope you are going good .
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='space-evenly'
        alignItems='center'
        gap='20px'
        flexWrap='wrap'
        sx={{
          padding: '19px 20px',
          background: '#f2f2f2f2',
          borderRadius: '0.5rem',
        }}
      >
        <Box className={classes.Card}>
          <Typography variant='h5' gutterBottom>
            Add/Create
          </Typography>
          <Box className={classes.MiniCard}>
            <Box className={classes.image}>
              <Box>
                <Add
                  size={35}
                  style={{ color: '#cccccc', fontSize: '90px' }}
                />
                {/* <Icon size={35} style={{ color: '#fff' }} /> */}
              </Box>
              <Typography style={{ color: '#fff' }}>
                {/* {secondarytext} */}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CreateCard
          link='/app/customers/new'
          classes={classes}
          Icon={Person}
          primaryText='Manage Client'
          secondarytext='New Client'
        />
        <CreateCard
          link='/app/offers/createOffer'
          classes={classes}
          Icon={Loyalty}
          primaryText='Manage Offer'
          secondarytext='New Offer'
        />
        <CreateCard
          link='/app/products/create'
          classes={classes}
          Icon={Storefront}
          primaryText='Manage Product'
          secondarytext='New Product'
        />
        <CreateCard
          link='/app/blogs/create'
          classes={classes}
          Icon={Description}
          primaryText='Manage Article'
          secondarytext='New Blog'
        />
      </Box>

      <Grid container sx={{ mt: 5 }} spacing={1}>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            backgroundColor: '#f2f2f2',
            borderRadius: '0.5rem',
            height: 290,
          }}
        >
          <LineChart reservations={reservations} orders={orders} />
        </Grid>
        <Grid
          sx={{
            paddingTop: '0px !important',
            paddingBottom: '0px !important',
            minHeight: '290px',
            borderRadius: '0.5rem',
          }}
          item
          xs={12}
          sm={4}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              rowGap: '18px',
              background: '#f2f2f2f2',
              padding: '19px 20px',
              borderRadius: '0.5rem',
              height: '100%',
            }}
          >
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                Reservations
              </Typography>

              <Badge
                badgeContent={orders?.length || 0}
                className={classes.Badge}
                style={{ border: '2px solid red' }}
                color='primary'
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                Tailor-Made Trips
              </Typography>
              <Badge
                badgeContent={customOffers?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                Store Orders
              </Typography>
              <Badge
                badgeContent={reservations?.length || 0}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                Product Reviews
              </Typography>
              <Badge
                badgeContent={45}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                Travels Reviews
              </Typography>
              <Badge
                badgeContent={122}
                color='primary'
                className={classes.Badge}
              />
            </Box>
            <Box className={classes.InfoItem}>
              <Typography variant='h5' color='InfoText'>
                Blog Comments
              </Typography>
              <Badge
                badgeContent={112}
                color='primary'
                className={classes.Badge}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }} spacing={1}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            backgroundColor: '#f2f2f2',
            borderRadius: '0.5rem',
          }}
        >
          <Box
            style={{
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box className={classes.InfoButtonGrid}>
              <Box className={classes.InfoButton}>
                <Typography variant='h5'>Goodfly Clients</Typography>
                <Button
                  size='large'
                  variant='contained'
                  fullWidth
                  color='primary'
                  startIcon={<Person />}
                >
                  {customers?.length || 0}
                </Button>
              </Box>
              <Box className={classes.InfoButton}>
                <Typography variant='h5'>Store Orders</Typography>
                <Button
                  size='large'
                  variant='contained'
                  fullWidth
                  color='primary'
                  startIcon={<Work />}
                >
                  {orders?.length || 0}
                </Button>
              </Box>
            </Box>
            <Box className={classes.FollowersGrid}>
              <Typography variant='h5'>Followers</Typography>
              <Box py={2} px={3} className={classes.SocialIcons}>
                <Box>
                  <ReactSVG src={fbSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={instagramSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={snapchatSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={pinterestSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={telegramSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={twitterSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
                <Box>
                  <ReactSVG src={youtubeSvg} />
                  <Typography variant='h6'>10.1K</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ paddingTop: 0, borderRadius: '0.5rem' }}
        >
          <Box className={classes.ActionsGrid}>
            <Box>
              <Typography variant='h5' style={{ color: '#828282' }}>
                Find a Client
              </Typography>
              <TextField
                hiddenLabel
                id='filled-hidden-label-small'
                size='small'
                className={classes.textInput}
                color='primary'
                value={clientNumber}
                onChange={handleTxtChange}
                label='by name or file '
              />
            </Box>
            <ToggleButtonGroup
              orientation='vertical'
              value={searchBy}
              exclusive
              onChange={handleChange}
              style={{ borderLeft: '2px solid #ccc' }}
            >
              <ToggleButton
                sx={{ border: 0 }}
                value='plane'
                aria-label='plane'
              >
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color: searchBy === 'plane' ? '#46B9F6' : '#000',
                    borderColor:
                      searchBy === 'plane' ? '#46B9F6' : '#000',
                  }}
                >
                  Find a plane ticket
                </Button>
              </ToggleButton>
              <ToggleButton
                sx={{ border: 0 }}
                value='boat'
                aria-label='boat'
              >
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color: searchBy === 'boat' ? '#46B9F6' : '#000',
                    borderColor:
                      searchBy === 'boat' ? '#46B9F6' : '#000',
                  }}
                >
                  Find a boat ticket
                </Button>
              </ToggleButton>
              <ToggleButton
                sx={{ border: 0 }}
                value='reservation'
                aria-label='reservation'
              >
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color:
                      searchBy === 'reservation' ? '#46B9F6' : '#000',
                    borderColor:
                      searchBy === 'reservation' ? '#46B9F6' : '#000',
                  }}
                >
                  Find A Reservation
                </Button>
              </ToggleButton>
              <ToggleButton
                sx={{ border: 0 }}
                value='vehicle'
                aria-label='vehicle'
              >
                <Button
                  disableRipple
                  fullWidth
                  disableFocusRipple
                  size={'small'}
                  variant='outlined'
                  sx={{
                    color:
                      searchBy === 'vehicle' ? '#46B9F6' : '#000',
                    borderColor:
                      searchBy === 'vehicle' ? '#46B9F6' : '#000',
                  }}
                >
                  Find a vehicle rental
                </Button>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardHome;
