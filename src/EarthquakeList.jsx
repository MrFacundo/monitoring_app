import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';

function EarthquakeList({ earthquakes, setActiveCoords }) {
  const [orderBy, setOrderBy] = useState('time');
  const [order, setOrder] = useState('desc');

  const handleSort = (key) => {
    setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const sorted = [...earthquakes].sort((a, b) => {
    let aVal = a.properties[orderBy], bVal = b.properties[orderBy];
    if (orderBy === 'place') {
      aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase();
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return (
    <TableContainer component={Paper} sx={{ my: 4, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel active={orderBy === 'place'} direction={order} onClick={() => handleSort('place')}>
                Place
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={orderBy === 'mag'} direction={order} onClick={() => handleSort('mag')}>
                Magnitude
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={orderBy === 'time'} direction={order} onClick={() => handleSort('time')}>
                Time
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map(eq => (
            <TableRow
              key={eq.id}
              hover
              onClick={() => {
                setActiveCoords([eq.geometry.coordinates[1], eq.geometry.coordinates[0]]);
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>{eq.properties.place}</TableCell>
              <TableCell>{eq.properties.mag}</TableCell>
              <TableCell>{new Date(eq.properties.time).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EarthquakeList;
