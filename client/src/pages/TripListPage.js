import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {TripList} from '../components/TripList';

export const TripListPage = () => {
  const [tripList, setTripList] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const fetchTripList = useCallback(async() => {
    try {
      const fetched = await request(
          '/api/trip/list',
          {
            owner: userData.userId
          },
          {
            Authorization: token
          }
      );

      setTripList(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchTripList();
  }, [fetchTripList]);

  if (loading) {
    return <Loader/>;
  }

  return (
      <>
        {!loading && <TripList tripList={tripList}/>}
      </>
  );
};
