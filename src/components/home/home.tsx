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
var style = require("./home.less");

interface HomeProps {
  site?: siteState;
  loading?: boolean;
  posts?: postsState;
  ajaxLoading?:boolean;
  dispatch?: Dispatch<AppState>;
}

interface HomeState {
  pageNumber:number
}

export class Home extends React.Component<HomeProps, HomeState>{
  constructor(){
    super();
    this.state = {pageNumber:1}
  }

  getPosts(): React.ReactNode {
    let { posts = {} } = this.props;
    if (typeof posts.total === 'undefined' && !this.props.loading) {
      this.props.dispatch(updatePostsP() as any);
    }
    let { apiPageSize = 0, total = 0, postsList = [],loading = false} = posts;
    let res: Array<React.ReactNode> = [];
    for (
      let i = 0;
      i < this.state.pageNumber * apiPageSize  && i < total;
      i++
    ) {
      let post = postsList[i];
      if (typeof post === 'undefined') {
        if (!loading) {
          this.props.dispatch(updatePostsP(parseInt((i / apiPageSize).toString()) + 1) as any);
          i += apiPageSize - 1;
        }
      } else {
        res.push(<PostCard key={post.slug} title={post.title} excerpt={post.excerpt} />);
      }
    }
    return res;
  }

  loadingMore(event:JQueryEventObject){
    if(this.props.loading != true){
      let newState = {
        ...this.state,
        pageNumber:this.state.pageNumber+1
      }
      this.setState(newState);
    }
  }

  render() {
    return (
      <Grid>
        <WelcomeCard
          title={this.props.site.title}
          subtitle={this.props.site.subtitle}
          username={this.props.site.author}
        />
        <LogoCard />
        {this.getPosts()}
        <DisplayTrigger onDisplay={this.loadingMore.bind(this)}>
          123
        </DisplayTrigger>
      </Grid>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  var { site = {}, posts = {} } = state;
  return {
    site, posts, loading: posts.loading
  }
}

let HomeX = connect<AppState, HomeProps, HomeProps>(mapStateToProps)(Home as any)

export default HomeX