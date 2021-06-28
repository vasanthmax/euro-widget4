import axios from 'axios';

export const sportApi = (lang) => {
  return async function (dispatch) {
    const sport = await axios.get(
      `https://d156xmnjzkwf2j.cloudfront.net/schedulechampion/ec2022_all_events_${lang}.json`
    );
    console.log(sport);
    dispatch({
      type: 'FETCH_HOLIDAYS',
      payload: sport.data,
    });
  };
};
