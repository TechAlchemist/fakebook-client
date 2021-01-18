import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../Components/PostCard';

import '../App.css';

function Home() {

    const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id body createdAt username
            likes {
                username
            }
            likeCount
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

    console.log(data)
    return (
        <Grid columns={1} >
            <Grid.Row className="page-title">
                <h1> Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (<h1>loading posts..</h1>) : ( data && data.getPosts.map(post => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                    </Grid.Column>
                )) )}
            </Grid.Row>
        </Grid>
    )
}



export default Home;