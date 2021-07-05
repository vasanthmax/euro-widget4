import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportApi } from '../actions/sportApi';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import ConstantSport from '../constants/constantSport';
import StaticArray from '../constants/staticWords';
import Routing from '../constants/routing';
import RoutingPath from '../constants/routingconstants';
import AlignOrder from '../constants/alignOrder';
import ReactGa from 'react-ga';

ReactGa.initialize('UA-76564619-3');

const Widget1 = () => {
  const facebookIcon =
    'https://d156xmnjzkwf2j.cloudfront.net/SPW/social_media_icons/facebook.png';
  const instagramIcon =
    'https://d156xmnjzkwf2j.cloudfront.net/SPW/social_media_icons/instagram.png';
  const twitterIcon =
    'https://d156xmnjzkwf2j.cloudfront.net/SPW/social_media_icons/twitter.png';
  const location = new URLSearchParams(window.location.search).get('lang');
  const bannersport = new URLSearchParams(window.location.search).get('sport');
  const bannerHeaderDesktop = `https://d156xmnjzkwf2j.cloudfront.net/SPW/header/desktop/${location}/desktop_header_${location}_${
    bannersport === 'rowing'
      ? 'rowing'
      : bannersport === 'athletics'
      ? 'athletics'
      : 'default'
  }.svg`;
  const bannerMobileHeader = `https://d156xmnjzkwf2j.cloudfront.net/SPW/header/mobile/${location}/mobile_header_${location}_${
    bannersport === 'rowing'
      ? 'rowing'
      : bannersport === 'athletics'
      ? 'athletics'
      : 'default'
  }.svg`;
  const bannerFooter = `https://d156xmnjzkwf2j.cloudfront.net/SPW/footer/desktop/no_text_and_icons/desktop_footer_${
    bannersport === 'rowing'
      ? 'rowing'
      : bannersport === 'athletics'
      ? 'athletics'
      : 'default'
  }.svg`;
  const bannerFooterMobile = `https://d156xmnjzkwf2j.cloudfront.net/SPW/footer/mobile/no_text_and_icons/mobile_footer-${
    bannersport === 'rowing'
      ? 'rowing'
      : bannersport === 'athletics'
      ? 'athletics'
      : 'default'
  }.svg`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sportApi(location));
  }, []);
  const dataFile = useSelector((state) => state.sportReducer.sport);
  const [date, setdate] = useState(11);
  const [selectedFilters, setSelectedFilters] = useState();
  const dropdown2 = [
    `${StaticArray[0]['Thu'][location]} 11 Aug`,
    `${StaticArray[0]['Fri'][location]} 12 Aug`,
    `${StaticArray[0]['Sat'][location]} 13 Aug`,
    `${StaticArray[0]['Sun'][location]} 14 Aug`,
    `${StaticArray[0]['Mon'][location]} 15 Aug`,
    `${StaticArray[0]['Tue'][location]} 16 Aug`,
    `${StaticArray[0]['Wed'][location]} 17 Aug`,
    `${StaticArray[0]['Thu'][location]} 18 Aug`,
    `${StaticArray[0]['Fri'][location]} 19 Aug`,
    `${StaticArray[0]['Sat'][location]} 20 Aug`,
    `${StaticArray[0]['Sun'][location]} 21 Aug`,
  ];
  const sportDis = [];

  if (dataFile.length != 0) {
    for (let i = 0; i < dataFile.length; i++) {
      const sport = dataFile[i].sport;
      const discipline = dataFile[i].discipline;
      const venue = dataFile[i].venue;

      if (
        sportDis.findIndex(
          (ch) => ch.sport === sport && ch.discipline === discipline
        ) === -1
      ) {
        sportDis.push({
          id: AlignOrder(discipline),
          sport: sport,
          discipline: discipline,
          venue: venue,
          info: [
            {
              date: '11',
              medal: 'na',
            },
            {
              date: '12',
              medal: 'na',
            },
            {
              date: '13',
              medal: 'na',
            },
            {
              date: '14',
              medal: 'na',
            },
            {
              date: '15',
              medal: 'na',
            },
            {
              date: '16',
              medal: 'na',
            },
            {
              date: '17',
              medal: 'na',
            },
            {
              date: '18',
              medal: 'na',
            },
            {
              date: '19',
              medal: 'na',
            },
            {
              date: '20',
              medal: 'na',
            },
            {
              date: '21',
              medal: 'na',
            },
          ],
        });
      }
    }
  }

  if (dataFile.length != 0) {
    for (let i = 0; i < dataFile.length; i++) {
      const sport = dataFile[i].sport;
      const discipline = dataFile[i].discipline;
      const medal = dataFile[i].medal;
      let date = new Date(dataFile[i].start.slice(0, 10)).toLocaleString(
        'GMT',
        {
          timeZone: 'CET',
          day: 'numeric',
        }
      );

      console.log(date);
      const index = sportDis.findIndex(
        (ch) => ch.sport === sport && ch.discipline === discipline
      );

      if (
        sportDis[index]['info']
          .map((ch) => {
            return ch.date;
          })
          .indexOf(date) === -1
      ) {
      }

      sportDis[index].info.forEach((ele) => {
        if (ele.date === date && medal == 'Yes') {
          ele.medal = 'Yes';
        } else if (ele.date === date && ele.medal == 'na') {
          ele.medal = 'No';
        }
      });
    }
  }

  const filtered = [];

  if (dataFile != 0) {
    for (let i = 0; i < 12; i++) {
      const sport = sportDis[i].sport;
      const discipline = sportDis[i].discipline;
      const venue = sportDis[i].venue;

      const index = sportDis.findIndex(
        (ch) => ch.sport === sport && ch.discipline === discipline
      );

      const filter = sportDis[index].info.filter(
        (ch) => ch.date === date.toString()
      );
      filtered.push({
        id: AlignOrder(discipline),
        sport: sport,
        discipline: discipline,
        venue: venue,
        info: [...filter],
      });
    }
  }
  sportDis.sort(function (a, b) {
    return a.id - b.id;
  });
  filtered.sort(function (a, b) {
    return a.id - b.id;
  });
  return (
    <div className='widget1'>
      <div className='header-mobile'>
        <img src={bannerMobileHeader} alt='' />
      </div>
      <div className='header'>
        <img src={bannerHeaderDesktop} alt='' />
      </div>
      <div className='month'>
        <h2>{StaticArray[0]['August'][location].toUpperCase()}</h2>
      </div>
      <div className='table-filter'>
        <hr />
        <div className='filter-selector'>
          <Dropdown
            options={dropdown2}
            onChange={(e) => {
              const selectedFilters = e.value;
              setSelectedFilters(selectedFilters);
              let date = selectedFilters.slice(4, 7);
              if (location == 'de') {
                date = selectedFilters.slice(3, 6);
              }
              console.log(date);
              setdate(parseInt(date));
            }}
            value={StaticArray[0]['SelectDate'][location]}
          />
          <p>
            {StaticArray[0]['SelectedFilters'][location]} :{' '}
            <span>{selectedFilters}</span>
          </p>
        </div>
      </div>
      <table className='content-table'>
        <thead>
          <th className='sport'>
            {StaticArray[0]['Sport'][location].toUpperCase()}
          </th>
          <th className='venue'>
            {StaticArray[0]['Venue'][location].toUpperCase()}
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/11?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/11?lang=${location}&sport=athletics`
                  : `/date/11?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>11</h2>
              <p>{StaticArray[0]['Thu'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/12?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/12?lang=${location}&sport=athletics`
                  : `/date/12?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>12</h2>
              <p>{StaticArray[0]['Fri'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/13?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/13?lang=${location}&sport=athletics`
                  : `/date/13?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>13</h2>
              <p>{StaticArray[0]['Sat'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/14?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/14?lang=${location}&sport=athletics`
                  : `/date/14?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>14</h2>
              <p>{StaticArray[0]['Sun'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/15?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/15?lang=${location}&sport=athletics`
                  : `/date/15?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>15</h2>
              <p>{StaticArray[0]['Mon'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/16?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/16?lang=${location}&sport=athletics`
                  : `/date/16?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>16</h2>
              <p>{StaticArray[0]['Tue'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/17?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/17?lang=${location}&sport=athletics`
                  : `/date/17?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>17</h2>
              <p>{StaticArray[0]['Wed'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/18?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/18?lang=${location}&sport=athletics`
                  : `/date/18?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>18</h2>
              <p>{StaticArray[0]['Thu'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/19?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/19?lang=${location}&sport=athletics`
                  : `/date/19?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>19</h2>
              <p>{StaticArray[0]['Fri'][location]}</p>
            </Link>
          </th>

          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/20?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/20?lang=${location}&sport=athletics`
                  : `/date/20?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>20</h2>
              <p>{StaticArray[0]['Sat'][location]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/21?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/21?lang=${location}&sport=athletics`
                  : `/date/21?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>21</h2>
              <p>{StaticArray[0]['Sun'][location]}</p>
            </Link>
          </th>
        </thead>
        <tbody>
          {sportDis.map((ch) => {
            const items = [];
            let sport = ch.discipline;
            const MedalIcon = ConstantSport(sport);
            console.log(`Medal ${MedalIcon}`);
            const baseUrlDot = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Dots/SVG/ec_${MedalIcon}_dot_rgb.svg`;
            const baseUrlMedal = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Medals/SVG/ec_${MedalIcon}_medalicon_rgb.svg`;

            for (let i = 0; i < 11; i++) {
              if (
                parseInt(ch.info[i].date) - 11 == i &&
                ch.info[i].medal == 'Yes'
              ) {
                items.push(
                  <th>
                    <img src={baseUrlMedal} alt='' />
                  </th>
                );
              } else if (
                parseInt(ch.info[i].date) - 11 == i &&
                ch.info[i].medal == 'No'
              ) {
                items.push(
                  <th>
                    <img src={baseUrlDot} alt='' />
                  </th>
                );
              } else {
                items.push(<th></th>);
              }
            }
            const discipline = Routing(ch.discipline);
            return (
              <tr>
                <th className='sport'>
                  <a
                    // href={`https://www.europeanchampionships.com/${
                    //   ch.sport === 'Canoe'
                    //     ? 'canoe-sprint'
                    //     : ch.sport === 'Volleyball'
                    //     ? 'beach-volleyball'
                    //     : ch.sport.toLowerCase().replace(' ', '-')
                    // }#widget-02`}
                    href={
                      bannersport === 'rowing'
                        ? `/sport/${discipline}?lang=${location}&sport=rowing`
                        : bannersport === 'athletics'
                        ? `/sport/${discipline}?lang=${location}&sport=athletics`
                        : `/sport/${discipline}?lang=${location}`
                    }
                    style={{ textDecoration: 'none', color: '#1c0e52' }}
                    target='_top'
                  >
                    {ch.discipline}
                  </a>
                </th>

                <th className='venue'>{ch.venue}</th>
                {items}
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className='content-table-mobile'>
        <thead>
          <th>{StaticArray[0]['Sport'][location].toUpperCase()}</th>
          <th>{StaticArray[0]['Venue'][location].toUpperCase()}</th>
          <th className='date'>
            <Link
              to={
                bannersport === 'rowing'
                  ? `/date/${date}?lang=${location}&sport=rowing`
                  : bannersport === 'athletics'
                  ? `/date/${date}?lang=${location}&sport=athletics`
                  : `/date/${date}?lang=${location}`
              }
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              {date} AUG
            </Link>
          </th>
        </thead>
        <tbody>
          {filtered.map((vs) => {
            let sport = vs.discipline;
            let discipline = Routing(vs.discipline);
            const MedalIcon = ConstantSport(sport);
            console.log(`Medal ${MedalIcon}`);
            const baseUrlDot = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Dots/SVG/ec_${MedalIcon}_dot_rgb.svg`;
            const baseUrlMedal = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Medals/SVG/ec_${MedalIcon}_medalicon_rgb.svg`;

            return (
              <tr>
                <th className='event'>
                  <a
                    // href={`https://www.europeanchampionships.com/${
                    //   vs.sport === 'Canoe'
                    //     ? 'canoe-sprint'
                    //     : vs.sport === 'Volleyball'
                    //     ? 'beach-volleyball'
                    //     : vs.sport.toLowerCase().replace(' ', '-')
                    // }#widget-02`}

                    href={
                      bannersport === 'rowing'
                        ? `/sport/${discipline}?lang=${location}&sport=rowing`
                        : bannersport === 'athletics'
                        ? `/sport/${discipline}?lang=${location}&sport=athletics`
                        : `/sport/${discipline}?lang=${location}`
                    }
                    style={{ textDecoration: 'none', color: '#1c0e52' }}
                    target='_top'
                  >
                    {vs.discipline}
                  </a>
                </th>
                <th className='venue'>{vs.venue}</th>
                {vs.info[0].medal === 'Yes' ? (
                  <th className='marker'>
                    <img src={baseUrlMedal} alt='' />
                  </th>
                ) : vs.info[0].medal === 'No' ? (
                  <th className='marker'>
                    <img src={baseUrlDot} alt='' />
                  </th>
                ) : (
                  <th className='marker'></th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className='footer'
        style={{ backgroundImage: `url(${bannerFooter})` }}
      >
        <div className='web-route'>
          <a
            href='https://www.europeanchampionships.com/'
            onClick={() => {
              ReactGa.event({
                category: 'SPW4',
                action: 'Redirect',
                label: 'ec.com',
              });
            }}
            target='_top'
          >
            <p>europeanchampionships.com&nbsp;&nbsp;&nbsp;|</p>
          </a>
          <a
            href='https://www.munich2022.com/'
            onClick={() => {
              ReactGa.event({
                category: 'SPW4',
                action: 'Redirect',
                label: 'm22.com',
              });
            }}
            target='_top'
          >
            <p>munich2022.com</p>
          </a>
        </div>
        <ul>
          <li>
            <a
              href='https://www.instagram.com/munich2022/'
              onClick={() => {
                ReactGa.event({
                  category: 'SPW4',
                  action: 'Redirect',
                  label: 'm22Instagram',
                });
              }}
              target='_top'
            >
              <img src={instagramIcon} alt='' />
            </a>
          </li>
          <li>
            <a
              href='https://www.facebook.com/ECMunich2022/'
              onClick={() => {
                ReactGa.event({
                  category: 'SPW4',
                  action: 'Redirect',
                  label: 'm22Facebook',
                });
              }}
              target='_top'
            >
              <img src={facebookIcon} alt='' />
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/ecmunich2022'
              onClick={() => {
                ReactGa.event({
                  category: 'SPW4',
                  action: 'Redirect',
                  label: 'm22Twitter',
                });
              }}
              target='_top'
            >
              <img src={twitterIcon} alt='' />
            </a>
          </li>
        </ul>
      </div>
      <div
        className='footer-mobile'
        style={{ backgroundImage: `url(${bannerFooterMobile})` }}
      >
        <div className='web-route'>
          <a
            href='https://www.europeanchampionships.com/'
            onClick={() => {
              ReactGa.event({
                category: 'SPW4',
                action: 'Redirect',
                label: 'ec.com',
              });
            }}
            target='_top'
          >
            <p>europeanchampionships.com</p>
          </a>
          <a
            href='https://www.munich2022.com/'
            onClick={() => {
              ReactGa.event({
                category: 'SPW4',
                action: 'Redirect',
                label: 'm22.com',
              });
            }}
            target='_top'
          >
            <p>munich2022.com</p>
          </a>
        </div>
        <ul>
          <li>
            <a
              href='https://www.instagram.com/munich2022/'
              onClick={() => {
                ReactGa.event({
                  category: 'SPW4',
                  action: 'Redirect',
                  label: 'm22Instagram',
                });
              }}
              target='_top'
            >
              <img src={instagramIcon} alt='' />
            </a>
          </li>
          <li>
            <a
              href='https://www.facebook.com/ECMunich2022/'
              onClick={() => {
                ReactGa.event({
                  category: 'SPW4',
                  action: 'Redirect',
                  label: 'm22Facebook',
                });
              }}
              target='_top'
            >
              <img src={facebookIcon} alt='' />
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/ecmunich2022'
              onClick={() => {
                ReactGa.event({
                  category: 'SPW4',
                  action: 'Redirect',
                  label: 'm22Twitter',
                });
              }}
              target='_top'
            >
              <img src={twitterIcon} alt='' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Widget1;
