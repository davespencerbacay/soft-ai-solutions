import { Box, Typography } from '@mui/material';
import "./Footer.css";

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <Box
            component="footer"
            className="footer"
        >
            <Typography variant="body2" color="text.secondary" align="center">
                Dave Spencer Bacay
            </Typography>
            <Typography color="text.secondary" align="center">
                All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;