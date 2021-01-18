import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {

    function likePost() {
        console.log('like post');
    }

    function commentOnPost() {
        console.log('comment on post');
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
        <Button as='div' labelPosition='right' onClick={likePost}>
        <Button color='red'>
            <Icon name='thumbs up' color="black" />
            Like
        </Button>
        <Label basic color='red' pointing='left'>
            { likeCount }
        </Label>
        </Button>
        
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

      </Card.Content>
    </Card>
  );
}

export default PostCard;