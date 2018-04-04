import React from 'react';

import Paper from 'material-ui/Paper';

import PostCard from './PostCard'
import style from './stylesheets/PostBar';



export default function Posts(props) {
    var posts = []
    for (var i in props.posts) {
        posts.push(
            <PostCard postVideoUrl={props.posts[i].videoUrl}
                      postMessage={props.posts[i].message}
                      key={i}/>
          );
      }
    return (
        <center>
            <Paper zDepth={0} style={style.userPosts}> {posts} </Paper>
        </center>
    );
}
