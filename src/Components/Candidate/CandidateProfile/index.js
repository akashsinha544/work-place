import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useTheme } from "@mui/material/styles";

const domains = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Devops",
  "UI/UX",
  "QA",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing",
  "Blockchain",
  "Softwere Engineer",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C++",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CandidateProfile() {
  const theme = useTheme();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    domain: "",
    address: "",
  });

  async function fetchUserInfo() {
    try {
      const docRef = doc(db, "userData", userData.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserInfo({
      ...userInfo,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };
  const saveInfo = async () => {
    try {
      await setDoc(
        doc(db, "userData", userData.uid),
        {
          ...userInfo,
        },
        { merge: true }
      );
      alert("sucessfully updated");
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form>
          <h1>Profile</h1>
          <Grid
            container
            spacing={2}
            sx={{
              padding: "10px",
              maxWidth: "95%",
              margin: "20px auto",
              backgroundColor: "#fff",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
              borderRadius: "8px",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Name</Typography>
              <TextField
                disabled={!edit}
                required
                variant="outlined"
                fullWidth
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
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
                required
                disabled={!edit}
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
              <Typography variant="h6">Experience</Typography>
              <TextField
                required
                disabled={!edit}
                variant="outlined"
                fullWidth
                value={userInfo.experience}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, experience: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">education</Typography>
              <TextField
                disabled={!edit}
                variant="outlined"
                fullWidth
                value={userInfo.education}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, education: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Domain</Typography>
              <FormControl fullWidth>
                <Select
                  disabled={!edit}
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userInfo.domain}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, domain: e.target.value })
                  }
                >
                  {domains.map((domain, index) => {
                    return (
                      <MenuItem key={index} value={domain}>
                        {domain}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Skills</Typography>
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  disabled={!edit}
                  id="demo-multiple-chip"
                  multiple
                  required
                  value={userInfo.skills}
                  onChange={handleSkillChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {skills.map((skill) => (
                    <MenuItem
                      key={skill}
                      value={skill}
                      style={getStyles(skill, userInfo.skills, theme)}
                    >
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {edit ? (
                <div>
                  <Button variant="contained" onClick={saveInfo}>
                    Save
                  </Button>
                  <Button variant="contained" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="contained" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}

export default CandidateProfile;