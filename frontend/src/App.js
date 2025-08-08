import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { Container } from "@mui/material"
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Header />
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
      <Footer />
    </React.Fragment>
  )
}

export default App