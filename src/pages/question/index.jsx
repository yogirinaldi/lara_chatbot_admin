import { Box, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import TablePopOver from "../../components/TablePopOver";
import { useState } from "react";

const Question = ({ questions, users }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  //   const fetchQuestionData = async () => {
  //     const response = await axios.get("http://localhost:5000/question");
  //     setQuestionData(response.data.data);
  //     setLoading(false);
  //   };
  //   fetchQuestionData();
  // }, []);

  const columns = [
    { field: "id_user", headerName: "ID User" },
    { field: "pertanyaan", headerName: "Pertanyaan", flex: 1, minWidth: 150 },
    {
      field: "jawaban",
      headerName: "Jawaban",
      flex: 2,
      minWidth: 300,
    },

    {
      field: "feedback",
      headerName: "Feedback",
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        if (params.value === true) {
          return "BAIK";
        } else if (params.value === false) {
          return "BURUK";
        } else if (params.value === null) {
          return "-";
        }
      },
      type: "singleSelect",
      valueOptions: ["BAIK", "BURUK", "-"],
      sortable: false,
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      flex: 1,
      minWidth: 150,
      type: "date",
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        return new Date(params.value);
      },
      valueFormatter: (params) => {
        return convertDateIndonesian(params.value);
      },
      // renderCell: (params) => <div>{}</div>,
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

  const [openPopOver, setOpenPopOver] = useState(false);
  const [contentPopOver, setContentPopOver] = useState("");

  const handleOpenPopover = (params) => {
    if (params.field === "pertanyaan") {
      setContentPopOver(params.row.pertanyaan);
      setOpenPopOver(true);
    } else if (params.field === "jawaban") {
      setContentPopOver(params.row.jawaban);
      setOpenPopOver(true);
    } else if (params.field === "id_user") {
      const user = users.filter((item) => {
        return item.id_user === params.row.id_user;
      })[0];
      setContentPopOver(`${user.nama}, ${user.usia} Tahun, ${user.jk}`);
      setOpenPopOver(true);
    }
  };

  const handleClosePopover = () => {
    setOpenPopOver(false);
  };

  return (
    <Box m="20px">
      <Header
        title="PERTANYAAN"
        subtitle="Daftar pertanyaan User dengan Chatbot LARA"
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
          getRowId={(row) => row.id_question}
          rows={questions}
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
          onCellClick={handleOpenPopover}
        />
        <TablePopOver
          open={openPopOver}
          onClose={handleClosePopover}
          popoverContent={contentPopOver}
        />
      </Box>
    </Box>
  );
};

export default Question;
