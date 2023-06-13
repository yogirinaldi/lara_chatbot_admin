import { Box, useTheme, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "../../components/FormModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ConfirmModal from "../../components/ConfirmModal";

const larahost = process.env.REACT_APP_HOST;

const Dataset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataset, setDataset] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [baru, setBaru] = useState(false);

  useEffect(() => {
    const fetchDataset = async () => {
      const response = await axios.get(larahost + "/dataset");
      setDataset(response.data.data);
      setLoading(false);
    };
    fetchDataset();
  }, []);

  const updateDataset = (databaru) => {
    const existingItem = dataset.findIndex(
      (item) => item.id_data === databaru.id_data
    );

    if (existingItem === -1) {
      setDataset([...dataset, databaru]);
    } else {
      const newDataset = dataset.map((item) => {
        if (item.id_data === databaru.id_data) {
          item = databaru;
        }
        return item;
      });
      setDataset(newDataset);
    }

    setSnackbar(true);
    setFormModal(false);
  };

  const columns = [
    { field: "id_data", headerName: "ID Data" },
    { field: "title", headerName: "Title", minWidth: 150 },
    {
      field: "heading",
      headerName: "Heading",
      minWidth: 150,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "actions",
      type: "actions",
      renderCell: (params) => (
        <div>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ margin: "5px" }}
            onClick={() => {
              setDataEdit(params.row);
              setBaru(false);
              setFormModal(true);
            }}
          >
            EDIT
          </Button>
        </div>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const handleDelete = async () => {
    try {
      await axios.delete(larahost + "/dataset", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ids: selectedRows,
        },
      });

      const updatedData = dataset.filter(
        (item) => !selectedRows.includes(item.id_data)
      );
      setDataset(updatedData);
      setSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeFormModal = () => {
    setFormModal(false);
    setDataEdit({});
  };

  return (
    <Box m="20px">
      <Header
        title="DATASET"
        subtitle="Kumpulan data yang digunakan untuk melatih Chatbot LARA"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          sx={{ margin: "5px" }}
          onClick={() => {
            setBaru(true);
            setFormModal(true);
          }}
        >
          BARU
        </Button>
        <ConfirmModal
          handleDelete={handleDelete}
          buttonDisabled={selectedRows.length === 0 ? true : false}
        />
      </Box>

      <Box
        // m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id_data}
          rows={dataset}
          columns={columns}
          // getRowHeight={() => "auto"}
          // sx={{
          //   [`& .${gridClasses.cell}`]: {
          //     py: 1,
          //   },
          // }}
          components={{ Toolbar: CustomToolbar }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            sorting: {
              sortModel: [{ field: "id_data", sort: "desc" }],
            },
          }}
          loading={loading}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(item) => {
            setSelectedRows(item);
          }}
        />
      </Box>
      {formModal && (
        <FormModal
          openformmodal={formModal}
          closeformmodal={closeFormModal}
          updatedataset={updateDataset}
          baru={baru}
          data={dataEdit}
        />
      )}

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar(false);
        }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => {
            setSnackbar(false);
          }}
        >
          Berhasil!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dataset;
