import { backButton, fullModel, setNavTitle } from '../../actions/nav';
import { updatePostsP } from '../../actions/posts';
import { changeColor } from '../../actions/theme';
import post from '../../reducers/post';
import { postState } from '../../reducers/post';
import { postsState } from '../../reducers/posts';
import { removeHTMLTag } from '../context/context';
import Grid from '../grid/grid';
import Paper from 'material-ui/Paper';
import { MuiTheme } from 'material-ui/styles';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { FormattedDate } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Dispatch } from 'redux';
import * as _ from 'underscore';
import AppState from '../../stateI';
const lunr = require("lunr")

const maxPostLength = 20;

const style = require("./search.less");

// lunr.trimmer = function (token: any) {
//   if (isChineseChar(token)) {
//     return token;
//   }
//   return token
//     .replace(/^\W+/, '')
//     .replace(/\W+$/, '')
// }

// function isChineseChar(str: string) {
//   var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
//   return reg.test(str);
// }

// const chinesePipe = (str: string) => {
//   let res = "";
//   str.split(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\uFE30-\uFFA0|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?_a-zA-Z0-9]+/)
//     .forEach(function (token: String) {
//       var t = token.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\uFE30-\uFFA0|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, '').toLowerCase()
//       res += t + " ";
//     });
//   return res;
// }

const postSearch = (posts: postState[] = [], key: string) => {
  let index = lunr(function () {
    this.field('title', { boost: 10 });
    this.field('excerpt', { boost: 3 });
    this.field('content');
    this.ref('slug');

    // this.pipeline.add(function (token: string, tokenIndex: number, tokens: string[]) {
    //   return chinesePipe(token);
    // })
  });
  posts.forEach((value) => {
    index.add({
      title: value.title,
      excerpt: removeHTMLTag(value.excerpt),
      content: value.content,
      slug: value.slug
    });
  })
  let res: postState[] = [];
  index.search(key).forEach((value: any) => {
    res.push(posts.find((item) => {
      if (item.slug == value.ref) {
        return true
      }
      return false
    }))
  });
  return res.slice(0, maxPostLength);
}

interface searchProps {
  fullModel?: (fullModelB: boolean) => void
  ChangeColor?: (primaryColor: string, accentColor: string) => void
  muiTheme?: MuiTheme
  setNavTitle: (title: string) => void
  posts?: postsState
  loading?: boolean
  updatePostsP?: (index?: number) => void
  backButton?: (backButton: boolean) => void
}

interface searchState {
  resPost: postState[];
}

class search extends React.Component<searchProps, searchState>{
  constructor() {
    super();
    this.state = {
      resPost: []
    }
  }
  getPosts() {
    let { posts = {}, loading } = this.props;
    let { apiPageSize = 0, total = 0, postsList = []} = posts;
    if (!loading) {
      if (typeof posts.total === 'undefined' && !loading) {
        this.props.updatePostsP();
        return undefined;
      }
      for (
        let i = 0;
        i < total;
        i++
      ) {
        let post = postsList[i];
        if (typeof post === 'undefined') {
          this.props.updatePostsP(parseInt((i / apiPageSize).toString()) + 1);
          i += apiPageSize - 1;
        }
      }
    }
    return posts.postsList;
  }
  onChange(e: Event, newText: string) {
    this.setState({
      ...this.state,
      resPost: postSearch(this.getPosts(), newText)
    })
  }
  componentWillMount() {
    this.props.setNavTitle("Search")
    this.props.fullModel(true)
    this.props.ChangeColor("white", "blue")
    this.props.backButton(true);
    this.setState({
      ...this.state,
      resPost: postSearch(this.getPosts(), "")
    })
  }
  componentDidMount() {
    setTimeout(function() {
      $("." + style.input + " input").focus()
    }, 1000);
  }
  getPostsNode() {
    let nodes = [];
    for (let post of this.state.resPost) {
      nodes.push(
        <div className={style.post} key={post.slug}>
          <h3>
            <Link to={"/post/" + post.slug + "/"}>{post.title}</Link>
            <footer>
            <small>
            <FormattedDate
              value={new Date(post.date)}
            />
            </small>
          </footer>
            </h3>
          <p>{removeHTMLTag(post.excerpt)}</p>
        </div>
      )
    }
    return nodes;
  }

  render() {
    return (
      <div className="search pagefullModel">
        <Paper className={style.inputCanve}
          style={{
            backgroundColor: this.props.muiTheme.palette.accent1Color
          }}
          zDepth={1}>
          <Grid className={style.grid}>
            <TextField
              className={style.input}
              inputStyle={{
                color: "#fff",
                fontSize: "60px",
                height: "80px"
              }}
              onChange={
                _.debounce(this.onChange.bind(this), 300)
              }
            />
          </Grid>
        </Paper>
        <Grid className={style.grid + " " + style.postsList}>
          {
            this.getPostsNode()
          }
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {posts = {}} = state;
  let {loading = false} = posts;
  return {
    posts: posts,
    loading: loading
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fullModel: (fullModelB: boolean) => {
      dispatch(fullModel(fullModelB));
    },
    ChangeColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    },
    setNavTitle: (title: string) => {
      dispatch(setNavTitle(title));
    },
    updatePostsP: (index?: number) => {
      dispatch(updatePostsP(index) as any);
    },
    backButton: (backButtonV: boolean)=>{
      dispatch(backButton(backButtonV))
    }
  }
}

const SearchX = connect<AppState, searchProps, searchProps>(mapStateToProps, mapDispatchToProps)(search)

const SearchS = muiThemeable()(SearchX);

export default SearchS;