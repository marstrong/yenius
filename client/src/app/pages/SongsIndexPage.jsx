import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchSongsIndex } from "../../features/songs/songsSliceThunks";

import Breadcrumbs from "../layout/Breadcrumbs";
import IndexChars from "../components/SongIndexChars";
import IndexList from "../components/SongIndexList";
import TopSongs from "../components/SongsTop";

// import "../../stylesheets/IndexContainer.scss";
// import "../../stylesheets/SongsIndex.scss";

const Suggestions = () => {
  return (
    <div>
      <h1>Suggestions</h1>
      How about these songs?
      <TopSongs />
    </div>
  );
};

const IndexLayout = ({ char, match }) => {
  const content = char ? <IndexList char={char} /> : <Suggestions />;
  return (
    <section className="IndexLayout">
      <div>
        <IndexChars />
        {content}
        <Breadcrumbs match={match} />
      </div>
    </section>
  );
};

const SongsIndexPage = ({ match }) => {
  const [lastCharFetched, setLastCharFetched] = useState(null);
  const selectedChar = match.params.char;

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedChar && lastCharFetched !== selectedChar) {
      dispatch(fetchSongsIndex(selectedChar));
      setLastCharFetched(selectedChar);
    }
  }, [selectedChar, lastCharFetched, dispatch]);

  return (
    <div className="IndexContainer">
      <IndexLayout char={selectedChar} match={match} />
    </div>
  );
};

export default SongsIndexPage;
