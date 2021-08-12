import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import TagService from "../../services/tag.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { Fragment } from "react";

export default (props) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    TagService.getAllTags()
      .then((response) => {
        setTags(response.data);
        //console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    TagService.deleteTag(id)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        refreshList();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Internal server error");
      });
  };

  const handleEdit = (id) => {
    props.history.push(`/tags/edit/${id}`);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <h5 className="mb-4">List Tags</h5>
              <Table
                responsive
                className="table-centered table-nowrap rounded mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">Name</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag) => {
                    return (
                      <Fragment key={tag._id}>
                        <tr>
                          <td>{tag.name}</td>
                          <td>{tag.description}</td>
                          <td>
                            {" "}
                            <Button
                              variant="info"
                              type="button"
                              size="sm"
                              className="me-1"
                              onClick={handleEdit.bind(this, tag._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="primary"
                              type="button"
                              size="sm"
                              onClick={handleDelete.bind(this, tag._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
