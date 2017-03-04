import { array_rand, array_randS } from '../../lib/random';
import AppState from '../../stateI';
const url = require('url');
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
import FlatButton from 'material-ui/FlatButton';
import Content from '../context/context';
import { toc } from '../context/context';
import post from '../../reducers/post';
var style = require('./postCard.less')

interface PostCardProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  title?: React.ReactNode
  cover?: string,
  excerpt?: string,
  authorName?: React.ReactNode,
  authorAvatar?: React.ReactNode,
  siteUrl?: string,
  content?: string,
  link?: string,
  className?: string,
  cardMedia?: boolean
  slug?: string
  cardMediaStyle?: React.CSSProperties,
  toc?: (tocArray: toc[]) => void
  date?:React.ReactNode
}

let Cstate: AppState;

class PostCard extends React.Component<PostCardProps, undefined>{
  default_thumbnail = '';

  renderContent() {
    if (this.props.content) {
      $("#postContext").html(this.props.content)
    }
  }
  componentWillMount() {
    this.default_thumbnail = array_rand(Cstate.theme.img.post_thumbnail)
  }
  render() {
    let {cover: setCover, slug = '', siteUrl = '',date, className = '', link, title, excerpt, cardMedia, cardMediaStyle, content} = this.props;
    let { setCover: cover = this.default_thumbnail} = { setCover }
    cover = url.resolve(siteUrl, cover);
    return (
      <Card className={style.PostCard + ' ' + className}>

        {
          (typeof cardMedia === 'undefined' || cardMedia) && (link || title || setCover) ?
            <CardMedia
              overlay={(title) ? <CardTitle title={title} subtitle={date} /> : undefined}
              style={{
                ...cardMediaStyle
              }}
            >
              <div
                className={style.CardImage}
                style={{ backgroundImage: `url(${cover})` }}
              >
                {
                  link ?
                    <Link to={"/post/" + link} className={style.Link}></Link> : undefined
                }
              </div>
            </CardMedia>
            : undefined
        }
        <CardText>
          <Content content={content} className={style.content} markdown={true} excerpt={excerpt} toc={this.props.toc} >

          </Content>
        </CardText>
        <div className={style.CardBottom}>
          {
            this.props.authorName && this.props.authorAvatar ? <CardHeaderAcatar
              title={this.props.authorName}
              avatar={this.props.authorAvatar} /> : undefined
          }
          <div className="flexFull"></div>
          <CardText><a style={{
            color: this.props.muiTheme.palette.accent1Color
          }} href="#">分类</a> | <a style={{
            color: this.props.muiTheme.palette.accent1Color
          }} href="#">分类</a></CardText>
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
  Cstate = state
  return {
    siteUrl: siteUrl || ''
  }
};

let PostCardX = connect<AppState, PostCardProps, PostCardProps>(mapStateToProps)(PostCard as any)

let PostCardS = muiThemeable()(PostCardX);

export default PostCardS;