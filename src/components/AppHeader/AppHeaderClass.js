import { makeStyles } from '@mui/styles';

const AppHeaderStyles = makeStyles(() => ({
    links: {
        fontFamily: "'Proxima Nova'",
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '24px',
        lineHeight: '29px',
        display: 'flex',
        alignItems: 'center',
        color: '#131313',
    },
    button: {
        color: '#131313',
        background: 'transparent',
        borderColor: '#131313',
    },
    whitebutton: {
        color: '#FFFFFF',
        background: 'transparent',
        borderColor: '#FFFFFF',
    },
    appbar: {
        background: 'transparent',
        boxShadow: 'none',
        height: '10vh',
    },
    appbarWhite: {
        background: '#FFFFFF',
        boxShadow: 'none',
        borderBottom: '1px solid #333333',
        height: '10vh',
    },
}));

export default AppHeaderStyles;
