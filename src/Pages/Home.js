import React from "react";
import { useEffect, useState } from "react";
import logo from "../img/Twitter-logo.png";

import "./Home.scss";

// Material UI Components
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/Delete";

import Gun from "gun";

const gun = Gun();

const Home = () => {
  const [currUser, setCurrUser] = useState("Fab");
  const [follows, setFollows] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currUserPosts, setCurrUserPosts] = useState([]);
  // const [formState, setFormState] = useState({ name: "", message: "" });
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [postField, setPostField] = useState("");

  // How do we know which informations a peer is storing????
  useEffect(() => {
    // users.set(user);

    // user.get('follows').set(user)

    // console.log(user.get('follows'))

    console.log("init");
    console.log(currUser);

    setPosts([]);
    setFollows([]);

    gun
      .get("users")
      .get(currUser)
      .get("posts_timeline")
      .map()
      .on(currUserPostsListener);

    // console.log(currUserPosts);

    // user
    //   .get("follows")
    //   .map()
    //   .once((followsUser) => {
    //     console.log(followsUser.follows);
    //     setFollows((follows) => [...follows, followsUser.follows]);

    //     console.log(follows)
    //     // followsUser
    //     //   .get("posts_timeline")
    //     //   .map()
    //     //   .once((post) => {
    //     //     console.log(`${followsUser} has post content = ${post.content}`);
    //     //     setPosts((posts) => [...posts, post]);
    //     //   });
    //   }); // Initialize User follows and Posts

    // console.log(user);

    // messages.map().once(message=>{    // Syncs the local state with the states from the peers
    //     console.log(message.message)
    //     dispatch({
    //         name: message.name,
    //         message: message.message,
    //         createdAt: message.createdAt
    //     })
    // })
  }, []);

  const currUserPostsListener = (value, key, _msg, _ev) => {
    if (value === null) {
      setCurrUserPosts((posts) => {
        return posts.filter((post) => {
          return !(post.from == key.split("_")[0] &&
          String(post.createdAt) == key.split("_")[1]);
        });
      });
      return;
    }
    const post = {
      content: value.content,
      createdAt: value.createdAt,
      from: value.from,
    };
    setCurrUserPosts((currUserPosts) => [...currUserPosts, post]);
  };

  function getAllPosts() {
    console.log(currUserPosts);
    return currUserPosts.concat(posts).sort((b, a) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  // function getPostsFromUser(userAlias) {
  //   const postsTimeline = gun.get(userAlias).get('posts_timeline')
  //   setPosts(posts => [...posts, postsTimeline])
  // }

  function saveMessage(e) {
    e.preventDefault();
    // const messages = gun.get('messages')
    // console.log(messages)
    // messages.set({
    //     name: formState.name,
    //     message: formState.message,
    //     createdAt: Date.now()
    // })
    // setFormState({
    //     name: '',
    //     message: '',
    // })

    const newPost = {
      from: currUser,
      content: postField,
      createdAt: Date.now(),
    };

    gun
      .get("users")
      .get(currUser)
      .get("posts_timeline")
      .get(`${currUser}_${newPost.createdAt}`)
      .put(newPost);

    setPostField("");
  }

  function onChange(e) {
    // setFormState({...formState, [e.target.name]: e.target.value })
    setPostField(e.target.value);
  }

  // function onChangeUser(e) {
  //   setCurrUser(e.target.value)
  // }

  function formatDate(miliseconds) {
    return `${new Date(miliseconds).toISOString().split("T")[0]} - ${
      new Date(miliseconds)
        .toISOString()
        .split("T")[1]
        .split("Z")[0]
        .split(".")[0]
    }`;
  }

  function deletePost(createdAt) {
    console.log("hello");
    console.log(createdAt);
    // gun
    // .get("users")
    // .get(currUser)
    // .get("posts_timeline")
    // .get(`${currUser}_${createdAt}`)
    // .put(null);
  }

  return (
    <Box className="homepage-container">
      <Box className="left-side_bar">
        <Box className="logo">
          <img src={logo} width={"40px"} height={"40px"}></img>
        </Box>
        <Box className="logout-btn">
          <Button variant="contained">Logout</Button>
        </Box>
      </Box>

      <Box className="content-wrapper">
        <Box className="send_form-container">
          <Typography variant="h5">Home</Typography>
          <Box className="send_form">
            <FormControl variant="standard" fullWidth>
              {/* <InputLabel htmlFor="input-with-icon-adornment">
              With a start adornment
            </InputLabel> */}
              <Input
                placeholder="What's happening?"
                disableUnderline={true}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle sx={{ height: "50px", width: "50px" }} />
                  </InputAdornment>
                }
                onChange={onChange}
                value={postField}
                sx={{ fontSize: "1.8em" }}
              />
            </FormControl>
          </Box>
          <Box className="submit-btn_container">
            <Button
              variant="contained"
              sx={{
                borderRadius: "16px",
                textTransform: "none",
                backgroundColor: "#5CC4FF",
              }}
              onClick={saveMessage}
              disabled={postField.length === 0}
            >
              Tweet
            </Button>
          </Box>
        </Box>
        <Box className="posts-wrapper">
          {getAllPosts().map((post) => (
            <Box key={post.createdAt} className="single_post-wrapper">
              <Box className="post_container">
                <InputAdornment>
                  <AccountCircle sx={{ height: "100px", width: "100px" }} />
                </InputAdornment>
                <Box className="post-content">
                  <Box className="post-content-title">
                    <Typography>{post.from}</Typography>
                    <Typography>{formatDate(post.createdAt)}</Typography>
                  </Box>

                  <Typography>{post.content}</Typography>
                </Box>
              </Box>

              <Box className="post-action-btns-wrapper">
                {post.from === currUser ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      gun
                        .get("users")
                        .get(currUser)
                        .get("posts_timeline")
                        .get(`${currUser}_${post.createdAt}`)
                        .put(null);
                    }}
                  >
                    <DeleteIcon />
                    Delete
                  </Button>
                ) : (
                  <Button variant="contained">
                    <PersonRemoveIcon />
                    Unfollow
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="right-side_bar">
        <Box className="follows_recomendations">
          <Typography className="follows_recomendations-title" variant="h6">
            Who to follow
          </Typography>
          <Box className="follows-wrapper">
            <Box className="follows-user_profile">
              <InputAdornment>
                <AccountCircle sx={{ height: "60px", width: "60px" }} />
              </InputAdornment>
              <Box className="follows-user_profile_content">
                <Typography>Elon Musk</Typography>
                <Button variant="contained">Follow</Button>
              </Box>
            </Box>
          </Box>
          <Box className="follows-wrapper">
            <Box className="follows-user_profile">
              <InputAdornment>
                <AccountCircle sx={{ height: "60px", width: "60px" }} />
              </InputAdornment>
              <Box className="follows-user_profile_content">
                <Typography>Donald Trump</Typography>
                <Button variant="contained">Follow</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
