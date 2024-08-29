import { Container, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      <Container
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "space-between",

        }}
      >
        {/* <br /> */}

        <Container sx={{ flex: 1, mr: 2 }}>
          <Typography variant="h6">About My Card Website</Typography>
          <Typography variant="body1" paragraph>
            {/* <br /> */}

            Welcome to my Card Website, your go-to platform for creating, managing, and sharing business cards. Whether you're a business owner, freelancer, or just someone who wants to showcase their professional identity, our website offers a seamless experience for all your card needs.

            Features
            Browse Cards: Explore a variety of cards created by users across different industries. You can easily browse as a guest or sign up for more personalized features.

            Like Your Favorite Cards: Show appreciation for cards that catch your eye by liking them. Simply click the heart icon to save your favorite cards to your profile.

            Create & Edit Cards: Registered users can create their own cards, complete with custom images, contact information, and business details. Need to make changes? Editing your card is just a click away.

            Detailed Card View: Click on any card to view more details, including the image, address, phone number, and business number. This detailed view helps you get all the information you need at a glance.

            User-Friendly Navigation: Easily navigate through different sections of the website, including the About page, your favorite cards, and more, using our intuitive menu.

            Registration & Login: Sign up for an account to unlock additional features like creating and editing cards, liking your favorite designs, and more. Already have an account? Simply log in to continue where you left off.
            {/* <br />
            <Divider />
            <br /> */}
            Our Mission
            Our mission is to make professional networking easier by providing a platform where you can create, share, and manage your business cards online. With a focus on simplicity and usability, we aim to help you put your best foot forward, whether you're networking in person or online.

            Thank you for choosing our website as your digital business card solution!

            This expanded text can help convey the value and features of your site, making it easier for users to understand what they can do and how to navigate the platform.
          </Typography>
        </Container>
        <IconButton
          sx={{
            width: "600px",
            height: "300px",
            borderRadius: '0px',
          }}
        >
          <video
            width="600"
            height="300"
            autoPlay
            muted
            loop
            playsInline
            style={{ borderRadius: '10%' }}
          >
            <source src="/images/CardWeb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </IconButton>
      </Container>
    </Container >
  );
}
