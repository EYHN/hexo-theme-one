import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../../stateI';
const ReactDisqusThread = require('../../lib/react-disqus-thread/DisqusThread.jsx');

interface commentProps {
  className?: string
  postID: string
  postTitle: string
  url?: string
  disqus?: any
  author?: string,
  postCategory: string
}

export class Comment extends React.Component<commentProps, undefined>{
  handleNewComment(comment: any) {
  }

  render() {
    let {url = window.location.href, disqus = {}, className = "", author = "", postCategory, postTitle, postID} = this.props
    return (
      <div className={className}>
        {
          typeof disqus.shortName !== "undefined" ?
            <ReactDisqusThread
              shortname={disqus.shortName}
              identifier={postID}
              title={postTitle}
              url={encodeURI(url)}
              category_id={postCategory}
              onNewComment={this.handleNewComment} />
            : undefined
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {author = ""} = state.site;
  let {comment = {}} = state.theme;
  let {disqus = {}} = comment;
  return {
    author: author,
    disqus: disqus
  }
}

const CommentX = connect<AppState, commentProps, commentProps>(mapStateToProps)(Comment as any)

export default CommentX;