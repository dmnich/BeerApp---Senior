import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Link, Typography, CardActions, Button } from '@mui/material';

const Address = ({ lines }: { lines: (string | undefined)[] }) => {
  return (
    <div>
      {lines.filter(f => f).map((line, i) => (
        <Typography key={`${line}${i}`} variant="body2">
          {line}
        </Typography>
      ))}
    </div>
  );
}

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  useEffect(() => fetchData(setBeer, id), [id]);
  if (!beer) {
    return null;
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">
            {beer.name}
          </Typography>
          <Typography variant="h6" textTransform="capitalize" gutterBottom>
            {beer.brewery_type}
          </Typography>
          <Address
            lines={[beer.address_1, beer.address_2, beer.address_3]}
          />
          <Typography variant="body2">
            {beer.city}, {beer.state}
          </Typography>
          <Typography variant="body2">
            {beer.country}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link href={beer.website_url}>
              Website
            </Link>
          </Button>
          <Button size="small" color="primary">
            <Link href={`tel:${beer.phone}`}>
              Phone
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Box>)
};

export default Beer;
