// import useForm from '@app/Hooks/useForm';
// import { useAgency } from '@app/Stores/services/agency/agency';
// import { useCustomer } from '@app/Stores/services/customer/customer';
// import { resultCreateGdsDataType, useFeedGds } from '@app/Stores/services/feed-gds/feed-gds';
// import { useFeedUs } from '@app/Stores/services/feed-xapi/feed-us';
// import UIButton from '@app/ui/button/UIbutton';
// import UILinkButton from '@app/ui/button/UILinkButton';
// import UIAutoComplete from '@app/ui/inputs/UIAutoComplete';
// import UIInput from '@app/ui/inputs/UIInput';
// import UILoader from '@app/ui/loader/UILoader';
// import UITableContainer from '@app/ui/table/UITableContainer';
// import { Box, Grid, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';

// interface gdsFeed {
//   setDrawerOpen(value: boolean): void;
//   setShowImportantSpecs(value: boolean): void;
//   showImportantSpecs: boolean;
// }

// const InitiateGdsForm = ({ setDrawerOpen, setShowImportantSpecs, showImportantSpecs }: gdsFeed) => {
//   const [gdsFeedTable, setGdsFeedTable] = useState<
//     { label: string; value: string | number }[] | undefined
//   >([]);
//   const { getCustomers, customers } = useCustomer();
//   const { agencies, getAgencies } = useAgency();
//   const { gdsdata, getGDSDatasource, ISOSPccData, getISOSPcc, getCountries, getCountriesData } =
//     useFeedUs();
//   const { postCreateGdsFeed } = useFeedGds();

//   const [showTable, setShowTable] = useState(false);

//   const initiateGdsForm = {
//     selectedCustomer: null,
//     selectedCountry: null,
//     selectedAgency: null,
//     gds: null,
//     isosPcc: null,
//     liveQueueNumber: '',
//     liveQueueCategory: '',
//     testQueueNumber: '',
//     testQueueCategory: '',
//     agencyPcc: '',
//   };

//   const validationSchema = Yup.object({
//     selectedCustomer: Yup.object().required('Customer is required'),
//     selectedCountry: Yup.object().required('Country is required'),
//     selectedAgency: Yup.object().required('Agency is required'),
//     gds: Yup.string().required('Gds is required'),
//     isosPcc: Yup.string().required('ISOS Pcc is required'),
//     liveQueueNumber: Yup.string().required('Live Queue Number is required'),
//     liveQueueCategory: Yup.string().required('Live Queue Category Name is required'),
//     testQueueNumber: Yup.string().required('Test Queue Number is required'),
//     testQueueCategory: Yup.string().required('Test Queue Category is required'),
//     agencyPcc: Yup.string().required('Agency Pcc is required'),
//   });

//   const { values, errors, handleChange, handleAutocompleteChange, validate } = useForm({
//     initialValues: initiateGdsForm,
//     validationSchema,
//   });

//   const handleDrawerOpen = () => setDrawerOpen(true);
//   const handleShowImportantSpecs = () => setShowImportantSpecs(!showImportantSpecs);

//   const intitateGdsFeedSubmitHandler = async () => {
//     const data = {
//       customer: values.selectedCustomer?.salesforceId,
//       salesforceAccountId: Number(values.selectedCustomer?.salesforceId),
//       country: values.selectedCountry?.countryname,
//       agency: values.selectedAgency?.agencyName,
//       gds: values.gds,
//       isosPcc: values.isosPcc,
//       liveQueueNumber: values.liveQueueNumber,
//       liveQueueCategory: values.liveQueueCategory,
//       testQueueNumber: values.testQueueNumber,
//       testQueueCategory: values.testQueueCategory,
//       agencyPcc: values.agencyPcc,
//       fastUserId: localStorage.getItem('email'),
//       isSkip: true,
//     };

//     try {
//       await validate();
//       const result: resultCreateGdsDataType = await postCreateGdsFeed(data);
//       setGdsFeedTable([
//         { label: 'Generated Feed ID', value: result?.feedId },
//         { label: 'Feed Name', value: result?.feedName },
//         { label: 'Live Queue Number', value: result?.liveQueueId },
//         { label: 'Live Queue Category', value: result?.liveQueueName },
//         { label: 'Agency Pcc', value: result?.agencyPcc },
//       ]);
//       toast.success('Successfully created gds feed');
//       setShowTable(true);
//     } catch (error: any) {
//       console.log(error, 'gds error');
//       toast.error(error?.data?.errorMessage ? error.data.errorMessage : error.data.message);
//     }
//     //   postCreateGdsFeed(data);
//   };

//   useEffect(() => {
//     if (agencies == null) {
//       getAgencies();
//     }
//     if (gdsdata == null) {
//       getGDSDatasource();
//     }
//     if (ISOSPccData == null) {
//       getISOSPcc();
//     }
//     if (customers == null) {
//       getCustomers();
//     }
//     if (getCountriesData == null) {
//       getCountries();
//     }
//   }, []);

//   if (!agencies || !gdsdata || !ISOSPccData || !customers || !getCountriesData) {
//     return <UILoader />;
//   }

