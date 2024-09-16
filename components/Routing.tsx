import React from "react";
import Home from "./Home";
import { AppShell } from "@mantine/core";
import Rightpane from "./Rightpane";
import Leftpane from "./Leftpane";
import Header from "./Header"

export default function Routing() {

    return (
        <AppShell  withBorder={true} navbar={{ width: 300, breakpoint: 768}} header={{ height: 45 }} aside={{ width: 320, breakpoint: 768 }}>

            <AppShell.Header zIndex='10' style={{backgroundColor:"#f8f9fa"}}>
                <Header/>
            </AppShell.Header>

            <AppShell.Navbar style={{backgroundColor:"#f8f9fa"}}>
                <Leftpane/>
            </AppShell.Navbar>
         
            <AppShell.Main style={{backgroundColor:"#f8f9fa"}}>
                <Home />
            </AppShell.Main>
            <AppShell.Aside style={{backgroundColor:"#f8f9fa"}}>
                <Rightpane/>
            </AppShell.Aside>

        </AppShell>
    )
}

