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

const Widget2 = () => {
  const dispatch = useDispatch();
  const lang = window.location.pathname.split('/')[1];
  const bannersport = new URLSearchParams(window.location.search).get('sport');
  const bannerHeaderDesktop = `https://d156xmnjzkwf2j.cloudfront.net/SPW/header/desktop/${lang}/desktop_header_${lang}_${
    bannersport === 'rowing'
      ? 'rowing'
      : bannersport === 'athletics'
      ? 'athletics'
      : 'default'
  }.svg`;
  console.log(lang);
  useEffect(() => {
    console.log('...loding');
    dispatch(sportApi(lang));
  }, []);
  const data = useSelector((state) => state.sportReducer.sport);

  console.log(data);
  let URLSport = window.location.pathname.split('/').pop();
  let sport = RoutingPath[0][URLSport][lang];
  console.log(sport);

  let sportIcons = window.location.pathname.split('/').pop();
  if (
    sportIcons == 'cyclingmountainbike' ||
    sportIcons == 'cyclingbmxfreestyle' ||
    sportIcons == 'cyclingroad' ||
    sportIcons == 'cyclingtrack'
  ) {
    sportIcons = 'cycling';
  }
  const filteredValues = data.filter((ch) => ch.discipline === sport);

  const [filteredData, setFilteredData] = useState(filteredValues);

  useEffect(() => {
    setFilteredData(data.filter((ch) => ch.discipline === sport));
  }, [data]);

  const baseUrlDot = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Dots/SVG/ec_${sportIcons}_dot_rgb.svg`;
  const baseUrlMedal = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Medals/SVG/ec_${sportIcons}_medalicon_rgb.svg`;
  const baseUrlPicto = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Pictograms/PNG/ec_${sportIcons}_pictogram_fc_rgb.png`;

  let sportDates = [];
  let sportColors = {
    athletics: '#FF7900',
    beachvolleyball: '#F18A61',
    canoesprint: '#B9CE00',
    cycling: '#D52B1E',
    gymnastics: '#CA005D',
    rowing: '#00B2A9',
    sportclimbing: '#E71D73',
    tabletennis: '#1D71B8',
    triathlon: '#FECB00',
  };

  for (let i = 0; i < filteredData.length; i++) {
    const date = new Date(filteredData[i].start).toLocaleString('UTC', {
      timeZone: 'CET',
      day: '2-digit',
    });

    if (sportDates.indexOf(date) === -1) {
      sportDates.push(date);
    }
  }

  let colorp = `${sportColors[sportIcons]}`;
  const dropdownlist = [];
  for (let i = 0; i < filteredValues.length; i++) {
    const gender = filteredValues[i].gender;
    if (dropdownlist.indexOf(gender) === -1) {
      dropdownlist.push(gender);
    }
  }

  const dropdown2 = ['Yes', 'No', 'All'];
  const [gender, setGender] = useState('No Filter Selected');
  const [medal, setMedal] = useState('No Filter Selected');

  const genderFilter = () => {
    if (gender === 'No Filter Selected' && medal == 'No Filter Selected') {
      const filterbyUser = setFilteredData(filteredValues);
    }
    if (gender === 'No Filter Selected') {
      const filterbyUser = filteredValues.filter((ch) => ch.medal == medal);
      if (filterbyUser.length === 0) {
        console.log(`${gender} is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }
    if (medal === 'No Filter Selected') {
      const filterbyUser = filteredValues.filter((ch) => ch.gender == gender);
      if (filterbyUser.length === 0) {
        console.log(`${gender} is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }
    if (gender) {
      const filterbyUser = filteredValues.filter((ch) => ch.gender == gender);
      if (filterbyUser.length === 0) {
        console.log(`${gender} is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }

    if (gender && medal == 'All') {
      const filterbyUser = filteredValues.filter((ch) => ch.gender == gender);
      if (filterbyUser.length === 0) {
        console.log(`${gender} is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    } else {
      const filterbyUser = filteredValues.filter(
        (ch) => ch.gender == gender && ch.medal == medal
      );
      if (filterbyUser.length === 0) {
        console.log(`${gender} is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }
  };
  useEffect(() => {
    genderFilter();
  }, [gender, medal]);

  return (
    <div className='widget2'>
      <div className='bannerheader'>
        <img src={bannerHeaderDesktop} alt='' />
      </div>
      <div className='back'>
        <div className='back-button'>
          <Link to={`/${lang}`}>
            {' '}
            <img
              src={
                'https://d156xmnjzkwf2j.cloudfront.net/SPW/Other_elements/SVG/back_button.svg'
              }
              alt=''
            />
          </Link>
        </div>

        <p>BACK TO FULL PROGRAMME</p>
      </div>
      <div className='header'>
        <img id='pitco' src={baseUrlPicto} alt='' />
        <div className='sportdetails'>
          <h1 className='sportName' style={{ color: `${colorp}` }}>
            {filteredData.length === 0
              ? ''
              : filteredData[0]['discipline'].toUpperCase()}
          </h1>
          <p>
            {StaticArray[0]['Dates'][lang].toUpperCase()} :{' '}
            <span>
              {StaticArray[0]['August'][lang].toUpperCase()}{' '}
              {sportDates.join(',')}
            </span>
          </p>
          <p>
            {StaticArray[0]['Venue'][lang]} :{' '}
            <span>
              {filteredData.length === 0
                ? ''
                : filteredData[0]['venue'].toUpperCase()}
            </span>
          </p>
        </div>
      </div>
      <div className='filters'>
        <hr />
        <div className='filter-selector'>
          <Dropdown
            options={dropdownlist}
            onChange={(e) => {
              setGender(e.value);
            }}
            value={
              gender === 'No Filter Selected'
                ? StaticArray[0]['Gender'][lang].toUpperCase()
                : gender
            }
            placeholder='Select an option'
          />
          <Dropdown
            options={dropdown2}
            onChange={(e) => {
              setMedal(e.value);
            }}
            value={
              medal === 'No Filter Selected'
                ? StaticArray[0]['MedalEvent'][lang].toUpperCase()
                : medal
            }
            placeholder='Select an option'
          />
        </div>
        <hr />
        <div className='selected-filters'>
          <div className='filter'>
            <p>{StaticArray[0]['SelectedFilters'][lang]}:</p>
            {gender === 'No Filter Selected' ? (
              ''
            ) : (
              <p>
                <span onClick={() => setGender('No Filter Selected')}>x</span>
                {gender}
              </p>
            )}
            {medal === 'No Filter Selected' ? (
              ''
            ) : (
              <p>
                <span onClick={() => setMedal('No Filter Selected')}>x</span>
                {`${StaticArray[0]['MedalEvent'][lang].toUpperCase()}-${medal}`}
              </p>
            )}
          </div>
          <p
            onClick={() => {
              setGender('No Filter Selected');
              setMedal('No Filter Selected');
            }}
            style={{ cursor: 'pointer' }}
          >
            {StaticArray[0]['Clear'][lang]}
          </p>
        </div>
      </div>

      <div className='month'>
        <h2>{StaticArray[0]['August'][lang].toUpperCase()}</h2>
      </div>
      <table className='content-table'>
        <thead>
          <th className='sport'>
            {StaticArray[0]['Eventname'][lang].toUpperCase()}
          </th>
          <th>
            <Link
              to={`/${lang}/date/11`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>11</h2>
              <p>{StaticArray[0]['Thu'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/12`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>12</h2>
              <p>{StaticArray[0]['Fri'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/13`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>13</h2>
              <p>{StaticArray[0]['Sat'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/14`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>14</h2>
              <p>{StaticArray[0]['Sun'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/15`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>15</h2>
              <p>{StaticArray[0]['Mon'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/16`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>16</h2>
              <p>{StaticArray[0]['Tue'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/17`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>17</h2>
              <p>{StaticArray[0]['Wed'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/18`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>18</h2>
              <p>{StaticArray[0]['Thu'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/19`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>19</h2>
              <p>{StaticArray[0]['Fri'][lang]}</p>
            </Link>
          </th>

          <th>
            <Link
              to={`/${lang}/date/20`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>20</h2>
              <p>{StaticArray[0]['Sat'][lang]}</p>
            </Link>
          </th>
          <th>
            <Link
              to={`/${lang}/date/21`}
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <h2>21</h2>
              <p>{StaticArray[0]['Sun'][lang]}</p>
            </Link>
          </th>
        </thead>
        <tbody>
          {filteredData.map((ch) => {
            const items = [];
            const date = new Date(ch.start).toLocaleString('UTC', {
              timeZone: 'CET',
              day: '2-digit',
            });
            console.log(date);
            for (let i = 0; i < 11; i++) {
              if (date - 11 == i && ch.medal == 'Yes') {
                items.push(
                  <th>
                    <img src={baseUrlMedal} alt='' />
                  </th>
                );
              } else if (date - 11 == i) {
                items.push(
                  <th>
                    <img src={baseUrlDot} alt='' />
                  </th>
                );
              } else {
                items.push(<th></th>);
              }
            }

            return (
              <tr>
                <th className='eventName'>
                  {ch.event.split('&#039;').join("'")}
                </th>
                {items}
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className='content-table-mobile'>
        <thead>
          <th className='sport'>{StaticArray[0]['Eventname'][lang]}</th>
          <th>{StaticArray[0]['Dates'][lang]}</th>
          <th>{StaticArray[0]['Medal'][lang]}</th>
        </thead>
        <tbody>
          {filteredData.map((ch) => {
            let medal;
            if (ch.medal == 'Yes') {
              medal = baseUrlMedal;
            } else {
              medal = baseUrlDot;
            }

            const weekday = new Date(ch.start)
              .toLocaleString('UTC', {
                timeZone: 'CET',
                weekday: 'short',
              })
              .toString();
            const month = new Date(ch.start)
              .toLocaleString('UTC', {
                timeZone: 'CET',
                month: 'short',
                day: '2-digit',
              })
              .toString();
            console.log(month.replace(',', ''));
            const date = new Date(ch.start).toLocaleString('UTC', {
              day: '2-digit',
            });
            return (
              <tr>
                <th className='event-name'>
                  {ch.event.split('&#039;').join("'")}
                </th>
                <th className='date'>
                  <Link
                    to={`/${lang}/date/${date}`}
                    style={{ textDecoration: 'none', color: '#1c0e52' }}
                  >
                    {`${StaticArray[0][weekday][lang]} `}
                    {month.replace(',', '')}
                  </Link>
                </th>
                <th className='medals'>
                  <img src={medal} alt='' />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Widget2;