//   return (
//     <>
//       <Box display={'flex'} gap={5} mt='1rem' ml={0}>
//         <Grid container width={'50%'} rowSpacing={8} columnSpacing={8}>
//           <Grid item xs={12} sm={12} md={12}>
//             <UIAutoComplete
//               renderData={customers}
//               targetOption='salesforceId'
//               label='Customer'
//               handleChange={handleAutocompleteChange('selectedCustomer')}
//             />
//             {errors?.selectedCustomer && (
//               <Typography color={'red'}>{errors.selectedCustomer}</Typography>
//             )}
//           </Grid>
//           <Grid item xs={12} sm={12} md={12}>
//             <UIAutoComplete
//               renderData={getCountriesData}
//               handleChange={handleAutocompleteChange('selectedCountry')}
//               targetOption='countryname'
//               label='Country'
//             />
//             {errors?.selectedCountry && (
//               <Typography color={'red'}>{errors.selectedCountry}</Typography>
//             )}
//           </Grid>
//           <Grid item xs={12} sm={12} md={12}>
//             <Grid container display='flex' justifyContent='space-between'>
//               <Grid item>
//                 <Typography
//                   variant='body2'
//                   sx={{
//                     fontSize: '0.9rem',
//                     fontWeight: 600,
//                     mb: '0.5rem',
//                     letterSpacing: '0.55px',
//                   }}>
//                   Agency <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography
//                   onClick={handleDrawerOpen}
//                   sx={{
//                     ml: 1,
//                     color: '#1665D8',
//                     display: 'flex',
//                     alignItems: 'center',
//                     fontSize: '0.75rem',
//                     textDecoration: 'underline',
//                     cursor: 'pointer',
//                   }}>
//                   + Add New
//                 </Typography>
//               </Grid>
//             </Grid>
//             <UIAutoComplete
//               targetOption='agencyName'
//               handleChange={handleAutocompleteChange('selectedAgency')}
//               renderData={agencies}
//             />
//             {errors?.selectedAgency && (
//               <Typography color={'red'}>{errors.selectedAgency}</Typography>
//             )}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <UIAutoComplete
//               handleChange={handleAutocompleteChange('gds')}
//               renderData={gdsdata}
//               label='GDS'
//             />
//             {errors?.gds && <Typography color={'red'}>{errors.gds}</Typography>}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <UIAutoComplete
//               renderData={ISOSPccData}
//               label='ISOS PCC'
//               handleChange={handleAutocompleteChange('isosPcc')}
//             />
//             {errors?.isosPcc && <Typography color={'red'}>{errors.isosPcc}</Typography>}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <UIInput
//               value={values.liveQueueNumber}
//               name={'liveQueueNumber'}
//               handleChange={handleChange}
//               placeHolder='Enter here'
//               label='Live Queue Number'
//             />
//             {errors?.liveQueueNumber && (
//               <Typography color={'red'}>{errors.liveQueueNumber}</Typography>
//             )}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <UIInput
//               handleChange={handleChange}
//               value={values.liveQueueCategory}
//               name={'liveQueueCategory'}
//               placeHolder='Enter here'
//               label='Live Queue Category'
//             />
//             {errors?.liveQueueCategory && (
//               <Typography color={'red'}>{errors.liveQueueCategory}</Typography>
//             )}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <UIInput
//               value={values.testQueueNumber}
//               name={'testQueueNumber'}
//               handleChange={handleChange}
//               placeHolder='Enter Here'
//               label='Test Queue Number'
//             />
//             {errors?.testQueueNumber && (
//               <Typography color={'red'}>{errors.testQueueNumber}</Typography>
//             )}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <UIInput
//               value={values.testQueueCategory}
//               handleChange={handleChange}
//               name={'testQueueCategory'}
//               label='Test Queue Category'
//               placeHolder='Enter Here'
//             />
//             {errors?.testQueueCategory && (
//               <Typography color={'red'}>{errors.testQueueCategory}</Typography>
//             )}
//           </Grid>

//           <Grid item xs={12} sm={12} md={12}>
//             <Grid container display='flex' justifyContent='space-between'>
//               <Grid item>
//                 <Typography
//                   variant='body2'
//                   sx={{
//                     fontSize: '0.9rem',
//                     fontWeight: 600,
//                     mb: '0.5rem',
//                     letterSpacing: '0.55px',
//                   }}>
//                   Agency PCC <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography
//                   onClick={handleShowImportantSpecs}
//                   sx={{
//                     ml: 1,
//                     color: '#1665D8',
//                     display: 'flex',
//                     alignItems: 'center',
//                     fontSize: '0.75rem',
//                     textDecoration: 'underline',
//                     cursor: 'pointer',
//                   }}>
//                   View Important Specification
//                 </Typography>
//               </Grid>
//             </Grid>
//             <UIInput handleChange={handleChange} name={'agencyPcc'} value={values.agencyPcc} />
//             {errors?.agencyPcc && <Typography color={'red'}>{errors.agencyPcc}</Typography>}
//           </Grid>
//           <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'end'}>
//             <UIButton onClick={intitateGdsFeedSubmitHandler}>Initiate GDS Feed</UIButton>
//           </Grid>
//         </Grid>
//         {showTable && (
//           <Box display={'flex'} flexDirection={'column'} width={'50%'} gap={10}>
//             <UITableContainer renderData={gdsFeedTable} />
//             <Typography fontSize={12}>
//               Please continue your journey at the{' '}
//               <Link
//                 style={{ color: 'rgb(35, 39, 98)', fontWeight: 'bold' }}
//                 to={'/feed-configuration/pcc-identifier-admin'}>
//                 PCCIDentifier Admin
//               </Link>{' '}
//               and{' '}
//               <Link
//                 style={{ color: 'rgb(35, 39, 98)', fontWeight: 'bold' }}
//                 to={'/feed-configuration/agency-admin'}>
//                 Agency Admin
//               </Link>{' '}
//               pages
//             </Typography>
//             <UILinkButton
//               to='/feed-configuration/new-feed-setup'
//               sx={{ width: 'fit-content', marginLeft: 'auto' }}>
//               New Feed Setup
//             </UILinkButton>
//           </Box>
//         )}
//       </Box>
//     </>
//   );
// };

// export default InitiateGdsForm;


import React from 'react'

const initiateGdsForm = () => {
  return (
    <div>initiateGdsForm</div>
  )
}

export default initiateGdsForm