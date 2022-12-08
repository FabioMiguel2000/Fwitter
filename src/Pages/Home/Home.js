import React from "react";
import { useEffect, useState } from "react";
import logo from "../../images/Twitter-logo.png";

import "./Home.scss";

// Material UI Components
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";

const Home = ({ gun, user }) => {
  const [currUser, setCurrUser] = useState("Fab");
  const [allUsers, setAllUsers] = useState([]);
  const [follows, setFollows] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currUserPosts, setCurrUserPosts] = useState([]);
  // const [formState, setFormState] = useState({ name: "", message: "" });
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [postField, setPostField] = useState("");

  // How do we know which informations a peer is storing????

  const handleAllUsers = (data) => {
    setAllUsers([]);
    for (let key in data) {
      if (key !== "_" && key !== currUser) {
        setAllUsers((prev) => [...prev, key]);
      }
    }
  };

  const handleDeletePost = (post) => {
    gun
      .get("users")
      .get(currUser)
      .get("posts_timeline")
      .get(post.createdAt)
      .put(null);
  };

  const handleAddFollow = (username) => {
    console.log("username", username);
    gun
      .get("users")
      .get(currUser)
      .get("follows")
      .put({ [username]: username });

    setFollows((prev) => [...prev, username]);
  };

  const handleRemoveFollow = (username) => {
    console.log("username", username);
    gun.get("users").get(currUser).get("follows").get(username).put(null);
  };

  const handleAllFollows = (data) => {
    console.log("data follows", data);
    setFollows([]);
    for (let key in data) {
      if (key !== "_" && data[key] !== null) {
        setFollows((prev) => [...prev, key]);
      }
    }
  };

  const handleFollowPosts = (data) => {
    let follArr = [];
    setPosts([]);

    for (let key in data) {
      if (key !== "_" && data[key] !== null) {
        follArr.push(key);
      }
    }

    console.log("follArr", follArr);
    let auxPosts = [];

    // Bug aqui quando refresh e apagar rever !!!!
    follArr.forEach((foll) => {
      gun
        .get("users")
        .get(foll)
        .get("posts_timeline")
        .on((data) => {
          for (let key in data) {
            if (key !== "_" && data[key] !== null) {
              console.log("key data", key, data[key]);

              auxPosts.push({
                content: data[key],
                from: foll,
                createdAt: key,
              });
            }
          }

          // Talvez _??? Mudar estutura para  {
          //
          //   [alias]: { ev: _ev, items: new_items },
          // };

          setPosts((prev) => [...prev, ...auxPosts]);
        });
    });
  };

  useEffect(() => {
    gun.get("users").on(handleAllUsers);
    gun.get("users").get(currUser).get("follows").on(handleAllFollows);
    gun.get("users").get(currUser).get("follows").on(handleFollowPosts);
    gun
      .get("users")
      .get(currUser)
      .get("posts_timeline")
      .on((data) => {
        setCurrUserPosts([]);
        for (let key in data) {
          if (key !== "_" && data[key] !== null) {
            setCurrUserPosts((prev) => [
              ...prev,
              { content: data[key], from: currUser, createdAt: key },
            ]);
          }
        }
      });
  }, [currUser]);

  useEffect(() => {
    gun.user().once((data) => {
      setCurrUser(data.alias);
    });

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

  function getAllPosts() {
    return currUserPosts.concat(posts).sort((b, a) => {
      return new Date(parseInt(a.createdAt)) - new Date(parseInt(b.createdAt));
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

    gun
      .get("users")
      .get(currUser)
      .get("posts_timeline")
      .get(Date.now())
      .put(postField);

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
    console.log(miliseconds);
    return `${new Date(parseInt(miliseconds)).toISOString().split("T")[0]} - ${
      new Date(parseInt(miliseconds))
        .toISOString()
        .split("T")[1]
        .split("Z")[0]
        .split(".")[0]
    }`;
  }

  return (
    <Box className="homepage-container">
      <Box className="left-side_bar">
        <Box className="logo">
          <img src={logo} width={"40px"} height={"40px"}></img>
        </Box>
        <Typography variant="h5">{currUser}</Typography>
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
        {follows.map((follow) => (
          <p>{follow}</p>
        ))}
        <Box className="posts-wrapper">
          {getAllPosts().map((post, idx) => (
            <Box key={idx} className="post_container">
              <InputAdornment>
                <AccountCircle sx={{ height: "100px", width: "100px" }} />
              </InputAdornment>
              <Box className="post-content">
                <Box className="post-content-title">
                  <Typography>{post.from}</Typography>
                  <Typography>{formatDate(post.createdAt)}</Typography>
                  {post.from === currUser && (
                    <Button
                      onClick={() => handleDeletePost(post)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  )}
                </Box>

                <Typography>{post.content}</Typography>
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
          {allUsers.map((user, idx) => (
            <Box className="follows-wrapper">
              <Box className="follows-user_profile">
                <InputAdornment>
                  <AccountCircle sx={{ height: "60px", width: "60px" }} />
                </InputAdornment>
                <Box className="follows-user_profile_content">
                  <Typography>{user}</Typography>
                  {follows.includes(user) ? (
                    <Button
                      onClick={() => handleRemoveFollow(user)}
                      variant="contained"
                    >
                      unflollow
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddFollow(user)}
                      variant="contained"
                    >
                      Follow
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
