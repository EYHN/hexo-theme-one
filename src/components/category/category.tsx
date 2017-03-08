import AppState from '../../stateI';
import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '../grid/grid';
import { changeColor } from '../../actions/theme';
import { fullModel } from '../../actions/nav';
import { categoryState } from '../../reducers/category';
import post from '../../reducers/post';

interface CategoryProps {
  onChangeColor?: (primaryColor: string, accentColor: string) => void;
  fullModel?: (fullModelB: boolean) => void
  categoriesList?: Map<string,categoryState>
  params?: {
    name?: string
  }
}

interface CategoryState {

}

class Category extends React.Component<CategoryProps, CategoryState>{
  componentWillMount() {
    //this.props.onChangeColor(this.props.defaultPrimaryColor, this.props.defaultAccentColor);
    this.props.fullModel(true)
  }
  render() {
    let {categoriesList = new Map<string,categoryState>(),params = {}} = this.props;
    let {name} = params;
    let Category = categoriesList.get(name);
    if (typeof Category === "undefined" || typeof Category.postlist === "undefined") {
      Category = Category || {};
      if (!Category.loading) {
        this.props.loadCategory(name);
      }
    } else {
      thumbnail = url.resolve(siteUrl, array_randS(post.thumbnail) || this.default_thumbnail);
      if (this.loaded == false) {
        this.loaded = true
        this.onloaded(post)
      }
    }
    return (
      <div className="Category pagefullModel">
        <Grid>

        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    categoriesList: state.categoriesList
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
    loadCategory:()
  }
}

const CategoryX = connect<AppState, CategoryProps, CategoryProps>(mapStateToProps, mapDispatchToProps)(Category)

export default CategoryX;