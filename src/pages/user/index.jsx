import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import ChatModal from "../../components/ChatModal/ChatModal";

const User = ({ users, questions }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chatModal, setChatModal] = useState(false);
  const [userChat, setUserChat] = useState([]);

  const convertDateIndonesian = (x) => {
    const date = new Date(x);

    const indonesianMonths = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${day} ${indonesianMonths[month]} ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate}, ${formattedTime}`;
  };

  // useEffect(() => {
  //   const fetchDataUser = async () => {
  //     const response = await axios.get(larahost + "/user");
  //     setUserData(response.data.data);
  //     setLoading(false);
  //   };
  //   fetchDataUser();
  // }, []);

  // useEffect(() => {
  //   const fetchQuestionData = async () => {
  //     const response = await axios.get(larahost + "/question");
  //     setQuestionData(response.data.data);
  //   };
  //   fetchQuestionData();
  // }, [userData]);

  const columns = [
    { field: "id_user", headerName: "ID User" },
    {
      field: "nama",
      headerName: "Nama",
      cellClassName: "name-column--cell",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "jk",
      headerName: "Jenis Kelamin",
      type: "singleSelect",
      valueOptions: ["pria", "wanita"],
    },
    {
      field: "usia",
      headerName: "Usia",
      type: "number",
    },
    {
      field: "tanggal",
      headerName: "Tanggal Bergabung",
      flex: 0.5,
      minWidth: 150,
      type: "date",
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        return new Date(params.value);
      },
      valueFormatter: (params) => {
        return convertDateIndonesian(params.value);
      },
    },
    {
      field: "actions",
      type: "actions",
      hideable: false,
      renderCell: (params) => (
        <div>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={() => {
              setUserChat(
                questions.filter((item) => {
                  return item.id_user === params.id;
                })
              );
              setChatModal(true);
            }}
          >
            LIHAT
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

  const closeChatModal = () => {
    setChatModal(false);
  };

  return (
    <Box m="20px">
      <Header
        title="USER"
        subtitle="Daftar User yang menggunakan Chatbot LARA"
      />
      <Box
        //m="40px 0 0 0"
        height="72vh"
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
          getRowId={(row) => row.id_user}
          rows={users}
          columns={columns}
          // getRowHeight={() => "auto"}
          // sx={{
          //   [`& .${gridClasses.cell}`]: {
          //     py: 1,
          //   },
          // }}
          hideFooterSelectedRowCount={true}
          components={{ Toolbar: CustomToolbar }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            sorting: {
              sortModel: [{ field: "tanggal", sort: "desc" }],
            },
          }}
        />
      </Box>
      {chatModal && (
        <ChatModal
          openchatmodal={chatModal}
          closechatmodal={closeChatModal}
          userChat={userChat}
        />
      )}
    </Box>
  );
};

export default User;
