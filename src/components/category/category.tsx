import AppState from '../../stateI';
import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '../grid/grid';
import { changeColor } from '../../actions/theme';
import { fullModel, setNavTitle } from '../../actions/nav';
import { categoryState } from '../../reducers/category';
import { post } from '../../Interfaces/post';
import { getCategory, getCategoriesList } from '../../actions/categories';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { MuiTheme } from 'material-ui/styles';
import { color } from '../../lib/themes';
import PostCard from "../postCard/postCard"
import Tab from '../Tab/Tab';
import { categoriesState } from '../../reducers/categories';
import { array_randS } from '../../lib/random';
const url = require('url');

const style = require("./category.less")

interface CategoryProps {
  onChangeColor?: (primaryColor: string, accentColor: string) => void;
  fullModel?: (fullModelB: boolean) => void
  categoriesList?: Map<string, categoryState>
  params?: {
    name?: string
  }
  getCategoriesList?: () => void
  loadCategory: (name: string) => void
  muiTheme?: MuiTheme
  categories?: categoriesState
  siteUrl?: string
  avatar?: string
  author?: string
  setNavTitle?: (title: string) => void
}

interface CategoryState {

}

class Category extends React.Component<CategoryProps, CategoryState>{
  loaded: boolean;
  componentWillMount() {
    this.props.onChangeColor("blue", "pink");
    this.props.fullModel(true);
    this.props.setNavTitle("分类")
  }
  onloaded(Category: CategoryState) {
  }
  render() {
    let {categoriesList = new Map<string, categoryState>(), avatar = "", author = "", siteUrl = "", params = {}, categories} = this.props;
    let {name} = params;
    let Category = categoriesList.get(name);
    let CategoriesNameList: string[] = [];
    let postList: post[] = [];
    if (typeof Category === "undefined" || typeof Category.postlist === "undefined") {
      Category = Category || {};
      if (!Category.loading) {
        this.props.loadCategory(name);
      }
    } else {
      postList = Category.postlist
      if (this.loaded == false) {
        this.loaded = true
        this.onloaded(Category)
      }
    }
    if (categories.categoriesList == undefined) {
      if (!categories.loading) {
        this.props.getCategoriesList();
      }
    } else {
      CategoriesNameList = categories.categoriesList.map((value) => {
        return value.name
      })
    }
    return (
      <div className="Category pagefullModel">
        <div className={style.categoryNameBox} style={{
          backgroundColor: this.props.muiTheme.appBar.color,
          color: this.props.muiTheme.palette.alternateTextColor
        }}>
          <Grid>
            <h1>{name}</h1>
            <Tab NameList={CategoriesNameList} value={name} link={(name)=>"/category/"+name} />
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
                link={value.slug} />
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
    categoriesList: state.categoriesList,
    categories: state.categories,
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
    loadCategory: (name: string) => {
      dispatch(getCategory(name) as any);
    },
    getCategoriesList: () => {
      dispatch(getCategoriesList() as any);
    },
    setNavTitle: (title: string) => {
      dispatch(setNavTitle(title));
    }
  }
}

const CategoryX = connect<AppState, CategoryProps, CategoryProps>(mapStateToProps, mapDispatchToProps)(Category)

const CategoryS = muiThemeable()(CategoryX);

export default CategoryS;