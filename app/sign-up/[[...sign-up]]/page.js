'use client'
import { SignUp } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { 
  AppBar, 
  Container, 
  Toolbar, 
  Typography,
  // Button as Btn, 
  Box
} from "@mui/material";
import Link from 'next/link';
import { React, useState, useEffect, useRef } from "react";
// import { useInView } from "framer-motion";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import logo from "@/public/flash-card.png";
// import "@/app/css/sign-in.css";
import "@/app/css/sign-up.css";

export default function SignUpPage() {
  const [active, setActive] = useState("navbar-menu");
  const [icon, setIcon] = useState("navbar-toggler");
  const navToggle = () => {
    if (active === "navbar-menu") {
      setActive("navbar-menu active");
    } else setActive("navbar-menu");

    // Icon Toggler
    if (icon === "navbar-toggler") {
      setIcon("navbar-toggler toggle");
    } else setIcon("navbar-toggler");
  };

  const [fix, setFix] = useState(false);
  function setFixed() {
    if (window.scrollY >= 1) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", setFixed);

  return (
    <> 
    <section className="signUp-ctr">
      <nav className={fix ? "navbar fixed" : "navbar"}>
        <div className="navbar-title-ctr">
          <Image src={logo} width={40} height={40} alt="Intelly logo" />
          <Link className="navbar-title" href="/" passHref>Intelly</Link>
        </div>
        <ul className={active}>
          <Link className="navbar-btn" href="/sign-in" passHref>Login</Link>
          <Link className="navbar-btn" href="/sign-up" passHref>Sign Up</Link>
        </ul>
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
        {/* <Container maxWidth="sm">
          <AppBar position="static" sx={{backgroundColor: "3f51b5"}}>
          <Toolbar>
          <Typography variant="h6" sx={{flexGrow: 1}}>Flashcard SaaS</Typography>
          <Btn color="inherit">
          <Link href="/login" passHref>Login</Link>
          </Btn>
          <Btn color="inherit">
          <Link href="/signup" passHref>Sign Up</Link>
          </Btn>
          </Toolbar>
          </AppBar> */}
      <Container maxWidth="sm" >    
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{pt: 10}}
          >
            {/* <Typography variant="h4">Sign In</Typography> */}
          <SignUp appearance={{
            baseTheme: [dark],
            variables: { colorPrimary: 'grey' }
          }} />
        </Box>
      </Container>
      <Footer />
    </section>
      {/* </Container> */}
    </>
  )
}