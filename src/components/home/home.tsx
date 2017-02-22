import { changeColor, changeColorAction } from '../../actions/theme';
import { array_randS } from '../../lib/random';
import * as Url from 'url';
import { apiHref } from '../../lib/hexoApi';
import { postsState } from '../../reducers/posts';
import { updatePostsAction, updatePostsP } from '../../actions/posts';
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
import * as $ from 'jquery'
import muiThemeable from 'material-ui/styles/muiThemeable';
import CircularProgress from 'material-ui/CircularProgress';
import { addBackGroundImg, setBackGroundImg } from '../../actions/background';
var style = require("./home.less");

interface HomeProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  loading?: boolean;
  posts?: postsState;
  ajaxLoading?: boolean;
  avatar?:string
  left_pic?:string
  slogan?:string
  siteUrl?:string
  author?:string
  title?:string,
  onChooseColor?: (primaryColor:string,accentColor:string) =>void;
  primaryColor?: string
  accentColor?: string
  updatePostsP?:(index?:number) => void
  setBackGroundImg?:(backgroundImg: string) => void
}

interface HomeState {
  pageNumber: number
}

export class Home extends React.Component<HomeProps, HomeState>{
  componentDidMount(){
    let {left_pic = '',siteUrl = ''} = this.props;
    this.props.setBackGroundImg(Url.resolve(siteUrl,left_pic))
    this.props.onChooseColor(this.props.primaryColor,this.props.accentColor);
  }

  constructor() {
    super();
    this.state = { pageNumber: 1 }
  }

  getPosts(): React.ReactNode {
    let { posts = {} } = this.props;
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
        res.push(<PostCard key={post.slug} title={post.title} excerpt={post.excerpt} cover={array_randS(post.thumbnail)} link={post.slug} />);
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
      <Grid className="Home">
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
  let { defaultPrimaryColor = 'cyan', defaultAccentColor = 'pink'} = uiux
  return {
    siteUrl,
    author,
    title,
    posts,
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
    onChooseColor: (primaryColor:string,accentColor:string) => {
      dispatch(changeColor(primaryColor,accentColor))
    },
    updatePostsP:  (index?:number) => {
      dispatch(updatePostsP(index) as any );
    },
    setBackGroundImg: (backgroundImg: string) => {
      dispatch(setBackGroundImg([backgroundImg]))
    }
  }
}

let HomeS =  muiThemeable()(Home);

let HomeX = connect<AppState, HomeProps, HomeProps>(mapStateToProps,mapDispatchToProps)(HomeS as any)

export default HomeX