import { array_rand, array_randS } from '../../lib/random';
import AppState from '../../stateI';
import * as Url from 'url';
import * as React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShare from 'material-ui/svg-icons/social/share';
import CardHeaderAcatar from '../cardHeaderAvatar/cardHeaderAvatar'
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux'
import { Link } from 'react-router';
var style = require('./postCard.less')

interface PostCardProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
  cover?: string,
  excerpt?: string,
  authorName?: React.ReactNode,
  authorAvatar?: React.ReactNode,
  default_thumbnail?: string,
  siteUrl?: string,
  content?: string,
  link?: boolean,
  className?: boolean,
  cardMedia?:boolean
}

function removeHTMLTag(str: String) {
  str = str.replace(/<\/?[^>]*>/g, '');
  str = str.replace(/[ | ]*\n/g, '\n');
  str = str.replace(/ /ig, '');
  return str;
}

export class PostCard extends React.Component<PostCardProps, undefined>{
  default_thumbnail = '';
  excerpt() {
    let {excerpt: e = ""} = this.props
    return removeHTMLTag(e.toString());
  }
  componentWillMount() {
    this.default_thumbnail = this.props.default_thumbnail
  }
  render() {
    let {cover = this.default_thumbnail, siteUrl = '', className = '',cardMedia = true} = this.props
    cover = Url.resolve(siteUrl, cover);
    return (
      <Card className={style.PostCard + ' ' + className}>

        {
          cardMedia?
          <CardMedia
            overlay={<CardTitle title={this.props.title} subtitle={this.props.subtitle} />}
          >
            <div
              className={style.CardImage}
              style={{ backgroundImage: `url(${cover})` }}
            >
              <Link to="/post/aa" className={style.Link}>

              </Link>
            </div>
          </CardMedia>
          :undefined
          }
        <CardText>
          {
            this.props.content || this.excerpt()
          }
        </CardText>
        <div className={style.CardBottom}>
          <CardHeaderAcatar
            title={this.props.authorName}
            avatar={this.props.authorAvatar} />
          <div className="flexFull"></div>
          <CardText><a style={{
            color: this.props.muiTheme.palette.primary1Color
          }} href="#">分类</a> | <a style={{
            color: this.props.muiTheme.palette.primary1Color
          }} href="#">分类</a></CardText>
          <IconMenu
            iconButtonElement={<IconButton><SocialShare /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        </div>
      </Card>
    )
  }
}

const mapStateToProps: (state: AppState) => PostCardProps = (state: AppState) => {
  try {
    var { theme: {img: {post_thumbnail}}, site: {siteUrl} } = state;
  } catch (e) {
    console.error(e);
  }
  return {
    siteUrl: siteUrl || '',
    default_thumbnail: array_rand(post_thumbnail || '')
  }
};


let PostCardS = muiThemeable()(PostCard);

let PostCardX = connect<AppState, PostCardProps, PostCardProps>(mapStateToProps)(PostCardS as any)

export default PostCardX;