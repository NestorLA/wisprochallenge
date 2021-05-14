import { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "reactstrap";

import { axios } from "../lib/axios/axios.js";

// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/users").then(function (response) {
      setUsers(response.data.users);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="mt-4 justify-content-center">
          <Col xs="12" sm="12" md="11" lg="10" xl="10">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Adress</th>
                  <th>DNI</th>
                  <th className="text-nowrap">Activation Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.adress}</td>
                    <td>{user.dni}</td>
                    <td>{user.signupdate}</td>
                    <td>
                      <EditIcon />
                    </td>
                    <td>
                      <DeleteIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Users;
