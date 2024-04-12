import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// @ts-ignore
import logo from '../../assets/logo.png';
import {AuthService} from "../../services/auth";
import {useNavigate} from 'react-router-dom';
import {ActiveUser} from '../../services/user'

interface DrawerAppBarProps {
    window?: () => Window;
}

const drawerWidth = '50%';
const navItems: string[] = ['Search', 'Profile', 'Home', 'Log out'];

const DrawerAppBar: React.FC<DrawerAppBarProps> = ({window}) => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    function logout() {
        const token = ActiveUser.getAuthorization();
        if (token) {
            AuthService.logout(token);
            navigate("/signin")
        } else {
            console.error('Brak dostępnego tokenu');
        }
    }

    function homePageNavigate() {
        navigate("/home")
    }

    function profilePageNavigate() {
        navigate("/profile")
    }

    const handleNavItemClick = (item: string) => {
        switch (item) {
            case 'Search':
                break;
            case 'Profile':
                profilePageNavigate();
                break;
            case 'Home':
                homePageNavigate();
                break;
            case 'Log out':
                logout();
                break;
            default:
                break;
        }
    }

    function logout() {
        const token = ActiveUser.getAuthorization();
        if (token) {
            AuthService.logout(token);
            navigate("/signin")
        } else {
            console.error('Brak dostępnego tokenu');
        }
    }

    const handleNavItemClick = (item: string) => {
        switch (item) {
            case 'Learning':
                break;
            case 'Search':
                break;
            case 'Profile':
                break;
            case 'Log out':
                logout();
                break;
            default:
                break;
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle}
             sx={{textAlign: 'center', background: 'linear-gradient(to bottom, #007bff, #004d99)', color: 'white'}}>
            <Typography variant="h6" sx={{my: 2}}>
                <img src={logo} alt="Logo" style={{height: '60px', width: '60px', margin: 'auto'}}/>
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} onClick={() => handleNavItemClick(item)}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}, color: 'white'}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'none', md: 'block'}}}
                    >
                        <img src={logo} alt="Logo" style={{height: '70px', width: '70px'}}/>

                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
                        {navItems.map((item, index) => (
                            <Button key={item}
                                    onClick={() => handleNavItemClick(item)}
                                    sx={{
                                        color: '#fff',
                                        mr: index < navItems.length - 1 ? 18 : 6,
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold'
                                    }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: {sm: 'block', md: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, background: '#00000080'}
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;