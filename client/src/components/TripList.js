import React from 'react';
import {Link} from "react-router-dom";

export const TripList = ({tripList}) => {
  return (
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>NAME</th>
          <th>TELEMATICS</th>
        </tr>
        </thead>

        <tbody>
        {tripList && tripList.map((trip, index) => {
          return (
              <tr key={trip._id}>
                <td>{index + 1}</td>
                <td>{trip.name}</td>
                <td>
                  <Link to={`/data/list/${trip._id}`}>Show Trip Telematics</Link>
                </td>
              </tr>
          );
        })}
        </tbody>
      </table>
  );
};
