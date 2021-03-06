import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTopScholars } from "../../features/users/usersSliceThunks";

import { selectTopScholars } from "../../features/users/usersSlice";

import PageNotFound from "../pages/NotFoundPage";

// import "../.././stylesheets/TopSongsRow.scss";

const svgFlame = (
  <svg viewBox="0 0 17 26">
    <path
      fill="#FF1464"
      d="M4 3c2.95 1 6.84 8.93 6.84 8.93a8.361 8.361 0 0 0 1-5.43A15.928 15.928 0 0 1 17 18c-.12 7-8.85 8.05-8.85 8.05a4.63 4.63 0 0 0 1.76-2.87c.29-1.8-2.58-3.8-2.58-3.8-2.48 4.15-1.07 6.67-1.07 6.67S0 23.1 0 19.24c0-3.86 4.22-7.75 4.62-10.79A12.25 12.25 0 0 0 4 3zm2.58 5.51h-.02v.17A13.89 13.89 0 0 1 4.23 14C3.13 15.77 2 17.65 2 19.25c0 1 .88 2.07 2 3a12.38 12.38 0 0 1 1.62-3.9l1.1-1.84 1.84 1.2c.59.45 3.29 2.48 3.44 5a5.47 5.47 0 0 0 3-4.78 12.81 12.81 0 0 0-1.73-6.37c-.19.5-.426.98-.7 1.44l-1.89 3.1-1.62-3.29a39.714 39.714 0 0 0-2.48-4.3z"
    ></path>
  </svg>
);
const svgEye = (
  <svg viewBox="0 0 22 15.45">
    <path d="M11 2c4 0 7.26 3.85 8.6 5.72-1.34 1.87-4.6 5.73-8.6 5.73S3.74 9.61 2.4 7.73C3.74 5.86 7 2 11 2m0-2C4.45 0 0 7.73 0 7.73s4.45 7.73 11 7.73 11-7.73 11-7.73S17.55 0 11 0z"></path>
    <path d="M11 5a2.73 2.73 0 1 1-2.73 2.73A2.73 2.73 0 0 1 11 5m0-2a4.73 4.73 0 1 0 4.73 4.73A4.73 4.73 0 0 0 11 3z"></path>
  </svg>
);

const TopScholarsRow = ({ user, rank }) => {
  const userId = user.id;
  const username = user.username;
  const userIQ = user.authoredCommentsCount;
  const userColor = user.myColor;

  const styleUserImage = {
    backgroundColor: userColor,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  let content;
  if (user) {
    content = (
      <div className="TopSongRow">
        <Link to={`/users/${userId}`} className="ChartItem__Row">
          <div className="ChartItem__Rank">{rank}</div>
          <div className="ChartSong__CoverAndTitle">
            <div className="ChartSong__Cover">
              <div className="SizedImage__Container" style={styleUserImage}>
                {/* <noscript>
                  <img
                    src={`url(${artistHeadshotUrl})`}
                    className="SizedImage__NoScript"
                  />
                </noscript> */}
              </div>
            </div>
            <h3 className="ChartSong__TitleAndLyrics">
              <div className="ChartSong__Title">{username}</div>
              {/* <div className="ChartSong__Lyrics">
                <span
                  color="background.onVariant"
                  fontWeight="normal"
                  className="TextLabel"
                >
                  Lyrics
                </span>
              </div> */}
            </h3>
          </div>
          <h4 className="ChartSong__Artist">
            {/* {"YeniusIQ: "}
            {userIQ} */}
          </h4>
          <div className="ChartSong__Metadata">
            <div className="ChartSong__Metadatum">
              <div className="IconWithLabel__Container">
                <div color="accent.main" className="IconWithLabel__Icon">
                  {/* {svgFlame} */}
                </div>
                <span
                  color="accent.main"
                  fontWeight="normal"
                  className="TextLabel_2"
                >
                  {/* 363 */}
                </span>
              </div>
            </div>
            <div className="ChartSong__Metadatum">
              <div className="IconWithLabel__Container">
                <div color="background.on" className="IconWithLabel__Icon_2">
                  {/* {svgEye} */}
                </div>
                <span
                  color="background.on"
                  fontWeight="normal"
                  className="TextLabel_3"
                >
                  {userIQ}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return content;
};

// import "../.././stylesheets/TopScholars.scss";

const TopScholarsContent = () => {
  const users = useSelector((state) => selectTopScholars(state));
  const rows = users.map((user, idx) => (
    <TopScholarsRow user={user} rank={idx + 1} key={idx} />
  ));
  return <div>{rows}</div>;
};

const TopScholarsContainer = () => {
  const [requestSent, setRequestSent] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!requestSent) {
      dispatch(fetchTopScholars());
      setRequestSent(true);
    }
  }, [requestSent, dispatch]);

  const fetchTopScholarsStatus = useSelector(
    (state) => state.users.status.fetchTopScholars
  );

  let content;
  if (!fetchTopScholarsStatus || fetchTopScholarsStatus === "pending") {
    content = <div className="loader" />;
  } else if (fetchTopScholarsStatus === "fulfilled") {
    content = <TopScholarsContent />;
  } else if (fetchTopScholarsStatus === "rejected") {
    content = (
      <div>
        fetchTopScholars was rejected!
        <br />
        <PageNotFound />
      </div>
    );
  } else {
    content = <div>Something unexpected happened in TopScholars...</div>;
  }

  return <div className="TopScholars">{content}</div>;
};

export default TopScholarsContainer;
