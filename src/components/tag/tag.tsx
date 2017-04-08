import { backButton, fullModel, setNavTitle } from '../../actions/nav';
import { getTag, getTagsList } from '../../actions/tags';
import { changeColor } from '../../actions/theme';
import { post } from '../../Interfaces/post';
import { array_randS } from '../../lib/random';
import { color } from '../../lib/themes';
import { tagState } from '../../reducers/tag';
import { tagsState } from '../../reducers/tags';
import Grid from '../grid/grid';
import PostCard from '../postCard/postCard';
import Tab from '../Tab/Tab';
import { MuiTheme } from 'material-ui/styles';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AppState from '../../stateI';
const url = require('url');

const style = require("./tag.less")

interface TagProps {
  onChangeColor?: (primaryColor: string, accentColor: string) => void;
  fullModel?: (fullModelB: boolean) => void
  tagsList?: Map<string, tagState>
  params?: {
    name?: string
  }
  getTagsList?: () => void
  loadTag: (name: string) => void
  muiTheme?: MuiTheme
  tags?: tagsState
  siteUrl?: string
  avatar?: string
  author?: string
  setNavTitle?: (title: string) => void
  backButton?: (backButton: boolean) => void
}

interface TagState {

}

class Tag extends React.Component<TagProps, TagState>{
  loaded: boolean;
  componentWillMount() {
    this.props.onChangeColor("blue", "pink");
    this.props.fullModel(true);
    this.props.setNavTitle("标签");
    this.props.backButton(true);
  }
  onloaded(tag: TagState) {
  }
  render() {
    let {tagsList = new Map<string, tagState>(), avatar = "", author = "", siteUrl = "", params = {}, tags} = this.props;
    let {name} = params;
    let tag = tagsList.get(name);
    let TagsNameList: string[] = [];
    let postList: post[] = [];
    if (typeof tag === "undefined" || typeof tag.postlist === "undefined") {
      tag = tag || {};
      if (!tag.loading) {
        this.props.loadTag(name);
      }
    } else {
      postList = tag.postlist
      if (this.loaded == false) {
        this.loaded = true
        this.onloaded(tag)
      }
    }
    if (tags.tagsList == undefined) {
      if (!tags.loading) {
        this.props.getTagsList();
      }
    } else {
      TagsNameList = tags.tagsList.map((value) => {
        return value.name
      })
    }
    return (
      <div className="Tag pagefullModel">
        <div className={style.tagNameBox} style={{
          backgroundColor: this.props.muiTheme.appBar.color,
          color: this.props.muiTheme.palette.alternateTextColor
        }}>
          <Grid>
            <h1>{name}</h1>
            <Tab NameList={TagsNameList} value={name} link={(name)=>"/tags/" + name + "/"} />
          </Grid>
        </div>
        <Grid>
          {
            postList.map((value) => {
              return <PostCard
                post={value}
                key={value.slug}
                authorAvatar={url.resolve(siteUrl, avatar)}
                authorName={author}
                link={"/post/" + value.slug + "/"} />
            })
          }
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { img = {} } = state.theme;
  return {
    avatar: array_randS(img.avatar),
    siteUrl: state.site.siteUrl,
    tagsList: state.tagsList,
    tags: state.tags,
    author: state.site.author
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onChangeColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    },
    fullModel: (fullModelB: boolean) => {
      dispatch(fullModel(fullModelB));
    },
    loadTag: (name: string) => {
      dispatch(getTag(name) as any);
    },
    getTagsList: () => {
      dispatch(getTagsList() as any);
    },
    setNavTitle: (title: string) => {
      dispatch(setNavTitle(title));
    },
    backButton: (backButtonV: boolean)=>{
      dispatch(backButton(backButtonV))
    }
  }
}

const TagX = connect<AppState, TagProps, TagProps>(mapStateToProps, mapDispatchToProps)(Tag)

const TagS = muiThemeable()(TagX);

export default TagS;