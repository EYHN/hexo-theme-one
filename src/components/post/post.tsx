import { getPost } from '../../lib/hexoApi';
import { array_randS } from '../../lib/random';
import { changeColor, changeColorAction } from '../../actions/theme';
import { post } from '../../Interfaces/post';
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
  onChangeColor?: (primaryColor:string,accentColor:string) =>void;
  postsList?:Array<post>;
  params?:{
    slug?:string
  }
}

class Post extends React.Component<PostProps, undefined>{
  componentDidMount(){
    this.props.onChangeColor('red','red');
  }
  render() {
    let {postsList = [],params={}} = this.props
    let {slug} = params;
    if(postsList.length == 0){
    }else{
      postsList.find((value)=>{
        return value.slug == slug
      });
    }
    return (
      <Grid>
        <PostCard className={style.postCard}/>
      </Grid>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { posts = {},theme={} } = state;
  let { postsList = [] } = posts;
  let { uiux={} } = theme;
  let { defaultPrimaryColor = 'cyan', defaultAccentColor = 'pink'} = uiux
  return {
    postsList:postsList,
    primaryColor: array_randS(defaultPrimaryColor),
    accentColor: array_randS(defaultAccentColor)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<changeColorAction>) => {
  return {
    loadingPost: (slug:string) => {
      dispatch(getPost(slug) as any)
    },
    onChangeColor:(primaryColor:string,accentColor:string)=>{
      dispatch(changeColor(primaryColor,accentColor))
    }
  }
}

const HomeX = connect<AppState, PostProps, PostProps>(mapStateToProps,mapDispatchToProps)(Post as any)

export default HomeX;