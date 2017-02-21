import { getPost } from '../../actions/post';
import { postState } from '../../reducers/post';
import { array_randS, array_rand } from '../../lib/random';
import { changeColor, changeColorAction } from '../../actions/theme';
import { Dispatch } from 'redux';
import AppState from '../../stateI';
import * as React from 'react';
import WelcomeCard from '../WelcomeCard/WelcomeCard'
import LogoCard from '../logoCard/logoCard'
import PostCard from '../postCard/postCard'
import Grid from '../grid/grid'
import TocList from '../tocList/tocList'
import { connect } from 'react-redux'
import post from '../../reducers/post';
import * as $ from 'jquery'
import { toc } from '../context/context';
import FixedAt from '../fixedAt/fixedAt';
var style = require("./post.less");

interface PostProps {
  loadingPost?: (slug: string) => void;
  onChangeColor?: (primaryColor: string, accentColor: string) => void;
  postsList?: Map<string, postState>;
  defaultPrimaryColor?: string;
  defaultAccentColor?: string;
  params?: {
    slug?: string
  }
  phone?: boolean
}

interface PostState {
  tocArray: toc[]
}

class Post extends React.Component<PostProps, PostState>{
  constructor() {
    super();
    this.state = {
      tocArray: []
    };
  }
  componentDidMount() {
    this.props.onChangeColor(this.props.defaultPrimaryColor, this.props.defaultAccentColor);
  }
  toc(tocArray: toc[]) {
    this.setState({
      ...this.state,
      tocArray: tocArray
    })
  }
  render() {
    let {postsList = new Map<string, postState>(), params = {}, phone = false} = this.props
    let {slug} = params;
    let post = postsList.get(slug);
    if (typeof post === "undefined" || typeof post.content === "undefined") {
      post = post || {};
      if (!post.loading) {
        this.props.loadingPost(slug);
      }
    }
    return (
      <Grid>
        <PostCard
          className={style.postCard}
          content={post.content}
          cover={phone ? undefined : array_randS(post.thumbnail)}
          cardMedia={!phone}
          title={post.title}
          cardMediaStyle={{
            height: "275px"
          }}
          toc={this.toc.bind(this)} />
        <div className={style.toc} ref="toc"><FixedAt fixedHeight={268}><TocList tocArray={this.state.tocArray} className={style.TocList}></TocList></FixedAt></div>
      </Grid>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { theme = {}, postList = new Map<string, postState>() } = state;
  let { uiux = {} } = theme;
  let { defaultPrimaryColor = 'cyan', defaultAccentColor = 'pink'} = uiux
  return {
    postsList: postList,
    defaultPrimaryColor: array_randS(defaultPrimaryColor),
    defaultAccentColor: array_randS(defaultAccentColor),
    phone: state.windowSize.smaller.than.phone
  }
}

const mapDispatchToProps = (dispatch: Dispatch<changeColorAction>) => {
  return {
    loadingPost: (slug: string) => {
      dispatch(getPost(slug) as any)
    },
    onChangeColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    }
  }
}

const HomeX = connect<AppState, PostProps, PostProps>(mapStateToProps, mapDispatchToProps)(Post as any)

export default HomeX;