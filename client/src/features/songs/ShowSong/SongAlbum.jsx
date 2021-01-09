import React from "react";
import { useSelector } from "react-redux";
import { selectSongById } from "../songsSlice";
import { selectAlbumById, selectAlbumBySongId } from "../../albums/albumsSlice";
import { InterspersedArtistLinks } from "../../artists/ArtistsLinks";

const TrackListing = ({ trackId, songId }) => {
  const track = useSelector((state) => selectSongById(state, trackId));
  if (!track) {
    return null;
  }
  let className = "track_listing-track";
  let trackName = <a href={`/songs/${track.id}`}>{track.name}</a>;
  // TrackListing for the SongPage song should be displayed differently
  if (track.id === parseInt(songId)) {
    className = className.concat(" track_listing-track--current");
    trackName = <span>{track.name}</span>;
  }
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
  const song = useSelector((state) => selectSongById(state, songId));
  const album = useSelector((state) => selectAlbumById(state, song.albumId));
  if (!album || !album.songs) {
    return null;
  }
  const trackListings = album.songs.map((trackId) => (
    <TrackListing trackId={trackId} songId={songId} />
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
  return (
    <div className="song_album u-bottom_margin">
      <a href={`/albums/${album.id}`} className="song_album-album_art">
        <img src={album.songAlbumCoverArt} alt={album.name} />
      </a>
      <div className="song_album-info">
        <a href={`/albums/${album.id}`} className="song_album-info-title">
          {album.name}
          <span className="song_album-info-release_year"> ({album.year})</span>
        </a>
        <InterspersedArtistLinks artistIds={album.artistsPrimary} />
      </div>
    </div>
  );
};

const SongAlbum = ({ songId }) => (
  <div className="SongAlbum">
    <div className="u-xx_large_vertical_margins">
      <AlbumInfo songId={songId} />
      <AlbumTracks songId={songId} />
    </div>
  </div>
);

export default SongAlbum;