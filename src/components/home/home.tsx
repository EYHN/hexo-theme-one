import { setBackGroundImg } from '../../actions/background';
import { backButton, fullModel, setNavTitle } from '../../actions/nav';
import { updatePostsP } from '../../actions/posts';
import { changeColor, changeColorAction } from '../../actions/theme';
import { array_randS } from '../../lib/random';
import { postsState } from '../../reducers/posts';
import AppState from '../../stateI';
import DisplayTrigger from '../displayTrigger/displayTrigger';
import Grid from '../grid/grid';
import LogoCard from '../logoCard/logoCard';
import PostCard from '../postCard/postCard';
import WelcomeCard from '../WelcomeCard/WelcomeCard';
import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
const url = require('url');
var style = require("./home.less");

interface HomeProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  loading?: boolean;
  posts?: postsState;
  ajaxLoading?: boolean;
  avatar?: string
  left_pic?: string
  slogan?: string
  siteUrl?: string
  author?: string
  title?: string,
  phone?: boolean
  setNavTitle?: (title: string) => void
  onChooseColor?: (primaryColor: string, accentColor: string) => void;
  primaryColor?: string
  accentColor?: string
  updatePostsP?: (index?: number) => void
  setBackGroundImg?: (backgroundImg: string, key: string) => void
  fullModel?: (fullModelB: boolean) => void
  backButton?: (backButton: boolean) => void
}

interface HomeState {
  pageNumber: number
}

class Home extends React.Component<HomeProps, HomeState>{
  componentDidMount() {
    let {left_pic = '', siteUrl = '', title = ''} = this.props;
    this.props.setBackGroundImg(url.resolve(siteUrl, left_pic), "home")
    this.props.onChooseColor(this.props.primaryColor, this.props.accentColor);
    this.props.fullModel(false)
    this.props.setNavTitle(title);
    this.props.backButton(false);
  }

  constructor() {
    super();
    this.state = { pageNumber: 1 }
  }

  getPosts(): React.ReactNode {
    let { posts = {}, siteUrl = '', author = '', title = '', avatar = '' } = this.props;
    if (typeof posts.total === 'undefined' && !this.props.loading) {
      this.props.updatePostsP();
    }
    let { apiPageSize = 0, total = 0, postsList = [], loading = false} = posts;
    let res: Array<React.ReactNode> = [];
    for (
      let i = 0;
      i < this.state.pageNumber * apiPageSize && i < total;
      i++
    ) {
      let post = postsList[i];
      if (typeof post === 'undefined') {
        if (!loading) {
          this.props.updatePostsP(parseInt((i / apiPageSize).toString()) + 1);
          i += apiPageSize - 1;
        }
      } else {
        res.push(<PostCard
          post={post}
          key={post.slug}
          authorAvatar={url.resolve(siteUrl, avatar)}
          authorName={author}
          link={"/post/" + post.slug + "/"} />);
      }
    }
    return res;
  }

  loadingMore(event: JQueryEventObject) {
    if (this.props.loading != true) {
      let newState = {
        ...this.state,
        pageNumber: this.state.pageNumber + 1
      }
      this.setState(newState);
    }
  }

  render() {
    let {siteUrl = '', author = '', title = '', phone = false} = this.props;
    let {left_pic = '', slogan = '', avatar = ''} = this.props;
    return (
      <div className="Home">
        <Grid>
          <WelcomeCard
            title={title}
            subtitle={slogan}
            username={author}
            coverImg={url.resolve(siteUrl, left_pic)}
            avatarImg={url.resolve(siteUrl, avatar)}
            phone={phone}
          />
          {
            phone ? undefined : <LogoCard />
          }
          {this.getPosts()}
          <DisplayTrigger className={style.Loading} onDisplay={
            this.loadingMore.bind(this)
          }>
            {
              this.props.loading ? <span style={{
                color: this.props.muiTheme.cardText.textColor
              }}><CircularProgress size={25} /><span className={style.loadingMore}> 加载更多...</span></span> : undefined
            }
          </DisplayTrigger>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { site = {}, posts = {}, theme = {}, windowSize } = state;
  let { siteUrl = '', author = '', title = '' } = site;
  let { img = {}, uiux = {} } = theme;
  let { defaultPrimaryColor = 'cyan', defaultAccentColor = 'pink'} = uiux
  return {
    siteUrl,
    author,
    title,
    posts,
    phone: windowSize.smaller.than.phone,
    loading: posts.loading,
    avatar: array_randS(img.avatar),
    left_pic: array_randS(img.left_pic),
    slogan: array_randS(uiux.slogan),
    primaryColor: array_randS(defaultPrimaryColor),
    accentColor: array_randS(defaultAccentColor)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<changeColorAction>) => {
  return {
    onChooseColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    },
    updatePostsP: (index?: number) => {
      dispatch(updatePostsP(index) as any);
    },
    setBackGroundImg: (backgroundImg: string, key: string) => {
      dispatch(setBackGroundImg([{ url: backgroundImg, key }]))
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

let HomeX = connect<AppState, HomeProps, HomeProps>(mapStateToProps, mapDispatchToProps)(Home as any)

let HomeS = muiThemeable()(HomeX);

export default HomeS