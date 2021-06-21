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
const Widget3 = () => {
  const calendar =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/PNG/calendar.png';

  const calendarPlus =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/PNG/calendar-plus.png';

  const rightArrow =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/SVG/chevron_right.svg';
  const leftArrow =
    'https://ecm-ecmdotcom.s3.eu-west-1.amazonaws.com/SPW/Other_elements/SVG/chevron_left.svg';
  const lang = window.location.pathname.split('/')[1];
  const bannersport = new URLSearchParams(window.location.search).get('sport');
  const bannerHeaderDesktop = `https://d156xmnjzkwf2j.cloudfront.net/SPW/header/desktop/${lang}/desktop_header_${lang}_${
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
  const dropdown2 = [];
  for (let i = 0; i < filterByDate.length; i++) {
    const medal = filterByDate[i].medal;
    if (dropdown2.indexOf(medal) === -1) {
      dropdown2.push(medal);
    }
  }
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
    }
    if (gender === 'No Filter Selected' && medal == 'No Filter Selected') {
      const filterbyUser = filterByDate.filter((ch) => ch.discipline === sport);
      if (filterbyUser.length === 0) {
        console.log(`10 is not Available`);
      } else {
        setFilteredData(filterbyUser);
        console.log('data acquired');
      }
    }
    if (medal === 'No Filter Selected' && sport === 'No Filter Selected') {
      const filterbyUser = filterByDate.filter((ch) => ch.gender === gender);
      if (filterbyUser.length === 0) {
        console.log(`9 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }

    if (gender === 'No Filter Selected' && sport === 'No Filter Selected') {
      const filterbyUser = filterByDate.filter((ch) => ch.medal === medal);
      if (filterbyUser.length === 0) {
        console.log(`8 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }

    if (gender === 'No Filter Selected') {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.discipline == sport && ch.medal == medal
      );
      if (filterbyUser.length === 0) {
        console.log(`7 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }

    if (medal === 'No Filter Selected') {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.gender === gender && ch.discipline == sport
      );
      if (filterbyUser.length === 0) {
        console.log(`6 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }

    if (sport === 'No Filter Selected') {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.gender == gender && ch.medal === medal
      );
      if (filterbyUser.length === 0) {
        console.log(`5 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    }

    if (
      gender !== 'No Filter Selected' &&
      sport !== 'No Filter Selected' &&
      medal !== 'No Filter Selected'
    ) {
      const filterbyUser = filterByDate.filter(
        (ch) =>
          ch.gender == gender && ch.discipline == sport && ch.medal == medal
      );
      if (filterbyUser.length === 0) {
        console.log(`4 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    } else if (gender && sport && medal) {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.gender == gender && ch.discipline == sport
      );
      if (filterbyUser.length === 0) {
        console.log(`3 is not Available`);
      } else {
        setFilteredData(filterbyUser);
      }
    } else if (sport && medal) {
      const filterbyUser = filterByDate.filter(
        (ch) => ch.discipline == sport && ch.medal == medal
      );
      if (filterbyUser.length === 0) {
        console.log(`2 is not Available`);
      } else if (gender && medal) {
        const filterbyUser = filterByDate.filter(
          (ch) => ch.gender == gender && ch.medal == medal
        );
        if (filterbyUser.length === 0) {
          console.log(`1 is not Available`);
        }
      } else {
        setFilteredData(filterbyUser);
      }
    }

    // if (sport) {
    //   const filterbyUser = filterByDate.filter((ch) => ch.discipline === sport);
    //   if (filterbyUser.length === 0) {
    //     console.log(`${gender} is not Available`);
    //   } else {
    //     setFilteredData(filterbyUser);
    //   }
    // }

    // if (gender && sport && medal == 'All') {
    //   const filterbyUser = filterByDate.filter(
    //     (ch) => ch.gender == gender && ch.sport === sport
    //   );
    //   if (filterbyUser.length === 0) {
    //     console.log(`${gender} is not Available`);
    //   } else {
    //     setFilteredData(filterbyUser);
    //   }
    // }
    // if (sport && medal == 'All') {
    //   const filterbyUser = filterByDate.filter((ch) => ch.sport === sport);
    //   if (filterbyUser.length === 0) {
    //     console.log(`${gender} is not Available`);
    //   } else {
    //     setFilteredData(filterbyUser);
    //   }
    // }

    // if (gender && medal == 'All') {
    //   const filterbyUser = filterByDate.filter((ch) => ch.gender === gender);
    //   if (filterbyUser.length === 0) {
    //     console.log(`${gender} is not Available`);
    //   } else {
    //     setFilteredData(filterbyUser);
    //   }
    // }
  };

  useEffect(() => {
    WeekDay();
    sportListUpdate();
    setGender('No Filter Selected');
    setMedal('No Filter Selected');
    setSport('No Filter Selected');
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
      start: [year, month, dayTime, startTimehour, startTimeminute],
      end: [year, month, endTime, endTimehour, endTimeminute],
      title: `${discipline} - ${event.split('&#039;').join("'")}`,
      description: `${discipline} - ${event.split('&#039;').join("'")}`,
      location: venue,
    };
    createEvent(eventCalen, (error, value) => {
      if (error) {
        console.log(error);
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
              setMedal(e.value);
            }}
            value={
              medal === 'No Filter Selected'
                ? `${StaticArray[0]['MedalEvent'][lang].toUpperCase()}`
                : medal
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
                <span onClick={() => setMedal('No Filter Selected')}>x</span>
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
      <table className='date-event-table'>
        <thead>
          <th>{StaticArray[0]['Sports'][lang].toUpperCase()}</th>
          <th>{StaticArray[0]['Eventname'][lang].toUpperCase()}</th>
          <th>TIME*</th>
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
                    href={`/${lang}/sport/${disciplineRoute}`}
                    style={{ textDecoration: 'none', color: '#1c0e52' }}
                    target='_top'
                  >
                    {ch.discipline}
                  </a>
                </th>
                <th className='event'>{ch.event.split('&#039;').join("'")}</th>
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
                    }}
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className='content-table-mobile'>
        <thead>
          <tr>
            <th className='sport-event'>
              {StaticArray[0]['Sports'][lang].toUpperCase()} &{' '}
              {StaticArray[0]['Eventname'][lang].toUpperCase()}
            </th>
          </tr>
          <tr>
            <th>TIME*</th>
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
                      href={`/${lang}/sport/${disciplineRoute}`}
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
                      }}
                    />
                  </th>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Widget3;
