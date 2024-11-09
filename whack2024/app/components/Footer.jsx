import { Box, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <Box
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#ab790c',
            }}
        >
            <Stack direction="column" alignItems="center" spacing={1}>
                <Typography variant="body1" color="textSecondary" align="center">
                    Built with React, Next.js, and Material UI, and Adobe Express
                </Typography>

                <Link href="https://github.com/jaquevan" target="_blank" color="inherit" underline="hover">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <GitHubIcon fontSize="small" />
                        <Typography variant="body2">View on GitHub</Typography>
                    </Stack>
                </Link>

                <Typography variant="caption" color="textSecondary" align="center">
                    © 2024 Camelitics. All rights reserved.
                </Typography>
            </Stack>
        </Box>
    );
}
