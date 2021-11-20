import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Tab, Tabs } from '@material-ui/core';
import OffersTabs from './OffersTabs';
import StagesTab from './StagesTab';
import FormalitiesTab from './FormalitiesTab';
import { OffersContext } from 'Contexts/OffersContext';
import { removeKeyIncludingString } from 'Utils/objectMethods';
import { a11yProps } from 'components/common/TabPanel';
import { handleCatch, makeReq } from 'Utils/makeReq';

const useStyles = makeStyles((theme) => ({
  options: {
    backgroundColor: '#f2f2f2',
    height: '100%',
  },
  rootContainer: {
    '&.css-19kzrtu': {
      padding: '10px',
    },
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '1rem',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  root: {
    '& .css-cnltht-MuiTableCell-root': {
      padding: '8px',
    },
  },
  tabRoot: {
    '&.MuiTab-root': {
      // color: 'white',
      // backgroundColor: '#46B9F6',
    },
  },
  inputBox: {
    border: 0,
    outline: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: '1rem',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  stageDialog: {
    '& .MuiPaper-root': {
      maxWidth: '90%',
    },
  },
  cover: {
    width: '10rem',
    height: '6rem',
    borderRadius: '5px',
  },
  imgBackground: {
    backgroundColor: '#808080',
    borderRadius: '10px',
    width: '10rem',
    padding: '0.5rem',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
    },
  },
  dashes: {
    border: `2px dashed #fff`,
    borderRadius: '10px',
  },
  image: {
    height: '8rem',
    width: '10rem',
    [theme.breakpoints.up('lg')]: {
      width: '15rem',
      height: '10rem',
    },
  },
  carouselImages: {
    width: '12rem',
    height: '12rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  offerImage: {
    width: '17rem',
    height: '14rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  stageImage: {
    width: '24rem',
    height: '18rem',
    [theme.breakpoints.down('lg')]: {
      width: '14rem',
      height: '12rem',
    },
  },

  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    padding: '1rem',
  },
  dateFields: {
    backgroundColor: '#fff',
    width: '40%',
    [theme.breakpoints.down('lg')]: {
      width: '48%',
    },
  },
}));

const CreateOffer = () => {
  const classes = useStyles();
  const { createOffer } = useContext(OffersContext);
  const [formalities, setFormalities] = useState([]);

  // TODO Edit it to 0
  const [value, setValue] = useState(0);

  const [state, setState] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/formalities`);
        setFormalities(resData.formalities);
      } catch (err) {
        handleCatch(err);
      }
    })();
  }, []);

  const gotoNextStep = () => {
    setValue((st) => st + 1);
  };

  const validateOffersTab = (data, resetData) => {
    // console.log(`data`, data);
    setState(data);
    gotoNextStep();
  };

  const validateStagesTab = (data, resetData) => {
    // console.log(`data`, data);
    setState((st) => ({ ...st, stages: data }));
    gotoNextStep();
  };

  const validateFormalitiesTab = (data, resetData) => {
    // console.log(`data`, data);
    // setState((st) => ({ ...st, formalities: data }));
    let newOffer = {
      ...state,
      formality: data.formality,
    };

    // console.log(`newOffer before`, newOffer);

    // * Fix Services
    let servicesArr = Object.entries(newOffer.services);
    servicesArr = servicesArr.filter(([key, value]) => !!value);
    servicesArr = servicesArr.map(([key, val]) => key);
    newOffer = {
      ...newOffer,
      services: servicesArr,
    };

    // * If No dates, no need to send starting and ending date
    if (newOffer.isDates === 'no') {
      removeKeyIncludingString(newOffer, 'startingDate');
      removeKeyIncludingString(newOffer, 'endingDate');
    }
    // * Same with place
    if (newOffer.isDeparturePlace === 'no') {
      removeKeyIncludingString(newOffer, 'departurePlace');
      removeKeyIncludingString(newOffer, 'destination');
    }
    removeKeyIncludingString(newOffer, 'isDates');
    removeKeyIncludingString(newOffer, 'isDeparturePlace');

    // * Change Country and Region from  { code: 'AD', label: 'Andorra', phone: '376' } to 'Andorra'
    newOffer.country = newOffer.country.label;
    newOffer.region = newOffer.region.label;
    // console.log(`newOffer.region.label`, newOffer.region.label);

    // console.log(`newOffer after`, newOffer);

    // console.log(`newOffer after`, newOffer);
    createOffer(newOffer);
    // gotoNextStep();
  };

  return (
    <div style={{ margin: '3rem 0rem 1rem' }}>
      <Box
        style={{
          minHeight: '25rem',
          margin: '2rem 1rem 0rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              // onChange={(newValue) => setValue(newValue)}
              aria-label='basic tabs example'
              indicatorColor='primary'
              centered
            >
              <Tab
                disableFocusRipple
                disableRipple
                sx={{ cursor: 'unset' }}
                label='Offer'
                {...a11yProps(0)}
                className={classes.tabRoot}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Stages'
                sx={{ cursor: 'unset' }}
                {...a11yProps(1)}
              />
              <Tab
                disableFocusRipple
                disableRipple
                label='Formalities'
                sx={{ cursor: 'unset' }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>

          {/*  map the Product */}

          <Box>
            <OffersTabs
              handleNext={validateOffersTab}
              value={value}
              classes={classes}
            />
            <StagesTab
              handleSubmit={validateStagesTab}
              value={value}
              classes={classes}
            />
            <FormalitiesTab
              value={value}
              classes={classes}
              handleNext={validateFormalitiesTab}
              formalities={formalities}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateOffer;
