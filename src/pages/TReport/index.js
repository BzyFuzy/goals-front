import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const TReportPage = () => {
  const [TReports, setTReports] = useState([]);
  useEffect(() => {
      console.log("here");
    fetchTReports();
  }, []);

  const fetchTReports = () => {
    axios
      .get("https://bzy-goals.herokuapp.com/api/treports/list")
      .then((res) => {
        if (res.data.status === "amjilttai") {
          setTReports(res.data.result);
        }
      });
  };

  const onSubmit = (result) => {
    setTReports([...TReports, result]);
  };

  const onDelete = (id) => {
    axios
      .post("https://bzy-goals.herokuapp.com/api/treports/delete", { id })
      .then((res) => {
        if (res.data.status === "done") {
          setTReports(TReports.filter((report) => report._id !== id));
        }
      });
  };

  return (
    <div>
      <Create onSubmit={onSubmit} />
      <List data={TReports} onDelete={onDelete} />
    </div>
  );
};

const List = ({ data, onDelete }) => {
  return (
    <ul>
      {data.map((report) => (
        <Report key={report._id} report={report} onDelete={onDelete} />
      ))}
    </ul>
  );
};

const Create = ({ onSubmit }) => {
  const [formdata, setFormData] = useState({
    note: "",
    desc: "",
  });
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://bzy-goals.herokuapp.com/api/treports/create", formdata)
      .then((res) => {
        if (res.data.status === "amjilttai") {
          setFormData({
            note: "",
            desc: "",
          });
          onSubmit(res.data.result);
        }
      });
  };

  const inputHandler = ({ target }) => {
    setFormData({ ...formdata, [target.name]: target.value });
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input type="text" name="desc" value={formdata.desc} onChange={inputHandler} />
      <textarea name="note" rows="4" value={formdata.note} cols="50" onChange={inputHandler} />
      <input type="submit" value="save" />
    </form>
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

export default TReportPage;
