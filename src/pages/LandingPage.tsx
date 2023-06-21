import { Button } from "@mui/material";
import React from "react";
import { PieChart } from "../assets/pie-chart";
import { CircleGroup } from "../assets/circle-group";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./../style/landingPage.module.css";
import MediumLogo from "./../assets/medium.png";
import DashboardImg from "./../assets/dashboard.png";
import GroupImg from "./../assets/groupPage.png";
import {
  CollectionsBookmark,
  DocumentScanner,
  Group,
  SupervisedUserCircle,
} from "@mui/icons-material";
import { Linode } from "../assets/Linode";

const features = [
  {
    name: "Group Expenses",
    description: "Share your expenses among group of friends with ease.",
    icon: Group,
  },
  {
    name: "Manage Expenses",
    description:
      "Keep track of your expenses. Manage whom you owe and also who owes you.",
    icon: CollectionsBookmark,
  },
  {
    name: "Share it Individually",
    description: "Share the bill with your friends individually.",
    icon: SupervisedUserCircle,
  },

  {
    name: "Expense Reporting",
    description: "Track all your expenses with our reporting service.",
    icon: DocumentScanner,
  },
];

function LandingPage() {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.Container}>
        <div className={styles.ContainerBottomSpace} />
        <div className={styles.SubMainContainer}>
          <div className={styles.SubContainer}>
            <div className={styles.ContainerHead}>
              <h1 className={styles.ContainerHeadHeading}>
                <span className={styles.ContainerHeadHeadingBlack}>
                  Split bills with your friends
                </span>
                <span className={styles.ContainerHeadHeadingPrimary}>
                  without any hassle
                </span>
              </h1>
              <p className={styles.ContainerHeadSubHeading}>
                Split bills with your friends easily and efficiently. Register
                today with your friends
              </p>
              <div className={styles.ContainerHeadButton}>
                <Link to='/register'>
                  <Button variant='contained' fullWidth>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Second Container */}
      <div>
        <div className={styles.SecondContainer}>
          <p className={styles.SecondContainerTitle}>Checkout the article on</p>
          <div className={styles.SecondContainerImageContainer}>
            <div className={styles.SecondContainerImageDiv}>
              <a href='https://medium.com/' target='_blank' rel='noreferrer'>
                <img
                  src={MediumLogo}
                  alt='hashnode'
                  className={styles.SecondContainerImage}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Alternating Feature Sections */}

      <div className={styles.FeatureContainerMain}>
        <div aria-hidden='true' className={styles.FeatureContainerDivider} />
        <div>
          <div className={styles.FeatureOne}>
            <div className={styles.FeatureOneContainer}>
              <div>
                <div className={styles.FeatureOneContentSvg}>
                  <PieChart />
                </div>
                <div className={styles.FeatureOneContent}>
                  <h2>Stay on top of your bills</h2>
                  <p>
                    No need to remember the expenses. Use{" "}
                    <span>Split Bill</span> to keep track of your bills and
                    share your expenses with your friends.
                  </p>
                  <div>
                    <Link to='/register'>
                      <Button variant='contained'>Get Started</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.FeatureOneImageContainer}>
              <div>
                <img className='' src={DashboardImg} alt='dashboard' />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.FeatureTwo}>
            <div className={styles.FeatureOneImageContainer}>
              <div>
                <img className='' src={GroupImg} alt='dashboard' />
              </div>
            </div>
            <div className={styles.FeatureOneContainer}>
              <div>
                <div className={styles.FeatureOneContentSvg}>
                  <CircleGroup />
                </div>
                <div className={styles.FeatureOneContent}>
                  <h2> Create Groups for easy management</h2>
                  <p>
                    Want to share your expenses with group of friends? No
                    worries create groups and share it easily.
                  </p>
                  <div>
                    <Link to='/register'>
                      <Button variant='contained'>Get Started</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.OurFeatureMainContainer}>
        <div className={styles.OurFeatureContainer}>
          <h2>Our Features</h2>
          <p>
            SplitBill has lots of features. Explore the features below to know
            what you are missing out on.
          </p>
          <div className={styles.OurFeatureBox}>
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span className={styles.OurFeatureBoxIcon}>
                    <feature.icon aria-hidden='true' />
                  </span>
                </div>
                <div className={styles.OurFeatureBoxContent}>
                  <h3>{feature.name}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className='bg-gray-50' aria-labelledby='footer-heading'>
        {/* <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2> */}
        <div className={styles.FooterContainer}>
          <div className={styles.FooterContainerBox}>
            <div>
              <h3>Follow Me</h3>
              <div>
                <a
                  href='https://medium.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img src={MediumLogo} alt='medium' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
