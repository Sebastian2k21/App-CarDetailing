import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupsIcon from '@mui/icons-material/Groups';
import { useLeftNav } from '../context/LeftNavContext';
import { Link } from 'react-router-dom';

const DETAILER_OPTIONS = [
    {
      key: 'D1',
      type: "list", 
      items: [
        {label: "My Services", url: "/detailer/services", icon: <SettingsIcon/>},
        {label: "Team", url: "/detailer/team", icon: <GroupsIcon/>},
        {label: "Orders", url: "/detailer/orders", icon: <ReceiptIcon/>},
        {label: "Clients", url: "/detailer/clients", icon: <ReceiptIcon/>},
        {label: "Create Invoice", url: "detailer/invoices/create", icon: <ReceiptIcon/>},
        {label: "Invoices", url: "detailer/invoices", icon: <ReceiptIcon/>}
      ]
    },
    {
      key: 'D2',
      type: "divider"},
    {
      key: 'D3',
      type: "list", 
      items: [
        {label: "Analytics", url: "/detailer/analytics", icon: <SettingsIcon/>},
      ]
    },
]

const Sublist = ({options}) => {
  console.log(options)
  return (
    <List>
    {options.map((opt, index) => (
      <ListItem key={opt.label} disablePadding>

        <ListItemButton component={Link} to={opt.url}>
          <ListItemIcon>
            {opt.icon}
          </ListItemIcon>
          <ListItemText primary={opt.label} />
  
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  )
}


const LeftNav = () => {
    const {isOpenLeftNav, setIsOpenLeftNav} = useLeftNav()
    
      const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setIsOpenLeftNav(open)
      };

      const ListElement = ({opt}) => {
        if(opt.type === "divider") {
          return <Divider/>
        } else if(opt.type === "list") {
          return <Sublist key={opt.id} options={opt.items} />
        }
      }

      const list = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {DETAILER_OPTIONS.map(opt => <ListElement opt={opt}/>)}
        </Box>
      );

    return <>
          <Drawer
            anchor="left"
            open={isOpenLeftNav}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
    </>
}

export default LeftNav
