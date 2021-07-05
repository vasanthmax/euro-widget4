import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportApi } from '../actions/sportApi';
import eventValues from '../assets/table.json';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import { createEvent } from 'ics';
import ConstantSport from '../constants/constantSport';
import StaticArray from '../constants/staticWords';
import Routing from '../constants/routing';
import ReactGa from 'react-ga';

ReactGa.initialize('UA-76564619-3');
const Widget3 = () => {
  const facebookIcon =
    'https://d156xmnjzkwf2j.cloudfront.net/SPW/social_media_icons/facebook.png';
  const instagramIcon =
    'https://d156xmnjzkwf2j.cloudfront.net/SPW/social_media_icons/instagram.png';
  const twitterIcon =
    'https://d156xmnjzkwf2j.cloudfront.net/SPW/social_media_icons/twitter.png';
  const calendar =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/PNG/calendar.png';

  const calendarPlus =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/PNG/calendar-plus.png';

  const rightArrow =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/SVG/chevron_right.svg';
  const leftArrow =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/SVG/chevron_left.svg';
  const lang = new URLSearchParams(window.location.search).get('lang');
  const bannersport = new URLSearchParams(window.location.search).get('sport');
  const bannerHeaderDesktop = `https://d156xmnjzkwf2j.cloudfront.net/SPW/header/desktop/${lang}/desktop_header_${lang}_${
    bannersport === 'rowing'
      ? 'rowing'
      : bannersport === 'athletics'
      ? 'athletics'
      : 'default'
  }.svg`;
  const bannerMobileHeader = `https://d156xmnjzkwf2j.cloudfront.net/SPW/header/mobile/${lang}/mobile_header_${lang}_${
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
    console.log('...loding');
    dispatch(sportApi(lang));
  }, []);
  let data = useSelector((state) => state.sportReducer.sport);
  if (data.length === 0) {
    dispatch(sportApi(lang));
  }
  data = useSelector((state) => state.sportReducer.sport);
  const [isClicked, setIsClicked] = useState('');
  const [nofilter, setNofilter] = useState('');

  const [fDate, setfDate] = useState(
    parseInt(window.location.pathname.split('/').pop())
  );
  const filterByDate = data.filter(
    (ch) =>
      parseInt(
        new Date(ch.start).getDate().toLocaleString('UTC', {
          timeZone: 'CET',
          day: '2-digit',
        })
      ) === fDate
  );
  const [filteredData, setFilteredData] = useState(filterByDate);

  const [week, setWeek] = useState(
    new Date(
      filteredData.length === 0 ? null : filteredData[0]['start']
    ).toLocaleString('UTC', {
      timeZone: 'CET',
      weekday: 'long',
    })
  );
  useEffect(() => {
    console.log('in again useEffect');
    setFilteredData(
      data.filter(
        (ch) =>
          parseInt(
            new Date(ch.start).getDate().toLocaleString('UTC', {
              timeZone: 'CET',
              day: '2-digit',
            })
          ) === fDate
      )
    );
    setWeek(
      new Date(
        filteredData.length === 0 ? '' : filteredData[0]['start']
      ).toLocaleString('UTC', {
        timeZone: 'CET',
        weekday: 'long',
      })
    );
  }, [data]);

  const sportList = [];
  const dropdownlist = [];
  for (let i = 0; i < filterByDate.length; i++) {
    const gender = filterByDate[i].gender;
    if (dropdownlist.indexOf(gender) === -1) {
      dropdownlist.push(gender);
    }
  }
  const dropdown2 = [StaticArray[0]['Yes'][lang], StaticArray[0]['No'][lang]];
  const [medalValue, setMedalValue] = useState('No Filter Selected');
  const [gender, setGender] = useState('No Filter Selected');
  const [medal, setMedal] = useState('No Filter Selected');
  const [sport, setSport] = useState('No Filter Selected');
  for (let i = 0; i < filterByDate.length; i++) {
    const sports = filterByDate[i].discipline;
    if (sportList.indexOf(sports) === -1) {
      sportList.push(sports);
    }
  }
  const sportListUpdate = () => {
    for (let i = 0; i < filterByDate.length; i++) {
      const sports = filterByDate[i].discipline;
      if (sportList.indexOf(sports) === -1) {
        sportList.push(sports);
      }
    }
  };
  const nextbutton = () => {
    const num = fDate === 21 ? 11 : fDate + 1;
    setfDate(num);
    const filterByDate = data.filter(
      (ch) =>
        parseInt(
          new Date(ch.start).getDate().toLocaleString('UTC', {
            timeZone: 'CET',
            day: '2-digit',
          })
        ) === num
    );
    setFilteredData(filterByDate);
  };

  const previousbutton = () => {
    const num = fDate === 11 ? 21 : fDate - 1;
    setfDate(num);
    const filterByDate = data.filter(
      (ch) =>
        parseInt(
          new Date(ch.start).getDate().toLocaleString('UTC', {
            timeZone: 'CET',
            day: '2-digit',
          })
        ) === num
    );
    setFilteredData(filterByDate);
  };

  const WeekDay = () => {
    const week = new Date(
      filteredData.length === 0 ? '' : filteredData[0]['start']
    ).toLocaleString('UTC', {
      weekday: 'long',
    });
    setWeek(week);
  };
  const genderFilter = () => {
    if (
      gender === 'No Filter Selected' &&
      medal === 'No Filter Selected' &&
      sport === 'No Filter Selected'
    ) {
      const filterbyUser = setFilteredData(filterByDate);
    } else if (
      gender === 'No Filter Selected' &&
      medal == 'No Filter Selected' &&
      sport !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter((ch) => ch.discipline === sport);
      if (filterbyUser.length === 0) {
        setNofilter('no');
        console.log(`10 is not Available`);
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
        console.log('data acquired');
      }
    } else if (
      medal === 'No Filter Selected' &&
      sport === 'No Filter Selected' &&
      gender !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter((ch) => ch.gender === gender);
      if (filterbyUser.length === 0) {
        setNofilter('no');

        console.log(`9 is not Available`);
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
      }
    } else if (
      gender === 'No Filter Selected' &&
      sport === 'No Filter Selected' &&
      medal !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter((ch) => ch.medal === medal);
      if (filterbyUser.length === 0) {
        console.log(`8 is not Available`);
        setNofilter('no');
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
      }
    } else if (
      gender === 'No Filter Selected' &&
      medal !== 'No Filter Selected' &&
      sport !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.discipline == sport && ch.medal == medal
      );
      if (filterbyUser.length === 0) {
        console.log(`7 is not Available`);
        setNofilter('no');
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
      }
    } else if (
      gender !== 'No Filter Selected' &&
      medal == 'No Filter Selected' &&
      sport !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.gender === gender && ch.discipline == sport
      );
      if (filterbyUser.length === 0) {
        setNofilter('no');

        console.log(`6 is not Available`);
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
      }
    } else if (
      gender !== 'No Filter Selected' &&
      medal !== 'No Filter Selected' &&
      sport == 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.gender == gender && ch.medal === medal
      );
      if (filterbyUser.length === 0) {
        console.log(`5 is not Available`);
        setNofilter('no');
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
      }
    } else if (
      gender !== 'No Filter Selected' &&
      sport !== 'No Filter Selected' &&
      medal !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter(
        (ch) =>
          ch.gender == gender && ch.discipline == sport && ch.medal == medal
      );
      if (filterbyUser.length === 0) {
        setNofilter('no');
        console.log(`4 is not Available`);
      } else {
        setFilteredData(filterbyUser);
        setNofilter('');
      }
    }
  };

  useEffect(() => {
    WeekDay();
    sportListUpdate();
    // setGender('No Filter Selected');
    // setMedal('No Filter Selected');
    // setSport('No Filter Selected');
  }, [fDate]);
  useEffect(() => {
    genderFilter();
  }, [gender, medal, sport]);
  const add = (
    type,
    sport,
    discipline,
    classes,
    session,
    gender,
    phase,
    event,
    start,
    end,
    venue,
    day,
    medal
  ) => {
    const year = new Date(start).toLocaleString('default', {
      year: 'numeric',
    });
    const month = new Date(start).toLocaleString('default', {
      month: 'numeric',
    });
    const dayTime = new Date(start).toLocaleString('default', {
      day: 'numeric',
    });
    const startTimehour = new Date(start).toLocaleString('default', {
      hour: '2-digit',
    });
    const startTimeminute = new Date(start).toLocaleString('default', {
      minute: '2-digit',
    });
    const endTime = new Date(end).toLocaleString('default', {
      day: 'numeric',
    });
    const endTimehour = new Date(end).toLocaleString('default', {
      hour: '2-digit',
    });
    const endTimeminute = new Date(end).toLocaleString('default', {
      minute: '2-digit',
    });
    console.log(year);
    const eventCalen = {
      start: [
        parseInt(year),
        parseInt(month),
        parseInt(dayTime),
        parseInt(startTimehour),
        parseInt(startTimeminute),
      ],
      end: [
        parseInt(year),
        parseInt(month),
        parseInt(endTime),
        parseInt(endTimehour),
        parseInt(endTimeminute),
      ],
      title: `${discipline} - ${event.split('&#039;').join("'")}`,
      description: `${discipline} - ${event.split('&#039;').join("'")}`,
      location: venue,
    };
    console.log(eventCalen);
    createEvent(eventCalen, (error, value) => {
      if (error) {
        console.log(error.message);
        return;
      }
      console.log(value);
      let blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });

      if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
        // Open/Save link in IE and Edge
        window.navigator.msSaveBlob(blob, 'download.ics');
      } else {
        // Open/Save link in Modern Browsers
        window.open(encodeURI('data:text/calendar;charset=utf8,' + value));
      }
    });
  };
  console.log(week);
  return (
    <div className='widget3'>
      <div className='bannerheader'>
        <img src={bannerHeaderDesktop} alt='' />
      </div>
      <div className='bannermobileheader'>
        <img src={bannerMobileHeader} alt='' />
      </div>
      <div className='back'>
        <div className='back-button'>
          <Link
            to={
              bannersport === 'rowing'
                ? `/${lang}?lang=${lang}&sport=rowing`
                : bannersport === 'athletics'
                ? `/${lang}?lang=${lang}&sport=athletics`
                : `/?lang=${lang}`
            }
          >
            {' '}
            <img
              src={
                'https://d156xmnjzkwf2j.cloudfront.net/SPW/Other_elements/SVG/back_button.svg'
              }
              alt=''
            />
          </Link>
        </div>

        <p>{StaticArray[0]['back'][lang]}</p>
      </div>
      <div className='header'>
        <div className='date-carousel'>
          <img
            src={leftArrow}
            className='left-arrow'
            alt=''
            onClick={() => previousbutton()}
          />
          <div className='previous-date'>
            <p className='day'>{fDate === 11 ? 21 : fDate - 1}</p>
            <p className='month'>
              {StaticArray[0]['August'][lang].toUpperCase()}
            </p>
            <p className='mon'>AUG</p>
          </div>
          <img
            src={rightArrow}
            className='right-arrow'
            alt=''
            onClick={() => nextbutton()}
          />
          <div className='next-date'>
            <p className='day'>{fDate === 21 ? 11 : fDate + 1}</p>
            <p className='month'>
              {StaticArray[0]['August'][lang].toUpperCase()}
            </p>
            <p className='mon'>AUG</p>
          </div>
          <div className='main-carousel'>
            <div className='date'>
              <p className='weekday'>
                {
                  StaticArray[0][week === 'Invalid Date' ? 'Monday' : week][
                    lang
                  ]
                }
              </p>

              <p className='day'>{fDate}</p>
              <p className='august'>
                {StaticArray[0]['August'][lang].toUpperCase()}
              </p>
            </div>
            <div className='sport'>
              <h3>{StaticArray[0]['August'][lang].toUpperCase()}</h3>
              <p>
                {StaticArray[0]['Sports'][lang].toUpperCase()}:&nbsp;&nbsp;
                <span>
                  {/* CYLCING BMX, CYCLING TRACK, ARTISTICS GYMNASTICS, ROWING,
                  SPORT CLIMBING, TABLE TENNIS, TRIATHLON */}
                  {sportList.join(', ')}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='filters'>
        <hr />
        <div className='filter-selector'>
          <Dropdown
            options={sportList}
            onChange={(e) => {
              setSport(e.value);
            }}
            value={
              sport === 'No Filter Selected'
                ? `${StaticArray[0]['Sports'][lang].toUpperCase()}`
                : sport
            }
            placeholder='Select an option'
          />
          <Dropdown
            options={dropdownlist}
            onChange={(e) => {
              setGender(e.value);
            }}
            value={
              gender === 'No Filter Selected'
                ? `${StaticArray[0]['Gender'][lang].toUpperCase()}`
                : gender
            }
            placeholder='Select an option'
          />
          <Dropdown
            options={dropdown2}
            onChange={(e) => {
              if (e.value == 'Alles' || e.value == 'Tous' || e.value == 'All') {
                setMedal('All');
                setMedalValue(e.value);
              }
              if (e.value == 'Yes' || e.value == 'Oui' || e.value == 'Ja') {
                setMedal('Yes');
                setMedalValue(e.value);
              }
              if (e.value == 'No' || e.value == 'Non' || e.value == 'Nein') {
                setMedal('No');
                setMedalValue(e.value);
              }
            }}
            value={
              medalValue === 'No Filter Selected'
                ? `${StaticArray[0]['MedalEvent'][lang].toUpperCase()}`
                : medalValue
            }
            placeholder='Select an option'
          />
        </div>
        <hr />
        <div className='selected-filters'>
          <div className='filter'>
            <p>{StaticArray[0]['SelectedFilters'][lang].toUpperCase()}:</p>
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
                <span
                  onClick={() => {
                    setMedal('No Filter Selected');
                    setMedalValue('No Filter Selected');
                  }}
                >
                  x
                </span>
                {`${StaticArray[0]['MedalEvent'][lang].toUpperCase()}-${medal}`}
              </p>
            )}
            {sport === 'No Filter Selected' ? (
              ''
            ) : (
              <p>
                <span onClick={() => setSport('No Filter Selected')}>x</span>
                {sport}
              </p>
            )}
          </div>
          <p
            onClick={() => {
              setGender('No Filter Selected');
              setMedal('No Filter Selected');
              setSport('No Filter Selected');
            }}
            style={{ cursor: 'pointer' }}
          >
            {StaticArray[0]['Clear'][lang]}
          </p>
        </div>
      </div>
      {nofilter === 'no' ? (
        ''
      ) : (
        <div className='time-zone'>
          <p>
            {`${
              isClicked === 'clicked'
                ? StaticArray[0]['alocaltime'][lang]
                : StaticArray[0]['amunichtime'][lang]
            }`}
            {isClicked === 'clicked' ? (
              <span onClick={() => setIsClicked('')}>
                {StaticArray[0]['smunichtime'][lang]}
              </span>
            ) : (
              <span onClick={() => setIsClicked('clicked')}>
                {StaticArray[0]['slocaltime'][lang]}
              </span>
            )}
          </p>
        </div>
      )}
      {nofilter === 'no' ? (
        <p className='nofilter-desktop'>No Data Available</p>
      ) : (
        <table className='date-event-table'>
          <thead>
            <th>{StaticArray[0]['Sport'][lang].toUpperCase()}</th>
            <th>{StaticArray[0]['Eventname'][lang].toUpperCase()}</th>
            <th>{StaticArray[0]['time'][lang]}</th>
            <th>{StaticArray[0]['Medal'][lang].toUpperCase()}</th>
            <th>{StaticArray[0]['Venue'][lang].toUpperCase()}</th>
            <th className='addTo'>
              {StaticArray[0]['AddTo'][lang].toUpperCase()}{' '}
              <img src={calendar} alt='' />
            </th>
          </thead>
          <tbody>
            {filteredData.map((ch) => {
              let SportName = ch.sport;
              let discipline = ch.discipline;
              let MedalEvent;
              const sportIcons = ConstantSport(discipline);
              const baseUrlDot = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Dots/SVG/ec_${sportIcons}_dot_rgb.svg`;
              const baseUrlMedal = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Medals/SVG/ec_${sportIcons}_medalicon_rgb.svg`;

              if (ch.medal == 'Yes') {
                MedalEvent = baseUrlMedal;
              } else {
                MedalEvent = baseUrlDot;
              }

              let startTime = new Date(ch.start).toLocaleString('UTC', {
                timeZone: 'CET',
                hour: '2-digit',
                minute: '2-digit',
              });
              let endTime = new Date(ch.end).toLocaleString('UTC', {
                timeZone: 'CET',
                hour: '2-digit',
                minute: '2-digit',
              });
              const showLocalTime = () => {
                if (isClicked === 'clicked') {
                  startTime = new Date(ch.start).toLocaleString('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  endTime = new Date(ch.end).toLocaleString('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }
              };
              showLocalTime();
              const showInMunichTime = () => {
                if (isClicked === '') {
                  let startTime = new Date(ch.start).toLocaleString('UTC', {
                    timeZone: 'CET',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  let endTime = new Date(ch.end).toLocaleString('UTC', {
                    timeZone: 'CET',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }
              };
              showInMunichTime();
              const disciplineRoute = Routing(ch.discipline);
              return (
                <tr>
                  <th className='sport'>
                    {' '}
                    <a
                      // href={`https://www.europeanchampionships.com/${
                      //   ch.sport === 'Canoe'
                      //     ? 'canoe-sprint'
                      //     : ch.sport.toLowerCase().replace(' ', '-')
                      // }#widget-02`}
                      href={
                        bannersport === 'rowing'
                          ? `/sport/${disciplineRoute}?lang=${lang}&sport=rowing`
                          : bannersport === 'athletics'
                          ? `/sport/${disciplineRoute}?lang=${lang}&sport=athletics`
                          : `/sport/${disciplineRoute}?lang=${lang}`
                      }
                      style={{ textDecoration: 'none', color: '#1c0e52' }}
                      target='_top'
                    >
                      {ch.discipline}
                    </a>
                  </th>
                  <th className='event'>
                    {ch.event.split('&#039;').join("'")}
                  </th>
                  <th className='time'>
                    {startTime} - {endTime}
                  </th>
                  <th className='medal'>
                    <img src={MedalEvent} alt='' />
                  </th>
                  <th className='venue'>{ch.venue}</th>
                  <th className='calendar'>
                    <img
                      src={calendarPlus}
                      alt=''
                      onClick={() => {
                        add(
                          ch.type,
                          ch.sport,
                          ch.discipline,
                          ch.class,
                          ch.session,
                          ch.gender,
                          ch.phase,
                          ch.event,
                          ch.start,
                          ch.end,
                          ch.venue,
                          ch.day,
                          ch.medal
                        );
                        ReactGa.event({
                          category: 'SPW3',
                          action: 'Add to Calendar',
                        });
                      }}
                    />
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {nofilter === 'no' ? (
        <p className='nofilter-mobile'>No Data Available</p>
      ) : (
        <table className='content-table-mobile'>
          <thead>
            <tr>
              <th className='sport-event'>
                {StaticArray[0]['Sport'][lang].toUpperCase()} &{' '}
                {StaticArray[0]['Eventname'][lang].toUpperCase()}
              </th>
            </tr>
            <tr>
              <th>{StaticArray[0]['time'][lang]}</th>
              <th>{StaticArray[0]['Medal'][lang].toUpperCase()}</th>
              <th>{StaticArray[0]['Venue'][lang].toUpperCase()}</th>
              <th className='addTo'>
                {StaticArray[0]['AddTo'][lang].toUpperCase()}
                <img src={calendar} alt='' />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((ch) => {
              let SportName = ch.sport;
              let MedalEvent;
              let discipline = ch.discipline;
              const sportIcon = ConstantSport(discipline);

              const baseUrlDot = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Dots/SVG/ec_${sportIcon}_dot_rgb.svg`;
              const baseUrlMedal = `https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Medals/SVG/ec_${sportIcon}_medalicon_rgb.svg`;

              if (ch.medal == 'Yes') {
                MedalEvent = baseUrlMedal;
              } else {
                MedalEvent = baseUrlDot;
              }

              let startTime = new Date(ch.start).toLocaleString('UTC', {
                timeZone: 'CET',
                hour: '2-digit',
                minute: '2-digit',
              });
              let endTime = new Date(ch.end).toLocaleString('UTC', {
                timeZone: 'CET',
                hour: '2-digit',
                minute: '2-digit',
              });
              // console.log(startTime);
              const showLocalTime = () => {
                if (isClicked === 'clicked') {
                  startTime = new Date(ch.start).toLocaleString('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  endTime = new Date(ch.end).toLocaleString('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }
              };
              showLocalTime();
              const showInMunichTime = () => {
                if (isClicked === '') {
                  let startTime = new Date(ch.start).toLocaleString('UTC', {
                    timeZone: 'CET',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  let endTime = new Date(ch.end).toLocaleString('UTC', {
                    timeZone: 'CET',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }
              };
              showInMunichTime();
              const disciplineRoute = Routing(ch.discipline);
              return (
                <div className='table-row'>
                  <tr>
                    <th className='event'>
                      <a
                        // href={`https://www.europeanchampionships.com/${
                        //   ch.sport === 'Canoe'
                        //     ? 'canoe-sprint'
                        //     : ch.sport.toLowerCase().replace(' ', '-')
                        // }#widget-02`}
                        href={
                          bannersport === 'rowing'
                            ? `/sport/${disciplineRoute}?lang=${lang}&sport=rowing`
                            : bannersport === 'athletics'
                            ? `/sport/${disciplineRoute}?lang=${lang}&sport=athletics`
                            : `/sport/${disciplineRoute}?lang=${lang}`
                        }
                        style={{ textDecoration: 'none', color: '#1c0e52' }}
                        target='_top'
                      >
                        {ch.sport} - {ch.event.split('&#039;').join("'")}
                      </a>
                    </th>
                  </tr>

                  <tr>
                    <th>
                      {startTime} - {endTime}
                    </th>
                    <th className='medal'>
                      <img src={MedalEvent} alt='' />
                    </th>
                    <th className='venue'>{ch.venue}</th>
                    <th className='calendar'>
                      <img
                        src={calendarPlus}
                        alt=''
                        onClick={() => {
                          add(
                            ch.type,
                            ch.sport,
                            ch.discipline,
                            ch.class,
                            ch.session,
                            ch.gender,
                            ch.phase,
                            ch.event,
                            ch.start,
                            ch.end,
                            ch.venue,
                            ch.day,
                            ch.medal
                          );
                          ReactGa.event({
                            category: 'SPW3',
                            action: 'Add to Calendar',
                          });
                        }}
                      />
                    </th>
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      )}
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

export default Widget3;
