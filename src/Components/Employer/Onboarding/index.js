import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import React from "react";

const industry = ["IT", "AGRICULTURE", "AUTOMOTIVE", "BANKING", "CONSTRUCTION"];

function EmployerOnboarding() {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: userData?.email ? userData.email : "",
    phone: "",
    companyName: "",
    companySize: "",
    hrEmail: "",
    companyAddress: "",
    industry: "",
  });
  const submitUserInfo = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", `${userData.uid}`), {
        ...userInfo,
        type: "employer",
      });
      alert("success");
      navigate("/employer/profile");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log("sunmit", userInfo);
  };

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo({
      ...userInfo,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <form onSubmit={submitUserInfo}>
      <h1>Employer Onboarding</h1>

      <Grid
        container
        spacing={2}
        sx={{
          padding: "10px",
          maxWidth: "95%",
          margin: "20px auto",
          backgroundColor: "#fff",
          boxShadow: "0px 8px, 24px rgba(0, 0, 0.15)",
          borderRadius: "8px",
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Name</Typography>
          <TextField
            required
            variant="outlined"
            fullWidth
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">email</Typography>
          <TextField
            required
            disabled
            type="email"
            variant="outlined"
            fullWidth
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">phone</Typography>
          <TextField
            type="number"
            variant="outlined"
            fullWidth
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">company name</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.companyName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companyName: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">company size</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.companySize}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companySize: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">HR Email</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.hrEmail}
            onChange={(e) =>
              setUserInfo({ ...userInfo, hrEmail: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Company Address</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={userInfo.companyAddress}
            onChange={(e) =>
              setUserInfo({ ...userInfo, companyAddress: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Industry type</Typography>
          <FormControl fullWidth>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.industry}
              onChange={(e) =>
                setUserInfo({ ...userInfo, industry: e.target.value })
              }
            >
              {industry.map((ind, index) => {
                return (
                  <MenuItem key={index} value={ind}>
                    {ind}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployerOnboarding;
