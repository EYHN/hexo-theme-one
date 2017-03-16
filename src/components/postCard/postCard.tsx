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
import TranslateIcon from 'material-ui/svg-icons/action/translate';
import CardHeaderAcatar from '../cardHeaderAvatar/cardHeaderAvatar'
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Content from '../context/context';
import { toc } from '../context/context';
import { postState } from '../../reducers/post';
import { post } from '../../Interfaces/post'
import { FormattedDate } from 'react-intl';
var style = require('./postCard.less')

interface PostCardProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  post:post
  authorName?: React.ReactNode,
  authorAvatar?: React.ReactNode,
  siteUrl?: string,
  link?: string,
  className?: string,
  cardMedia?: boolean
  cardMediaStyle?: React.CSSProperties,
  toc?: (tocArray: toc[]) => void
  translate?: boolean
}

let Cstate: AppState;

interface PostCardState {
  translateContent:string
}

class PostCard extends React.Component<PostCardProps, PostCardState>{
  default_thumbnail = '';

  constructor(){
    super();
    this.state = {
      translateContent:undefined
    }
  }

  componentWillMount() {
    this.default_thumbnail = array_rand(Cstate.theme.img.post_thumbnail)
  }
  render() {
    let {siteUrl = '', translate = false, className = '', link, cardMedia, cardMediaStyle,post} = this.props;
    let {thumbnail: setCover,title,excerpt,content,date,categories = [],tags = []} = post;
    setCover = array_randS(setCover)
    let { setCover: cover = this.default_thumbnail} = { setCover }
    cover = url.resolve(siteUrl, cover);
    content = this.state.translateContent || content
    return (
      <Card className={style.PostCard + ' ' + className}>
        {
          (typeof cardMedia === 'undefined' || cardMedia) && (link || title || setCover) ?
            <CardMedia
              overlay={(title) ? <CardTitle title={title} subtitle={<FormattedDate value={new Date(post.date)}/>} /> : undefined}
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
                    <Link to={link} className={style.Link}></Link> : undefined
                }
              </div>
            </CardMedia>
            : <CardText>
              <div className={style.Header}>
              <h1>
                {
                  title || ""
                }
              </h1>
              <label>
                {
                  <FormattedDate value={new Date(post.date)}/>
                }
              </label>
              <hr/>
              </div>
            </CardText>
        }
        <CardText>
          <Content content={content} translate={translate} className={style.content} markdown={true} excerpt={excerpt} toc={this.props.toc} >

          </Content>
        </CardText>
        <div className={style.CardBottom}>
          {
            this.props.authorName && this.props.authorAvatar ? <CardHeaderAcatar
              title={this.props.authorName}
              avatar={this.props.authorAvatar} /> : undefined
          }
          <div className="flexFull"></div>
          <CardText>
            {
            tags.map((value)=>{
              return <Link style={{
                    color: this.props.muiTheme.palette.accent1Color
                  }} className={style.CardBottomLink} key={value.name} to={"/tags/" + value.name + "/"}>{value.name}</Link>
            })
          }
          {
            tags.length > 0 && categories.length > 0 ? '|' : ''
          }
          {
            categories.map((value)=>{
              return <Link style={{
                    color: this.props.muiTheme.palette.accent1Color
                  }} className={style.CardBottomLink} key={value.name} to={"/categories/" + value.name + "/"}>{value.name}</Link>
            })
          }
          </CardText>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state: AppState) => {
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