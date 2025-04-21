"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import read from "@/lib/read";
import {Box, Button, Typography} from "@mui/material";
import Link from "next/link";

export default function Redirect() {
    const params = useParams();
    const slugs = Array.isArray(params.alias) ? params.alias : [params.alias];
    const alias = slugs.join("/");
    const [url, setUrl] = useState<string | null | undefined>(null);

    useEffect(() => {
        read(alias).then(result => {
            if (result === null) {
                setUrl(undefined)
            }
            if (url !== result) {
                setUrl(result);
            }
        });
    }, [alias]);

    return url === undefined ? <>
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                px: 2
            }}
        >
            <Typography variant="h2" gutterBottom>404</Typography>
            <Typography variant="h5" gutterBottom>The alias does not exist</Typography>
            <Button variant="contained" component={Link} href="/">
                Create a short link?
            </Button>
        </Box>
    </> : url === null ? <Typography variant="h2" gutterBottom>Redirecting...</Typography> : window.location.replace(url);
}