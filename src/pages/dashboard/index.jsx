import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PeopleIcon from "@mui/icons-material/People";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";

const Dashboard = ({ questions, users, goodFeedback, badFeedBack }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("render");

  const mockLineData = [
    {
      id: "Wanita",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: "5 - 15",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 5 && item.usia <= 15;
          }).length,
        },
        {
          x: "16 - 24",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 16 && item.usia <= 24;
          }).length,
        },
        {
          x: "25 - 34",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 25 && item.usia <= 34;
          }).length,
        },
        {
          x: "35 - 44",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 35 && item.usia <= 44;
          }).length,
        },
        {
          x: "45 - 54",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 45 && item.usia <= 54;
          }).length,
        },
        {
          x: "55 - 64",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 55 && item.usia <= 64;
          }).length,
        },
        {
          x: "diatas 65",
          y: users.filter((item) => {
            return item.jk === "wanita" && item.usia >= 65;
          }).length,
        },
      ],
    },
    {
      id: "Pria",
      color: tokens("dark").blueAccent[300],
      data: [
        {
          x: "5 - 15",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 5 && item.usia <= 15;
          }).length,
        },
        {
          x: "16 - 24",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 16 && item.usia <= 24;
          }).length,
        },
        {
          x: "25 - 34",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 25 && item.usia <= 34;
          }).length,
        },
        {
          x: "35 - 44",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 35 && item.usia <= 44;
          }).length,
        },
        {
          x: "45 - 54",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 45 && item.usia <= 54;
          }).length,
        },
        {
          x: "55 - 64",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 55 && item.usia <= 64;
          }).length,
        },
        {
          x: "diatas 65",
          y: users.filter((item) => {
            return item.jk === "pria" && item.usia >= 65;
          }).length,
        },
      ],
    },
  ];

  const mockPieData = [
    {
      id: "wanita",
      label: "Wanita",
      value: users.filter((item) => {
        return item.jk === "wanita";
      }).length,
      color: "#fff",
    },
    {
      id: "pria",
      label: "Pria",
      value: users.filter((item) => {
        return item.jk === "pria";
      }).length,
      color: "hsl(331, 70%, 50%)",
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>
      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={2}
            pb={2}
            sx={{ borderRadius: "8px" }}
          >
            <StatBox
              title={questions.length}
              subtitle="Pertanyaan"
              progress="1"
              increase=""
              icon={
                <QuestionAnswerIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={2}
            pb={2}
            sx={{ borderRadius: "8px" }}
          >
            <StatBox
              title={`${goodFeedback}`}
              subtitle="Feedback Baik"
              progress="1"
              increase=""
              icon={
                <ThumbUpAltIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={2}
            pb={2}
            sx={{ borderRadius: "8px" }}
          >
            <StatBox
              title={`${badFeedBack}`}
              subtitle="Feedback Buruk"
              progress="1"
              increase=""
              icon={
                <ThumbDownAltIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={2}
            pb={2}
            sx={{ borderRadius: "8px" }}
          >
            <StatBox
              title={users.length}
              subtitle="User"
              progress="1"
              increase=""
              icon={
                <PeopleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{ marginTop: "25px" }}
      >
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Box
            backgroundColor={colors.primary[400]}
            pt={2}
            sx={{ borderRadius: "8px" }}
          >
            <Box
              p="0px 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Usia
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="light"
                  color={colors.greenAccent[500]}
                >
                  Chart pengelompokan usia
                </Typography>
              </Box>
              {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} data={mockLineData} />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <Box
            backgroundColor={colors.primary[400]}
            pt={2}
            sx={{ borderRadius: "8px" }}
          >
            <Box
              p="0 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Jenis Kelamin
                </Typography>
              </Box>
            </Box>
            <Box height="250px">
              <PieChart data={mockPieData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
