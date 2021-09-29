import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

export default function Profile() {
  const user = useSelector((state) => state.loggedUser);
  return (
    <div className="user_profile">
      <h1>{user.user_name || "no user"}</h1>
      <div className="user_profile_info">
        <div className="user_profile_picture">
          <img
            src={
              user.profile ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7NjPoc-G8OFe521tFkR07rlyIg8XdKacNbA&usqp=CAU"
            }
            alt="profile"
          />
        </div>
        <div className="profile_follower_count">
          <div className="profile_followers">
            <p>Followers</p>
            <p>{user.follower_count || 0}</p>
          </div>
          <div className="profile_following">
            <p>Following</p>
            <p>{user.following_count || 0}</p>
          </div>
        </div>
        <div className="profile_car_info">
          <div className="profile_specific_info">
            <p>{user.year || "no info"}</p>
          </div>
          <div className="profile_specific_info">
            <p>{user.make || "no info"}</p>
          </div>
          <div className="profile_specific_info">
            <p>{user.model || "no info"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
