import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      profilePicture
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  const {loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      profilePicture,
      likes,
      likeCount,
      commentCount
    } = data.getPost;

   postMarkup = (
    <Grid>
    <Grid.Row>
      <Grid.Column width={2}>
        <Image
          src={profilePicture}
          size="small"
          float="right"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <hr />
          <Card.Content extra>

            {/* Avoiding destructing to allow call from home and singlePost */}
            <LikeButton user={user} id={id} likes={likes} likeCount={likeCount} />


            <MyPopup content="Comment on post">
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log('Comment on post')}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </MyPopup>

            {/* Delete Button, only active on owned posts. */}
            {user && user.username === username && (
              <DeleteButton postId={id} callback={deletePostCallback} />
            )}
          </Card.Content>
        </Card>

        {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button green"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

        {/* Create all of the comment elements from comment array */}
        {data.getPost.comments.map((comment) => (
          <Card fluid key={comment.id}>
            <Card.Content>
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
              <Card.Header>{comment.username}</Card.Header>
              <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
              <Card.Description>{comment.body}</Card.Description>
            </Card.Content>
          </Card>
        ))}

      </Grid.Column>
    </Grid.Row>
  </Grid>
   )

   return postMarkup;
  }
  return (
      <h1> Loading... </h1>
  )

}
export default SinglePost;