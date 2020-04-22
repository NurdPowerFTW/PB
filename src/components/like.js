import React, { useState } from "react";
import ThumbUpTwoToneIcon from "@material-ui/icons/ThumbUpTwoTone";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import axios from "axios";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Like(props) {
  const { count, user, repoId } = props;

  const [like, setLike] = useState(count);
  const [updated, setUpdated] = useState(false);

  const updateLike = () => {
    console.log("updateLike -> user", user);
    let request = {
      userName: user,
      repoId: repoId,
      likes: like,
    };
    if (!updated) {
      let likeCount = parseInt(like) + 1;
      setLike(likeCount);
      setUpdated(true);
      request.likes = 1;
    } else {
      let likeCount = parseInt(like) - 1;
      setLike(likeCount);
      setUpdated(false);
      request.likes = -1;
    }

    console.log("updateLike -> request", request);
    axios({
      method: "post",
      url: process.env.REACT_APP_PROJECT_LIKE,
      data: request,
    })
      .then((res) => {
        console.log("TCL: updateLike -> res", res);
      })
      .catch((err) => {
        console.log("TCL: updateLike -> err", err);
      });
  };
  return (
    <IconButton aria-label="like" onClick={updateLike}>
      <StyledBadge badgeContent={like} color="secondary">
        <ThumbUpTwoToneIcon />
      </StyledBadge>
    </IconButton>
  );
}

export default Like;
