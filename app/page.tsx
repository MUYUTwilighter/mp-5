"use client";

import {AppBar, Box, Button, Card, Input, InputLabel, Snackbar, Toolbar, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {useEffect, useState} from "react";
import create from "@/lib/create";

const Main = styled("main")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin: 5mm;
    padding: 5mm;
`;

export default function Home() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [copied, setCopied] = useState(false);
    const [popup, setPopup] = useState<string | null>(null);
    const [host, setHost] = useState("");

    useEffect(() => {
        if (window) {
            setHost(window.location.host);
        }
    }, []);

    return (
        <>
            <AppBar position="static" sx={{backgroundColor: "#444444"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        URL Shortener
                    </Typography>
                </Toolbar>
            </AppBar>
            <Main>
                <Typography variant="h4" fontWeight={"bold"}>Shorten a URL</Typography>
                <Typography variant="h6" color={"gray"}>Make long urls short by creating an alias</Typography>
                <StyledCard>
                    <InputLabel htmlFor={"url"}>URL</InputLabel>
                    <Input
                        id={"url"}
                        className={"MuiInput-fullWidth"}
                        sx={{width: "100%", marginBottom: 2}}
                        onChange={event => setUrl(event.target.value)}
                        value={url}
                    ></Input>
                    <InputLabel htmlFor={"alias"}>Alias</InputLabel>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <Typography>https://{host}/</Typography>
                        <Input
                            id={"alias"}
                            className={"MuiInput-fullWidth"}
                            onChange={event => {
                                setAlias(event.target.value);
                                setCopied(false);
                            }}
                            value={alias}
                        ></Input>
                        <Button
                            id={"copy"}
                            onClick={() => {
                                navigator.clipboard.writeText(`https://${host}/${alias}`).catch(reason => console.log(reason));
                                setCopied(true);
                            }}
                        >{copied ? "Copied" : "Copy"}</Button>
                    </Box>
                    <Button
                        sx={{backgroundColor: "black", color: "white", marginTop: 2, alignSelf: "center"}}
                        onClick={() => {
                            if (url.length <= 0 || !url.match(/^([a-zA-Z][a-zA-Z\d+\-.]*):\/\/([^\/\s]+)(?:\/(.*))?$/)) {
                                setPopup("Invalid URL");
                            } else if (alias.length <= 0) {
                                setPopup("Invalid Alias");
                            } else {
                                create(url, alias).then(result => {
                                    if (result) {
                                        setPopup("Shortened successfully!");
                                    } else {
                                        setPopup("Failed to shorten, try another name?");
                                    }
                                });
                            }
                        }}
                    >Shorten</Button>
                </StyledCard>
                <Box sx={{position: "fixed", top: 0, right: 0}}>
                    <Snackbar
                        open={!!popup}
                        autoHideDuration={3000}
                        onClose={() => setPopup(null)}
                        message={popup}
                    />
                </Box>
            </Main>
        </>
    );
}
