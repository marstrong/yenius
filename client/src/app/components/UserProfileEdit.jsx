import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserProfile } from "../../features/users/usersSliceThunks";

import { selectUserById } from "../../features/users/usersSlice";

import RefactoredDropdown from "./Dropdown";

import userColors from "../../features/users/userColors";

const ProfileEdit = ({ match }) => {
  const { userId } = match.params;
  const user = useSelector((state) => selectUserById(state, userId));
  const currentUser = useSelector((state) => state.session.currentUser);

  const dispatch = useDispatch();
  const handleUpdateColor = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: currentUser.id,
        my_color: selectedColor,
      })
    );
  };

  const showCurrentColor = (
    <div
      style={{ backgroundColor: `${currentUser.myColor}`, textAlign: "center" }}
    >
      <br />
      <p>currentUser's saved color</p>
      <br />
    </div>
  );

  const [selectedColor, setSelectedColor] = useState(
    userColors[currentUser.myColor]
  );

  const showSelectedColor = (
    <div style={{ backgroundColor: `${selectedColor.hexCode}` }}>
      <br />
      <div className="colorFunName" style={{ textAlign: "center" }}>
        {selectedColor.funName}
      </div>
      <br />
    </div>
  );

  let profile;
  if (user) {
    const authoredComments = user.authoredCommentsCount || "0";
    profile = (
      <section>
        {showCurrentColor}
        <h1>Your Profile Page</h1>
        <p>id: {user.id}</p>
        <p>username: {user.username}</p>
        <p>email: {currentUser.email}</p>
        <p>authored_comments_count: {authoredComments}</p>
        {showSelectedColor}
        <RefactoredDropdown
          setContainerState={setSelectedColor}
          optionsParams={Object.values(userColors)}
        />
        <button onClick={handleUpdateColor}>Save Changes</button>
      </section>
    );
  } else {
    profile = (
      <section>
        <h2>User not found!</h2>
      </section>
    );
  }

  return profile;
};

export default ProfileEdit;
