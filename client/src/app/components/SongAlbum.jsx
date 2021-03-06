import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectAlbumBySongId } from "../../features/albums/albumsSlice";
import { selectSongById } from "../../features/songs/songsSlice";

import ArtistLinks from "./ArtistLinks";

const TrackListing = ({ trackId, songId }) => {
  const track = useSelector((state) => selectSongById(state, trackId));
  if (!track) {
    return null;
  }

  const isCurrentSong = track.id === parseInt(songId);
  const className = isCurrentSong
    ? "track_listing-track track_listing-track--current"
    : "track_listing-track";
  const trackName = isCurrentSong ? (
    <span>{track.name}</span>
  ) : (
    <Link to={`/songs/${track.id}`} style={{ color: "#000000" }}>
      {track.name}
    </Link>
  );

  return (
    <div className={className}>
      <span className="track_listing-track_number">
        {track.trackNumber}.&nbsp;&nbsp;
      </span>
      {trackName}
    </div>
  );
};

const AlbumTracks = ({ songId }) => {
  const album = useSelector((state) => selectAlbumBySongId(state, songId));
  if (!album || !album.songs) {
    return null;
  }
  if (album.name === "Samples & Interpolations") {
    return null;
  }
  const trackListings = album.songs.map((trackId) => (
    <TrackListing key={trackId} trackId={trackId} songId={songId} />
  ));
  return (
    <div className="track_listing track_listing--columns">{trackListings}</div>
  );
};

const AlbumInfo = ({ songId }) => {
  const album = useSelector((state) => selectAlbumBySongId(state, songId));
  if (!album) {
    return null;
  }
  if (album.name === "Samples & Interpolations") {
    return (
      <div className="song_album u-bottom_margin">
        <img src={`${album.urlAlbumCover}`} alt={album.name} />
        <div className="song_album-info">
          {album.name}
          <br />
          <span className="song_album-info-release_year">
            {"Various Artists"}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="song_album u-bottom_margin">
      <Link to={`/albums/${album.id}`} className="song_album-album_art">
        <img src={album.urlAlbumCover} alt={album.name} />
      </Link>
      <div className="song_album-info">
        <Link to={`/albums/${album.id}`} className="song_album-info-title">
          {album.name}
          <span className="song_album-info-release_year"> ({album.year})</span>
        </Link>
        <ArtistLinks artistIds={album.artistCredits["PRIMARY_ARTIST"]} />
      </div>
    </div>
  );
};

const SongAlbum = ({ songId }) => {
  return (
    <div className="SongAlbum">
      <div className="u-xx_large_vertical_margins">
        <AlbumInfo songId={songId} />
        <AlbumTracks songId={songId} />
      </div>
    </div>
  );
};

const Loader = ({ songId }) => {
  const fetchSongAlbum = useSelector(
    (state) => state.songs.status.fetchSongAlbum
  );
  const asyncRequests = [fetchSongAlbum];
  if (asyncRequests.every((status) => status === "fulfilled")) {
    return <SongAlbum songId={songId} />;
  } else {
    return <div className="loader" />;
  }
};

export default Loader;
