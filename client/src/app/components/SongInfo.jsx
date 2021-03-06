import React from "react";
import { useSelector } from "react-redux";

import { selectSongById } from "../../features/songs/songsSlice";

import {
  PrimaryArtists,
  FeaturedArtists,
  ProductionArtists,
  AlbumName,
  ReleaseDate,
  SampleParents,
  SampleChildren,
  InterpolationParents,
  InterpolationChildren,
} from "./SongMetadataRows";

const TrackInfo = ({ songId }) => {
  const song = useSelector((state) => selectSongById(state, songId));
  if (!song) {
    return null;
  }

  const status = useSelector((state) => state.songs.status);
  const {
    fetchSongAlbum,
    fetchSongArtistCredits,
    fetchSongSampleCredits,
  } = status;
  const isFulfilled = (request) => request === "fulfilled";

  const albumCreditsRequests = [fetchSongArtistCredits];
  const albumCredits = albumCreditsRequests.every(isFulfilled) ? (
    <div className="albumCredits">
      <AlbumName songId={songId} />
      <ReleaseDate songId={songId} />
    </div>
  ) : (
    <div className="loader" />
  );

  const artistCreditsRequests = [fetchSongArtistCredits];
  const artistCredits = artistCreditsRequests.every(isFulfilled) ? (
    <div className="artistCredits">
      <PrimaryArtists songId={songId} />
      <FeaturedArtists songId={songId} />
      <ProductionArtists songId={songId} />
    </div>
  ) : (
    <div className="loader" />
  );

  const sampleCreditsRequests = [fetchSongSampleCredits];
  const sampleCredits = sampleCreditsRequests.every(isFulfilled) ? (
    <div className="sampleCredits">
      <SampleParents songId={songId} />
      <SampleChildren songId={songId} />
      <InterpolationParents songId={songId} />
      <InterpolationChildren songId={songId} />
    </div>
  ) : (
    <div className="loader" />
  );

  return (
    <div className="TrackInfo">
      <div className="u-xx_large_vertical_margins">
        <h3 className="text_label u-x_small_bottom_margin">
          "{song.name}" Track Info
        </h3>
        {artistCredits}
        {albumCredits}
        {sampleCredits}
      </div>
    </div>
  );
};

const Loader = ({ songId }) => {
  const fetchSongArtistCredits = useSelector(
    (state) => state.songs.status.fetchSongArtistCredits
  );
  const fetchSongSampleCredits = useSelector(
    (state) => state.songs.status.fetchSongSampleCredits
  );
  const asyncRequests = [fetchSongArtistCredits, fetchSongSampleCredits];
  if (asyncRequests.every((status) => status === "fulfilled")) {
    return <TrackInfo songId={songId} />;
  } else {
    return <div className="loader" />;
  }
};

export default Loader;
