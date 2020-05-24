import React from 'react';
import {Link} from "react-router-dom";

export const DataList = ({ratingData, dataList}) => {

  return (
      <div>
        <p style={{
          fontWeight: '4px'

        }}>Trip Rating: {ratingData !== 0 ? 'Dangerous Driving Style' : 'Safe Driving Style'}</p>

        <table style={{
          fontSize: '10px'
        }}>
          <thead>
          <tr>
            <th>№</th>
            <th>ACCURACY</th>
            <th>BEARING</th>
            <th>ACCELERATION X</th>
            <th>ACCELERATION Y</th>
            <th>ACCELERATION Z</th>
            <th>GYROSCOPE SENSOR X</th>
            <th>GYROSCOPE SENSOR Y</th>
            <th>GYROSCOPE SENSOR Z</th>
            <th>SECOND</th>
            <th>SPEED</th>
          </tr>
          </thead>

          <tbody>
          {dataList && dataList.map((data, index) => {
            return (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.accuracy}</td>
                  <td>{data.bearing}</td>
                  <td>{data.acceleration_x}</td>
                  <td>{data.acceleration_y}</td>
                  <td>{data.acceleration_z}</td>
                  <td>{data.gyro_x}</td>
                  <td>{data.gyro_y}</td>
                  <td>{data.gyro_z}</td>
                  <td>{data.second}</td>
                  <td>{data.speed}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
          <Link to={`/trip/list/`}>Go back to Trip List</Link>
      </div>
  );
};
