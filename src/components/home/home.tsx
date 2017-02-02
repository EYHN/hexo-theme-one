import * as React from 'react';
import WelcomeCard from '../WelcomeCard/WelcomeCard'
import LogoCard from '../logoCard/logoCard'
import PostCard from '../postCard/postCard'
import Grid from '../grid/grid'
var style = require("./home.less");

interface HomeProps {

}

export default class Home extends React.Component<HomeProps, undefined>{
  render() {
    return (
      <Grid>
        <WelcomeCard/>
        <LogoCard/>
        <PostCard/>
      </Grid>
    )
  }
}