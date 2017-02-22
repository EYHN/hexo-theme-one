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
import * as _ from 'underscore'
import { toc } from '../context/context';
import FixedAt from '../fixedAt/fixedAt';
import { addBackGroundImg } from '../../actions/background';
import * as Url from 'url';
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
  siteUrl?: string
  addBackGroundImg?: (backgroundImg: string) => void
}

interface PostState {
  tocArray: toc[]
}

let Cstate: AppState;

class Post extends React.Component<PostProps, PostState>{
  loaded = false
  constructor() {
    super();
    this.state = {
      tocArray: []
    };
  }
  default_thumbnail: string
  componentDidMount() {
    this.props.onChangeColor(this.props.defaultPrimaryColor, this.props.defaultAccentColor);
  }
  toc(tocArray: toc[]) {
    if (!_.isEqual(tocArray, this.state.tocArray)) {
      this.setState({
        ...this.state,
        tocArray: tocArray
      })
    }
  }
  componentWillMount() {
    this.default_thumbnail = array_rand(Cstate.theme.img.post_thumbnail)
  }
  render() {
    let {postsList = new Map<string, postState>(), params = {}, phone = false, siteUrl = ""} = this.props
    let {slug} = params;
    let post = postsList.get(slug);
    let thumbnail;
    if (typeof post === "undefined" || typeof post.content === "undefined") {
      post = post || {};
      if (!post.loading) {
        this.props.loadingPost(slug);
      }
    } else {
      thumbnail = Url.resolve(siteUrl,array_randS(post.thumbnail) || this.default_thumbnail);
      if (this.loaded == false) {
        this.loaded = true
        if (post.primarycolor || post.accentcolor)
          this.props.onChangeColor(array_randS(post.primarycolor), array_randS(post.accentcolor));
        if (thumbnail)
          this.props.addBackGroundImg(thumbnail)
      }
    }
    return (
      <Grid className="Post">
        <PostCard
          className={style.postCard}
          content={post.content}
          cover={phone ? undefined : thumbnail}
          cardMedia={!phone}
          title={post.title}
          cardMediaStyle={{
            height: "275px"
          }}
          toc={this.toc.bind(this)} />
        <div className={style.toc} ref="toc"><FixedAt fixedHeight={300} fixedClassName={style.tocFixed}><TocList tocArray={this.state.tocArray} className={style.TocList}></TocList></FixedAt></div>
      </Grid>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { theme = {}, postList = new Map<string, postState>() } = state;
  let { uiux = {} } = theme;
  let { defaultPrimaryColor = 'cyan', defaultAccentColor = 'pink'} = uiux
  Cstate = state
  return {
    postsList: postList,
    defaultPrimaryColor: array_randS(defaultPrimaryColor),
    defaultAccentColor: array_randS(defaultAccentColor),
    phone: state.windowSize.smaller.than.phone,
    siteUrl: state.site.siteUrl || ""
  }
}

const mapDispatchToProps = (dispatch: Dispatch<changeColorAction>) => {
  return {
    loadingPost: (slug: string) => {
      dispatch(getPost(slug) as any)
    },
    onChangeColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    },
    addBackGroundImg: (backgroundImg: string) => {
      dispatch(addBackGroundImg(backgroundImg))
    }
  }
}

const HomeX = connect<AppState, PostProps, PostProps>(mapStateToProps, mapDispatchToProps)(Post as any)

export default HomeX;