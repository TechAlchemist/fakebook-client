import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import {FETCH_POSTS_QUERY} from '../util/graphql';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';

import '../App.css';

function Home() {

    const { user } = useContext(AuthContext);
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={1} >
            <Grid.Row className="page-title">
                <h1> Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
            </Grid.Row>
            <Grid.Row>
                <Transition.Group>
                    {loading ? (<h1>loading posts..</h1>) : ( data && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>

                    )) )}
                </Transition.Group>
            </Grid.Row>
        </Grid>
    )
}



export default Home;