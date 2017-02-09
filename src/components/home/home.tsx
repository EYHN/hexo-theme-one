import { array_randS } from '../../lib/random';
import * as Url from 'url';
import { apiHref } from '../../lib/hexoApi';
import { postsState } from '../../reducers/posts';
import { updatePostsP } from '../../actions/posts';
import * as React from 'react';
import AppState from '../../stateI';
import WelcomeCard from '../WelcomeCard/WelcomeCard'
import LogoCard from '../logoCard/logoCard'
import PostCard from '../postCard/postCard'
import DisplayTrigger from '../displayTrigger/displayTrigger'
import Grid from '../grid/grid'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { siteState } from '../../reducers/site'
import mainState from '../../main'
import muiThemeable from 'material-ui/styles/muiThemeable';
import CircularProgress from 'material-ui/CircularProgress';
var style = require("./home.less");

interface HomeProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  loading?: boolean;
  posts?: postsState;
  ajaxLoading?: boolean;
  dispatch?: Dispatch<AppState>;
  avatar?:string
  left_pic?:string
  slogan?:string
  siteUrl?:string
  author?:string
  title?:string
}

interface HomeState {
  pageNumber: number
}

export class Home extends React.Component<HomeProps, HomeState>{
  constructor() {
    super();
    this.state = { pageNumber: 1 }
  }

  getPosts(): React.ReactNode {
    let { posts = {} } = this.props;
    if (typeof posts.total === 'undefined' && !this.props.loading) {
      this.props.dispatch(updatePostsP() as any);
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
          this.props.dispatch(updatePostsP(parseInt((i / apiPageSize).toString()) + 1) as any);
          i += apiPageSize - 1;
        }
      } else {
        res.push(<PostCard key={post.slug} title={post.title} excerpt={post.excerpt} cover={array_randS(post.thumbnail)} />);
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
    let {siteUrl = '',author = '',title = ''} = this.props;
    let {left_pic = '',slogan = '',avatar = ''} = this.props;
    return (
      <Grid>
        <WelcomeCard
          title={title}
          subtitle={slogan}
          username={author}
          coverImg={Url.resolve(siteUrl,left_pic)}
          avatarImg={Url.resolve(siteUrl,avatar)}
        />
        <LogoCard />
        {this.getPosts()}
        <DisplayTrigger className={style.Loading} onDisplay={
          this.loadingMore.bind(this)
          }>
          {
              this.props.loading ? <span style={{
                color:this.props.muiTheme.cardText.textColor
              }}><CircularProgress size={25} /><span className={style.loadingMore}> 加载更多...</span></span> : undefined
          }
        </DisplayTrigger>
      </Grid>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { site = {}, posts = {}, theme = {} } = state;
  let { siteUrl = '',author = '',title = '' } = site;
  let { img = {},uiux = {} } = theme;
  return {
    siteUrl,
    author,
    title,
    posts,
    loading: posts.loading, 
    avatar: array_randS(img.avatar),
    left_pic: array_randS(img.left_pic),
    slogan: array_randS(uiux.slogan)
  }
}

let HomeS =  muiThemeable()(Home);

let HomeX = connect<AppState, HomeProps, HomeProps>(mapStateToProps)(HomeS as any)

export default HomeX