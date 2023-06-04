import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, Link, Pagination, Tooltip } from '@mui/material';
import styles from './Home.module.css';
import { getBeerFromIdb, toogleBeerInSavedList, setBeerToIdb } from '../../indexDB';


const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [listPage, setListPage] = useState<number>(1);

  useEffect(() => {
    fetchData(setBeerList);
    getBeerFromIdb(setSavedList);
  }, []);

  useEffect(() => {
    setBeerToIdb(savedList)
  }, [savedList])

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setListPage(value)
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <Button variant='contained' onClick={() => fetchData(setBeerList)}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Tooltip title={`${(savedList.some((savedBeer) => savedBeer.id === beer.id) ? 'remove from' : 'add to')} saved`} placement="left-start" arrow>
                      <Checkbox
                        onChange={() => toogleBeerInSavedList(beer, savedList, setSavedList)}
                        checked={savedList.some((savedBeer) => savedBeer.id === beer.id)} />
                    </Tooltip>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button disabled={savedList.length < 1} variant='contained' size='small' onClick={() => setSavedList([])}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Tooltip title='remove from saved' placement="left-start" arrow>
                      <Checkbox
                        onChange={() => toogleBeerInSavedList(beer, savedList, setSavedList)}
                        checked={savedList.some((savedBeer) => savedBeer.id === beer.id)} />
                    </Tooltip>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {savedList.length === 0 && <p>No saved items</p>}
              </ul>
              {savedList.length > 10 && (<Pagination count={10} variant="outlined" shape="rounded" page={listPage} onChange={onPageChange} />)}
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
