import React from "react";
import { useEffect, useState } from "react";

import Gun from "gun"; // eslint-disable-line no-use-before-define

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

    console.log("init")

    setPosts([]);
    setFollows([])

    gun.get('users').get(currUser)
      .get("posts_timeline")
      .map()
      .once((post) => {
        // Initialize User Posts
        // console.log(post.content)
        setCurrUserPosts((currUserPosts) => [...currUserPosts, {content: post.content, createdAt: post.createdAt, from: post.from}]);
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

  function getAllPosts(){
    return currUserPosts.concat(posts)
  }


  // function getPostsFromUser(userAlias) {
  //   const postsTimeline = gun.get(userAlias).get('posts_timeline')
  //   setPosts(posts => [...posts, postsTimeline])
  // }

  function saveMessage(e) {
    e.preventDefault()
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

    const newPost = { from: currUser, content: postField, createdAt: Date.now() }

    gun.get('users').get(currUser).get('posts_timeline')
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

  function formatDate(miliseconds){
    return `${new Date(miliseconds).toISOString().split('T')[0]} - ${new Date(miliseconds).toISOString().split('T')[1].split('Z')[0].split('.')[0]}`
  }

  return (
    <div>
      {/* <input onChange={onChangeUser} placeholder="Name" name="name" value={currUser}>
        </input> */}
      <input
        onChange={onChange}
        placeholder="Message"
        name="message"
        value={postField}
      ></input>
      <div>
        Follows:
        {follows.map((user) => (
          <div key={user}>-{user}</div>
        ))}
      </div>
      <button onClick={saveMessage}>Send Message</button>
      {/* {   
            
            state.messages.map(message=>(
                <div key={message.createdAt}>
                    <h2>{message.message}</h2>
                    <h3>From: {message.name}</h3>
                    <h4>Created At: {message.createdAt}</h4>
                </div>
            ))
        } */}

      {getAllPosts().map((post) => (
        <div key={post.createdAt}>
          <h2>{post.content}</h2>
          <h3>From: {post.from}</h3>
          <h4>Created At: {formatDate(post.createdAt)}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
