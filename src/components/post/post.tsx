import { changeColor } from '../../actions/theme';
import { Dispatch } from 'redux';
import AppState from '../../stateI';
import * as React from 'react';
import WelcomeCard from '../WelcomeCard/WelcomeCard'
import LogoCard from '../logoCard/logoCard'
import PostCard from '../postCard/postCard'
import Grid from '../grid/grid'
import { connect } from 'react-redux'
var style = require("./post.less");

interface PostProps {
  dispatch?: Dispatch<AppState>;
}

class Post extends React.Component<PostProps, undefined>{
  componentDidMount(){
    this.props.dispatch(changeColor('red','red'));
  }
  render() {
    return (
      <Grid>
        <PostCard className={style.postCard} cardMedia={false}/>
      </Grid>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {

  }
}

const HomeX = connect<AppState, PostProps, PostProps>(mapStateToProps)(Post as any)

export default HomeX;