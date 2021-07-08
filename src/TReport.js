import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

function TReport() {
  const [formdata, setFormData] = useState({
    note: "",
    desc: "",
  });

  const submit = (e) => {
    e.preventDefault();
    axios.post("/api/treports/create", formdata);
  };

  const inputHandler = ({ target }) => {
    setFormData({ ...formdata, [target.name]: target.value });
  };

  return (
    <div>
      <form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input type="text" name="desc" onChange={inputHandler} />
        <textarea name="note" rows="4" cols="50" onChange={inputHandler} />
        <input type="submit" value="save" />
      </form>
      <List />
    </div>
  );
}

const List = () => {
  const [reports, setreports] = useState([]);
  const fetchReports = () => {
    axios.get("/api/treports/").then((res) => {
      if (Array.isArray(res.data)) {
        setreports(res.data);
      }
    });
  };
  useEffect(() => {
    fetchReports();
  }, []);
  const onDelete = (id) => {
    axios.post("/api/treports/delete", { id }).then((res) => {
      if (res.data.status === "done") {
        setreports(reports.filter((report) => report._id !== id));
      }
    });
  };
  return (
    <ul>
      {reports.map((report) => (
        <Report key={report._id} report={report} onDelete={onDelete} />
      ))}
    </ul>
  );
};

const Report = ({ report, onDelete }) => {
  return (
    <li style={{ display: "flex", alignItems: "center" }} key={report._id}>
      {report.desc} - {moment(report.created).format("YYYY-MM-DD HH:mm:ss")}
      <button onClick={(e) => onDelete(report._id)}>Delete</button>
    </li>
  );
};

export default TReport;
