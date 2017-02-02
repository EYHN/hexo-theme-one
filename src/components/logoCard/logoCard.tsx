import * as React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShare from 'material-ui/svg-icons/social/share';
var style = require('./logoCard.less')

interface LogoCardProps {

}

export default class LogoCard extends React.Component<LogoCardProps, undefined>{
  render() {
    return (
      <Card className={style.LogoCard}>
          <CardMedia>
          <div 
            className={style.CardImage}
            style={{backgroundImage:"url(https://delusion.coding.me/img/daily_pic.min.jpg)"}}
             >
          </div>
          </CardMedia>
          <div className={style.CardBottom}>
            <CardText>
              幻想帖
            </CardText>
            <div className="flexFull"></div>
            <IconMenu
                iconButtonElement={<IconButton><SocialShare /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
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