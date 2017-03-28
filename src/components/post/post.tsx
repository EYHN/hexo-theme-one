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
import { setNavTitle, fullModel, backButton } from '../../actions/nav';
import Comment from '../comment/comment';
import { Card } from 'material-ui/Card';
import { FormattedDate } from 'react-intl';
import categories from '../../reducers/categories';
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
  setNavTitle?: (title: string) => void
  phone?: boolean
  siteUrl?: string
  addBackGroundImg?: (backgroundImg: string, key: string) => void
  fullModel?: (fullModelB: boolean) => void
  backButton?: (backButton: boolean) => void
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
    this.props.backButton(true);
  }
  onloaded(post: postState) {
    if (post.primarycolor || post.accentcolor)
      this.props.onChangeColor(array_randS(post.primarycolor), array_randS(post.accentcolor));
    this.props.addBackGroundImg(url.resolve(this.props.siteUrl, array_randS(post.thumbnail) || this.default_thumbnail), "post-" + post.slug)
    if (post.title)
      this.props.setNavTitle(post.title)
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
        this.onloaded(post)
      }
    }
    let {categories = []} = post;
    return (
      <div className="Post">
        <Grid>
          <div className={style.post}>
            <PostCard
              post={post}
              className={style.PostCard}
              cardMedia={!phone}
              cardMediaStyle={{
                height: "275px"
              }}
              translate
              toc={this.toc.bind(this)}
            />
            <Card className={style.commentCard}>
              {
                (slug != '' && post.title) ? <Comment postID={slug} className={style.Comment} 
                url={url.resolve(this.props.siteUrl, './post/' + post.title)} 
                postTitle={post.title.toString()} 
                postCategory={typeof categories[0] === "undefined" ? undefined : categories[0].name}></Comment> : undefined
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
  let { theme = {}, postsList = new Map<string, postState>() } = state;
  let { uiux = {} } = theme;
  let { defaultPrimaryColor = 'cyan', defaultAccentColor = 'pink'} = uiux
  Cstate = state
  return {
    postsList: postsList,
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
    },
    backButton: (backButtonV: boolean)=>{
      dispatch(backButton(backButtonV))
    }
  }
}

const HomeX = connect<AppState, PostProps, PostProps>(mapStateToProps, mapDispatchToProps)(Post as any)

export default HomeX;