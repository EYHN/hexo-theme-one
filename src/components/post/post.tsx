import * as React from 'react';
import WelcomeCard from '../WelcomeCard/WelcomeCard'
import LogoCard from '../logoCard/logoCard'
import PostCard from '../postCard/postCard'
import Grid from '../grid/grid'
var style = require("./post.less");

interface PostProps {

}

export default class Post extends React.Component<PostProps, undefined>{
  render() {
    return (
      <Grid>
        <PostCard/>
      </Grid>
    )
  }
}