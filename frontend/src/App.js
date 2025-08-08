import React from 'react'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import { Container } from "@mui/material"
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Header />
        <main style={{
          marginTop: 20,
          marginBottom: 20
        }}>
          <Container>
            <Outlet />
          </Container>
        </main>
      <Footer />
    </React.Fragment>
  )
}

export default App