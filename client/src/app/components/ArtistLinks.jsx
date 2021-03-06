import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectArtistById } from "../../features/artists/artistsSlice";
import { intersperse } from "../../lib";

const ArtistLink = ({ artistId }) => {
  const artist = useSelector((state) => selectArtistById(state, artistId));
  return <Link to={`/artists/${artist.id}`}>{artist.name}</Link>;
};

const ArtistLinks = ({ artistIds }) => {
  if (!artistIds) {
    return null;
  }
  const artistLinks = artistIds.map((artistId) => (
    <ArtistLink key={artistId} artistId={artistId} />
  ));
  return intersperse(artistLinks, ", ", " & ");
};

export default ArtistLinks;
