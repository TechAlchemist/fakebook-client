import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {

    const { user } = useContext(AuthContext);

    function commentOnPost() {
      console.log('hi')
    }

  return (
    <Card style={{width: 1000}}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{ username }</Card.Header>
        <Card.Description> { body } </Card.Description>
        <Card.Meta as={Link} to={`/posts/${id}`}> { moment(createdAt).fromNow() } </Card.Meta>
      </Card.Content>
      <Card.Content extra>

        {/* LIKE BUTTON */}
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        
        {/* COMMENT BUTTON */}
        <Button as='div' labelPosition='right' onClick={commentOnPost}>
        <Button color='red'>
            <Icon name='comment alternate' color="black" />
            Comment
        </Button>
        <Label basic color='red' pointing='left'>
            {commentCount}
        </Label>
        </Button>
        { user && user.username === username && (
          <Button as="div" color="purple" onClick={() => console.log('Delete Post. ')}>
            <Icon name="trash" 
            style={{ margin: 0 }}  
            floated="right" 
            /> 
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;