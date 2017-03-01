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
import * as _ from 'underscore'
import { toc } from '../context/context';
import FixedAt from '../fixedAt/fixedAt';
import { addBackGroundImg } from '../../actions/background';
const url = require('url');
import FontIcon from 'material-ui/FontIcon';
import { setNavTitle, fullModel } from '../../actions/nav';
import Comment from '../comment/comment';
import { Card } from 'material-ui/Card';
var style = require("./post.less");

interface PostProps {
  loadingPost?: (slug: string) => void;
  onChangeColor?: (primaryColor: string, accentColor: string) => void;
  postsList?: Map<string, postState>;
  defaultPrimaryColor?: string;
  defaultAccentColor?: string;
  params?: {
    slug?: string
    toc?: string
  }
  setNavTitle?: (title: string) => void
  phone?: boolean
  siteUrl?: string
  addBackGroundImg?: (backgroundImg: string, key: string) => void
  fullModel?: (fullModelB: boolean) => void
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
    this.props.onChangeColor(this.props.defaultPrimaryColor, this.props.defaultAccentColor);
    this.props.fullModel(false)
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
      thumbnail = url.resolve(siteUrl, array_randS(post.thumbnail) || this.default_thumbnail);
      if (this.loaded == false) {
        this.loaded = true
        if (post.primarycolor || post.accentcolor)
          this.props.onChangeColor(array_randS(post.primarycolor), array_randS(post.accentcolor));
        if (thumbnail)
          this.props.addBackGroundImg(thumbnail, "post-" + slug)
        if (post.title)
          this.props.setNavTitle(post.title)
      }
    }
    return (
      <div className="Post">
        <Grid>
          <div className={style.postCard}>
          <PostCard
            content={post.content}
            cover={phone ? undefined : thumbnail}
            cardMedia={!phone}
            title={post.title}
            cardMediaStyle={{
              height: "275px"
            }}
            toc={this.toc.bind(this)}
            slug={post.slug} />
          <Card className={style.commentCard}>
            {
              (slug != '' && post.title) ? <Comment postID={slug} className={style.Comment} postTitle={post.title.toString()}></Comment> : undefined
            }
          </Card>
          </div>
          {
            phone ? undefined :
              <div className={style.toc} ref="toc">
                <FixedAt fixedHeight={300} className={style.tocFixed}><TocList tocArray={this.state.tocArray} className={style.TocList}></TocList></FixedAt>
              </div>
          }
        </Grid>
      </div>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    loadingPost: (slug: string) => {
      dispatch(getPost(slug) as any)
    },
    onChangeColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    },
    addBackGroundImg: (backgroundImg: string, key: string) => {
      dispatch(addBackGroundImg(backgroundImg, key))
    },
    setNavTitle: (title: string) => {
      dispatch(setNavTitle(title));
    },
    fullModel: (fullModelB: boolean) => {
      dispatch(fullModel(fullModelB));
    }
  }
}

const HomeX = connect<AppState, PostProps, PostProps>(mapStateToProps, mapDispatchToProps)(Post as any)

export default HomeX;