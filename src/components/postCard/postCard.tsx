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
import * as $ from 'jquery';
import Content from '../context/context';
var style = require('./postCard.less')

interface PostCardProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
  cover?: string,
  excerpt?: string,
  authorName?: React.ReactNode,
  authorAvatar?: React.ReactNode,
  siteUrl?: string,
  content?: string,
  link?: string,
  className?: string,
  cardMedia?: boolean,
  cardMediaStyle?: React.CSSProperties
}

let Cstate:AppState;

export class PostCard extends React.Component<PostCardProps, undefined>{
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
    let {cover: setCover, siteUrl = '', className = '', link, title, excerpt, subtitle, cardMedia, cardMediaStyle, content} = this.props;
    let { setCover: cover = this.default_thumbnail} = { setCover }
    cover = Url.resolve(siteUrl, cover);
    return (
      <Card className={style.PostCard + ' ' + className}>

        {
          (typeof cardMedia === 'undefined' || cardMedia) && (link || title || subtitle || setCover) ?
            <CardMedia
              overlay={title || subtitle ? <CardTitle title={title} subtitle={subtitle} /> : undefined}
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
          <Content content={content} markdown={false} excerpt={excerpt} >

          </Content>
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
  Cstate = state
  return {
    siteUrl: siteUrl || ''
  }
};


let PostCardS = muiThemeable()(PostCard);

let PostCardX = connect<AppState, PostCardProps, PostCardProps>(mapStateToProps)(PostCardS as any)

export default PostCardX;