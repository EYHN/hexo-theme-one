import { connect } from 'react-redux';
import AppState from '../../stateI';
import * as React from 'react';
import { Dispatch } from 'redux';
import Grid from '../grid/grid';
import { MuiTheme } from 'material-ui/styles';
import { fullModel, setNavTitle } from '../../actions/nav';
import { changeColor } from '../../actions/theme';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
const style = require("./search.less");

interface searchProps {
  fullModel?:(fullModelB: boolean)=>void
  ChangeColor?: (primaryColor: string, accentColor: string) => void
  muiTheme?: MuiTheme
  setNavTitle: (title: string)=>void
}

interface searchState {

}

class search extends React.Component<searchProps, searchState>{
  componentWillMount() {
    this.props.setNavTitle("Search")
    this.props.fullModel(true)
    this.props.ChangeColor("white","blue")
  }
  componentWillUnmount(){
    this.props.fullModel(false)
  }
  render() {
    return (
      <div className="search">
        <Paper className={style.inputCanve}
          style = {{
            backgroundColor: this.props.muiTheme.palette.accent1Color
          }}
          zDepth={1}>
          <Grid className={style.grid}>
            <TextField
                className={style.input}
                inputStyle={{
                  color: "#fff",
                  fontSize: "60px",
                  height: "60px"
                }}
                underlineStyle={{
                }}
              />
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState)=>{
  return {
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>)=>{
  return {
    fullModel:(fullModelB: boolean)=>{
      dispatch(fullModel(fullModelB));
    },
    ChangeColor: (primaryColor: string, accentColor: string) => {
      dispatch(changeColor(primaryColor, accentColor))
    },
    setNavTitle: (title: string)=>{
      dispatch(setNavTitle(title));
    }
  }
}

const SearchX = connect<AppState, searchProps, searchProps>(mapStateToProps, mapDispatchToProps)(search)

const SearchS = muiThemeable()(SearchX);

export default SearchS;