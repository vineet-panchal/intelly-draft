'use client';
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserBtn } from "@clerk/nextjs";
import { 
  AppBar, 
  Container, 
  // Button as Btn, 
  Toolbar, 
  Typography, 
  Box,
  Grid
} from "@mui/material";
import Head from "next/head";
import "@/app/css/landing-page.css";
import { React, useState } from "react";
import logo from "@/public/flash-card.png";
import Footer from "./components/Footer";
import headingBg from "@/public/bg-1.jpg";
import Link from "next/link";

export default function Home() {
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
    if (window.scrollY >= 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", setFixed);

  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Flashcard SaaS" />
      </Head>

      <div className="landingPage-ctr">
        <nav className={fix ? "navbar fixed" : "navbar"}>
          <div className="navbar-title-ctr">
            <Image src={logo} width={40} height={40} alt="Intelly logo" />
            {/* <Link className="navbar-title" href="navbar-title" passHref>Intelly</Link> */}
            <h4 className="navbar-title">Intelly</h4>
          </div>
          <ul className={active}>
            <SignedOut>
              <Link className="navbar-btn" href="/sign-in" passHref>Log In</Link>
              <Link className="navbar-btn" href="/sign-up" passHref>Sign Up</Link>
            </SignedOut>
            <SignedIn>
              <UserBtn />
            </SignedIn>
          </ul>
          <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>

        <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
          <Box 
            className="headingBg-ctr"
            width={"90vw"}
            height={"75vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            borderRadius={"30px"}
          >
            <Typography variant="h2" fontFamily={"sans-serif"} gutterBottom>Welcome To Intelly</Typography>
            <Typography variant="h5" fontFamily={"sans-serif"} pb={4} gutterBottom>
              {' '}Introducing the fastest way to create flashcards from scratch.
            </Typography>
            <button className="heading-btn">Get Started</button>
          </Box>
        </Box>

        <Box className="features-ctr" width={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Typography color={"white"} variant="h4" textAlign={"center"} gutterBottom>Features</Typography>
          <div className="features-cards">
            <ul>
              <li>
                <div className="featureCard" id="featureCard-1">
                  <Typography fontWeight={900} className="featureCard-title">Easy Text Input</Typography>
                  <Typography className="featureCard-subtitle">
                    Simply input you text and let our software do the rest.
                    Creating flashcards has never been easier.
                  </Typography>
                </div>
              </li>

              <li>
                <div className="featureCard" id="featureCard-2">
                  <Typography fontWeight={900} className="featureCard-title">Smart Flashcards</Typography>
                  <Typography className="featureCard-subtitle">
                    Our AI intelligently breaks down your text into concise
                    flashcards perfect for studying.
                  </Typography>
                </div>
              </li>

              <li>
                <div className="featureCard" id="featureCard-3">
                  <Typography fontWeight={900} className="featureCard-title">Accessible Anywhere</Typography>
                  <Typography className="featureCard-subtitle">
                    Access your flashcards from any device and at any time.
                    Study on the go with ease. 
                  </Typography>
                </div>
              </li>
            </ul>
          </div>
        </Box>

        <Typography m={"30px"} color={"white"} variant="h4" textAlign={"center"} gutterBottom>Pricing</Typography>
        <div class="pricing-ctr">
          <div class="pricingCard">
            <h3 className="pricingCard-title" id="basicPlan-title">Basic Plan</h3>
            <div class="pricingCard-price">
              <h1><sup>$</sup>2<small>month</small></h1>
            </div>
            <div class="pricingCard-description">
              <ul>
                <li>Access to limited app features.</li>
                <li>Limited Storage</li>
              </ul>
            </div>
            <button className="pricingCard-btn">Choose Basic</button>
          </div>
          <div class="pricingCard popular">
            <div class="pricingCard-ribbon">
              <span>MOST POPULAR</span>
            </div>
            <h3 className="pricingCard-title" id="proPlan-title">Pro Plan</h3>
            <div class="pricingCard-price">
              <h1><sup>$</sup>5<small>month</small></h1>
            </div>
            <div class="pricingCard-description">
              <ul>
                <li>Access to unlimited flashcards</li>
                <li>Storage with priority support.</li>
              </ul>
            </div>
            <button className="pricingCard-btn">Choose Pro</button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
