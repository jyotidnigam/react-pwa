// App.js
import React, {useEffect} from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Spinner } from 'react-bootstrap';
import { useAuthDispatch, useGameState, useAuthState } from '../../Context';
import { getGamesByUser, fetchAllGames } from '../../Context/Actions/gameActions';
import {
Page,
Grid,
Card,
Table,
Button
} from "tabler-react";

function GameTable(props) {

  const { games : {games = [], loading} , gamesDispatch } = useGameState();
  const { userDetails } = useAuthState();
  useEffect(async ()=>{
    let res

    if(userDetails.role === 'admin'){
        res = await fetchAllGames(gamesDispatch);
    } else {
        res = await getGamesByUser(gamesDispatch, userDetails._id);   
    }
    if(res.error) alert(res.error);
  }, []);

  const columns = [
    { dataField: '_id', text: 'NO', formatter: numberFormatter },
    { dataField: 'gameName', text: 'GAME NAME', sort: true },
    { dataField: 'gameSlug', text: 'SLUG', sort: true },
    {
        dataField: 'action',
        text: 'Actions',
        isDummyField: true,
        formatter: actionsFormatter,
      },
  ];

  const defaultSorted = [{
    dataField: 'gameName',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  function actionsFormatter (cell, row, rowIndex, formatExtraData) { 
    return ( 
        <Button color="warning" className="ml-auto" onClick={()=>goToPreview(row.gameSlug)}>Preview</Button>
        ); 
  } 

  function numberFormatter (cell, row, rowIndex, formatExtraData) { 
    return rowIndex + 1; 
  }

  const goToPreview = (id) => {
     props.history.push(`/game-demo/${id}`)
  }

  return (                                                                                                                                                                                                                                                                                                                                                          
    <Page.Content title="My Games">
      <Grid.Row cards={true}>
        <Grid.Col width={12}>
            {loading ? <div className="text-center mt-5 mb-5"><Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner></div>
            :
            <BootstrapTable 
                bootstrap4 
                keyField='_id' 
                data={games} 
                columns={columns} 
                defaultSorted={defaultSorted} 
                pagination={pagination} />
            }
        </Grid.Col>
      </Grid.Row>
    </Page.Content>
    
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
}

export default GameTable;