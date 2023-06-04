import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentBeerName } from '../../indexDB';

interface Props {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const TopBar = (props: Props) => {
  const location = useLocation();
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Home');
    } else if (location.pathname === '/beer') {
      setTitle('Beer List');
    } else if (location.pathname.includes('/beer/')) {
      getCurrentBeerName(setTitle);
    } else {
      setTitle('');
    }
  }, [location])

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
