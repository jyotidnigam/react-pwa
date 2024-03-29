import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Spinner } from 'react-bootstrap';
import { useGameState, useAuthState } from '../../Context';
import { getGamesByUser, fetchAllGames, deleteGame } from '../../Context/Actions/gameActions';
import {
  Page,
  Grid,
} from "tabler-react";
import Builder from '../Builder';
import Swal from 'sweetalert2/dist/sweetalert2'

import 'sweetalert2/src/sweetalert2.scss'

function GameTable(props) {

  const { games: { games = [], loading }, gamesDispatch } = useGameState();
  const { userDetails } = useAuthState();
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState('');
  useEffect(async () => {
    let res

    if (userDetails.role === 'admin') {
      res = await fetchAllGames(gamesDispatch);
    } else {
      res = await getGamesByUser(gamesDispatch, userDetails._id);
    }
    if (res.error) alert(res.error);
  }, []);

  const toggleModal = () => {
    setShow(!show)
  }

  const deleteRecord = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete the game!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        deleteGame(gamesDispatch, id)
        Swal.fire(
          'Deleted!',
          'Your game has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your game is safe :)',
          'error'
        )
      }
    })
  }
  const editGame = (row) => {
    setEditData(row);
    toggleModal();
  }

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

  function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <i class="far fa-eye ml-2 fa-2x primary pointer" onClick={() => goToPreview(row.gameSlug)} />
        <i class="fas fa-arrow-circle-up ml-2 fa-2x secondary pointer" onClick={() => editGame(row)} />
        <i class="fas fa-times-circle ml-2 fa-2x danger pointer" onClick={() => deleteRecord(row.gameSlug)} />

      </div>
    );
  }

  function numberFormatter(cell, row, rowIndex, formatExtraData) {
    return rowIndex + 1;
  }

  const goToPreview = (id) => {
    props.history.push(`/game-demo/${id}`)
  }


  return (
    <Page.Content title="My Games">
      <div className="text-right mb-4"><i class="fas fa-plus-circle primary fa-3x pointer" onClick={toggleModal} /></div>
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
      { show && <Builder
        toggleModal={toggleModal}
        editData={editData}
        setEditData={setEditData}
        history={props.history} />
      }
    </Page.Content>

  );
}

export default GameTable;