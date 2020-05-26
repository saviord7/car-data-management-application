import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {DataList} from '../components/DataList';
import {useParams} from 'react-router-dom';

export const DataListPage = () => {
  const [dataList, setDataList] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);
  const owner = useParams().id;

  const fetchDataList = useCallback(async() => {
    try {
      const dataList = await request('/api/data/list',
          {
            owner
          },
          {
            Authorization: token
          });

      setDataList(dataList);

      const ratingData = await request('http://127.0.0.1:5000/api/predict',
          {
            data: dataList
                .map((data) => {
                  return [
                    data.accuracy,
                    data.bearing,
                    data.acceleration_x,
                    data.acceleration_y,
                    data.acceleration_z,
                    data.gyro_x,
                    data.gyro_y,
                    data.second,
                    data.speed
                  ];
                })
          });

      setRatingData(ratingData['prediction']
          .sort((a, b) => {
            return ratingData['prediction'].filter(v => v === a)['length'] - ratingData['prediction'].filter(v => v === b)['length'];

          })
          .pop());
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchDataList();
  }, [fetchDataList]);

  if (loading) {
    return <Loader/>;
  }

  return (
      <>
        {!loading && <DataList ratingData={ratingData} dataList={dataList}/>}
      </>
  );
};
