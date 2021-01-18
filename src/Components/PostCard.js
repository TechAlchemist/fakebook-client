import React from "react";
import { Card, Icon, Label, Image } from "semantic-ui-react";
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Meta as={Link} to={`/posts/${id}`}> { moment(createdAt).fromNow() } </Card.Meta>
        <Card.Header>{ username }</Card.Header>
        <Card.Description> { body } </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p> More Stuff is planned for here.  </p>
      </Card.Content>
    </Card>
  );
}

export default PostCard;