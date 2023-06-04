import { useEffect, useState } from 'react';
import { ApiParams, Beer } from '../../types';
import { fetchBeerList } from './utils';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Pagination, Radio, RadioGroup, Select, Tooltip, Typography } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link, useNavigate } from 'react-router-dom';
import { fetchMetaData } from '../Home/utils';
import { setBeerToIdb, toogleBeerInSavedList } from '../../indexDB';

const BeerList = () => {

  const perPage = [10, 20, 50];
  const beerTypes = [
    'micro',
    'nano',
    'regional',
    'brewpub',
    'large',
    'planning',
    'bar',
    'contract',
    'proprietor',
    'closed'];
  const defaultOptions: ApiParams = { page: 1, per_page: 20, sort: 'name:asc', };
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [options, setOptions] = useState<ApiParams>(defaultOptions);
  const [allBeerCount, setAllBeerCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(Math.ceil(allBeerCount / (options.per_page ? options.per_page : 1)));
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBeerList(setBeerList, options);
  }, [options.page]);

  useEffect(() => {
    fetchMetaData(setAllBeerCount, options);
    if (options.per_page) {
      setPagesCount(Math.ceil(allBeerCount / options.per_page));
    }
  }, [allBeerCount, options.per_page, beerList]);

  useEffect(() => {
    setBeerToIdb(savedList);
  }, [savedList]);

  const modifyOptions = (optionName: string, value: any) => {
    const temp: ApiParams = { ...options };
    if (optionName !== 'page') {
      // reset to page if other options are changed, so that the user doesn't end up on a non existent
      temp.page = 1
    }
    temp[optionName as keyof ApiParams] = value;
    if (value === 'any') {
      delete temp[optionName as keyof ApiParams];
    }
    setOptions(temp);
  }

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    modifyOptions('page', value);
  }

  return (
    <article>
      <section>
        <main>
          <Accordion>
            <AccordionSummary
              expandIcon={<SettingsIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Display Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormLabel id="radio-group-sort">Sort by Name</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-group-sort"
                  name="radio-group-sort"
                >
                  <FormControlLabel onChange={(e) => modifyOptions('sort', (e.target as HTMLInputElement).value)} value="name:asc" checked={options.sort === "name:asc"} control={<Radio />} label="Ascending" />
                  <FormControlLabel onChange={(e) => modifyOptions('sort', (e.target as HTMLInputElement).value)} value="name:desc" checked={options.sort === "name:desc"} control={<Radio />} label="Descending" />
                </RadioGroup>
              </FormControl>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="beer-types-select"
                    id="beer-types-select"
                    value={options.by_type ? options.by_type : 'any'}
                    onChange={(e) => modifyOptions('by_type', (e.target as HTMLInputElement).value)}
                  >
                    <MenuItem
                      key='any'
                      value='any'>
                      any
                    </MenuItem>
                    {beerTypes.map((type) => (
                      <MenuItem
                        key={type}
                        value={type}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Beer Type</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="beers-per-page-select"
                    id="beers-per-page-select"
                    value={options.per_page}
                    onChange={(e) => modifyOptions('per_page', (e.target as HTMLInputElement).value)}
                  >
                    {perPage.map((number) => (
                      <MenuItem
                        key={number}
                        value={number}
                      >
                        {number}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Beers per page</FormHelperText>
                </FormControl>
              </Box>
              <Box>
              </Box>
              <Box>
                <Button variant="contained" onClick={() => { fetchBeerList(setBeerList, options) }}>
                  APPLY
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <List>
            {beerList.map((beer) => (
              <ListItem key={beer.id}>
                <Tooltip title={`${(savedList.some((savedBeer) => savedBeer.id === beer.id) ? 'remove from' : 'add to')} saved`} placement="left-start" arrow>
                  <Checkbox
                    onChange={() => toogleBeerInSavedList(beer, savedList, setSavedList)}
                    checked={savedList.some((savedBeer) => savedBeer.id === beer.id)} />
                </Tooltip>
                <ListItemButton onClick={() => navigate(`/beer/${beer.id}`)}>
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={beer.name} secondary={beer.brewery_type} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Pagination count={pagesCount} variant="outlined" shape="rounded" page={options.page} onChange={onPageChange} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
