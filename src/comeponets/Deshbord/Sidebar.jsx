import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {HiOutlineHome} from 'react-icons/hi'
import {LuBedDouble} from 'react-icons/lu'
import {SlGrid} from 'react-icons/sl'
import {SlCreditCard} from 'react-icons/sl'
import {SlUser} from 'react-icons/sl'
import { useSelector } from 'react-redux';
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Logout from '../../models/Logout';
import { FaHotel } from "react-icons/fa6";


const drawerWidth = 240;

const icons =[
  {
    title : "Profile",
    link : "/deshbord/profile"
 },
 {
   title : "Rooms",
   link : "/deshbord/room"
},
{
 title : "Booking",
 link : "/deshbord/booking"
 },
 {
   title : "Customers",
   link : "/deshbord/customerDetail"
 },
 {
   title : "Payment",
   link : "/deshbord/admin/payment"
 },
  {
    title : "hotel Men...",
    link : "/deshbord/hotels"
  }
]

const customer=[
  {
    title : "Profile",
    link : "/deshbord/profile"
 },
{
 title : "Booking",
 link : "/deshbord/user/booking"
 },
 {
   title : "Payment",
   link : "/deshbord/paymentcomplete"
 }
]
const comman =[
   {
      title:"setting",
      path:"/deshbord/setting"
   },{
       title:"",
      path:""
   }
]
const openedMixin = (theme) => ({

  
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const {user} = useSelector((state)=>state.auths)
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
   
 
  return (
    <Box sx={{ display: 'flex' }} className="mt-10">
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
              {
                 user.accountType === "Admin" ? <div>Admin Deshbord</div> : <div>User Deshbord</div>
              }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {
               user.accountType === "Admin" ? (<div>
                   {icons.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block'}} className={`${location.pathname === text.link ? "bg-gray-300" : ""}`}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 && <HiOutlineHome size={25}/>}
                  {index === 1 && <LuBedDouble size={25}/>}
                  {index === 2 && <SlGrid size={20}/>}
                  {index === 3 && <SlUser size={20}/>}
                  {index === 4 && <SlCreditCard size={20}/>}
                  {index === 5 && <FaHotel size={20}/>}
            
                </ListItemIcon>
                <ListItemText primary={<Link to={text.link}>{text.title}</Link>} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
               </div>) : (<div>
                {customer.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block'}} className={`${location.pathname === text.link ? "bg-gray-300" : ""}`}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 && <Link to="/deshbord/profile"><HiOutlineHome size={25}/></Link>}
                  {index === 1 && <Link to="/deshbord/user/booking"><LuBedDouble size={25}/></Link>}
                  {index === 2 && <Link to="/deshbord/paymentcomplete"><SlCreditCard size={20}/></Link>}
            
                </ListItemIcon>
                <ListItemText primary={<Link to={text.link}>{text.title}</Link>} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
               </div>)
            }
        </List>
        <Divider />
        <List>
          {comman.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }} className={`${location.pathname === text.link ? "bg-gray-300" : ""}`}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <Link to="/deshbord/setting"><IoSettingsOutline size={25}/></Link> : <div className='flex items-center gap-x-5'><IoIosLogOut size={25}/><Logout/></div>}
                </ListItemIcon>
                <ListItemText primary={<Link to={text.path}>{text.title}</Link>} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
      </Box>
    </Box>
  );
}