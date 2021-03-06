import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectSongIds, selectSongById } from "../../features/songs/songsSlice";

const IndexListItem = ({ songId }) => {
  const song = useSelector((state) => selectSongById(state, songId));
  return (
    <li>
      <Link to={`/songs/${songId}`} className="songs_index_list-song_name">
        {song.name} by {song.artist}
      </Link>
    </li>
  );
};

const IndexList = ({ char }) => {
  const songIds = useSelector((state) => selectSongIds(state));
  if (songIds.length === 0) {
    return (
      <h1 className="songs_index-header">
        No {char.toUpperCase()} Songs found
      </h1>
    );
  }
  const list = songIds.map((songId) => (
    <IndexListItem key={songId} songId={songId} />
  ));
  return (
    <div>
      <h1 className="songs_index-header">
        All {char.toUpperCase()} Songs on Yenius
      </h1>
      <ul className="songs_index_list">{list}</ul>
    </div>
  );
};

const Loader = ({ char }) => {
  const fetchSongsIndex = useSelector(
    (state) => state.songs.status.fetchSongsIndex
  );
  const asyncRequests = [fetchSongsIndex];
  if (asyncRequests.every((status) => status === "fulfilled")) {
    return <IndexList char={char} />;
  } else {
    return <div className="loader" />;
  }
};

export default Loader;
