import React, { useState, useEffect,lazy, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import {
  Page,
  Grid,
  Card,
  Table,
  Button
} from "tabler-react";

import { useAuthDispatch, useGameState, useAuthState } from '../../Context';
import { getGamesByUser } from '../../Context/Actions/gameActions';

const GameTable = (props) => {
  const { games : {games, loading} = {}, gamesDispatch } = useGameState();
  const { userDetails } = useAuthState();
  useEffect(async ()=>{
    const res = await getGamesByUser(gamesDispatch, userDetails._id);
    if(res.error) alert(res.error);
  }, []);

  const goToPreview = (id) => {
     props.history.push(`/game-demo/${id}`)
  }
  return (
    <Page.Content title="My Games">
      <Grid.Row cards={true}>
        <Grid.Col width={12}>
          <Card title="Games List">
            {loading ? <div className="text-center mt-5 mb-5"><Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner></div>
            :
                <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>No</Table.ColHeader>
                    <Table.ColHeader>Name</Table.ColHeader>
                    <Table.ColHeader>slug</Table.ColHeader>
                    <Table.ColHeader>Action</Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {games.map((game, i)=>{
                    return <Table.Row>
                    <Table.Col>
                     {i+1}
                    </Table.Col>
                    <Table.Col>{game.gameName}</Table.Col>
                    <Table.Col>{game.gameSlug}</Table.Col>
                    <Table.Col>
                      <Button type="submit" color="warning" className="ml-auto" onClick={()=>goToPreview(game._id)}>
                        Preview
                      </Button>
                    </Table.Col>
                  </Table.Row>
                
                  })}
                </Table.Body>
              </Table> 
            }
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Page.Content>
  );
}

export default GameTable;