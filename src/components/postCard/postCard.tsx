import * as React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShare from 'material-ui/svg-icons/social/share';
import CardHeaderAcatar from '../cardHeaderAvatar/cardHeaderAvatar'
import muiThemeable from 'material-ui/styles/muiThemeable';
var style = require('./postCard.less')

interface PostCardProps {
  muiTheme: __MaterialUI.Styles.MuiTheme,
  title?:React.ReactNode,
  subtitle?:React.ReactNode,
  cover?:string,
  excerpt?:React.ReactNode,
  authorName?:React.ReactNode,
  authorAvatar?:React.ReactNode
}

export class PostCard extends React.Component<PostCardProps, undefined>{
  render() {
    return (
      <Card className={style.PostCard}>
        <CardMedia
          overlay={<CardTitle title={this.props.title} subtitle={this.props.subtitle} />}
        >
          <div
            className={style.CardImage}
            style={{ backgroundImage: `url(${this.props.cover})` }}
          >
          </div>
        </CardMedia>
        <CardText>
        {
          this.props.excerpt
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


export default muiThemeable<any, any, any>()(PostCard);