import { postsState } from '../../reducers/posts';
import { updatePostsP } from '../../actions/posts';
import * as React from 'react';
import AppState from '../../stateI';
import WelcomeCard from '../WelcomeCard/WelcomeCard'
import LogoCard from '../logoCard/logoCard'
import PostCard from '../postCard/postCard'
import Grid from '../grid/grid'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { siteState } from '../../reducers/site'
import mainState from '../../main'
var style = require("./home.less");

interface HomeProps {
  site?: siteState;
  loading?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  posts?: postsState;
  dispatch?: Dispatch<AppState>;
}

export class Home extends React.Component<HomeProps, undefined>{
  getPosts(): React.ReactNode {
    let { pageIndex = 0,pageSize = 0,posts = {} } = this.props;
    let { apiPageSize = 0, total = 0, postsList = []} = posts;
    let res: Array<React.ReactNode> = [];
    for (
      let i = (pageIndex - 1) * pageSize;
      i < pageIndex * pageSize && i < total;
      i++
    ) {
      let post = postsList[i];
      if (typeof post === 'undefined') {
        if (!posts.loading) {
          this.props.dispatch(updatePostsP(parseInt((i / posts.apiPageSize).toString()) + 1) as any);
          i += posts.apiPageSize - 1;
        }
      } else {
        res.push(<PostCard key={post.slug} title={post.title} />);
      }
    }
    return res;
  }
  render() {
    let { posts = {} } = this.props;
    let { apiPageSize = 0, total = 0 } = posts;
    let {
      pageCount = total / apiPageSize,
      pageIndex = 1,
      pageSize = apiPageSize } = this.props;
    if (typeof posts.total === 'undefined' && !this.props.loading) {
      this.props.dispatch(updatePostsP() as any);
    }
    return (
      <Grid>
        <WelcomeCard
          title={this.props.site.title}
          subtitle={this.props.site.subtitle}
          username={this.props.site.author}
        />
        <LogoCard />
        {this.getPosts()}
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