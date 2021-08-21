import React, { useState, useEffect } from "react";
import UserService from "../../services/user.services";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import moment from "moment-timezone";
import ProfileCover from "../../assets/img/profile-cover.jpg";
import Profile1 from "../../assets/img/team/profile-picture-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCalendarAlt,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faUserPlus,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Form,
  InputGroup,
  Image,
} from "@themesberg/react-bootstrap";

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import Avatar from "../../assets/img/avatar.jpg";

export default () => {
  useEffect(() => {
    const idUser = UserService.getAuthenticatedUserId();
    UserService.getUserById(idUser).then((response) => {
      setUser(response.data);
    });
  }, []);

  const [user, setUser] = useState();
  const [birthday, setBirthday] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState(Number);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  // validation
  const [firstnameRequired, setFirstnameRequired] = useState("");
  const [lastnameRequired, setLastnameRequired] = useState("");
  const [phoneRequired, setPhoneRequired] = useState("");
  const [emailRequired, setEmailRequired] = useState("");
  const [addressRequired, setAddressRequired] = useState("");
  const [imageRequired, setImageRequired] = useState("");

  const birthdayDate = new Date(birthday.valueOf()).toLocaleDateString(
    "fr-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "numeric",
      // minute: "numeric",
    }
  );

  const data = new FormData();
  data.append("firstname", firstname);
  data.append("lastname", lastname);
  data.append("birthday", birthdayDate);
  data.append("phone", phone);
  data.append("email", email);
  data.append("address", address);
  data.append("images", image);

  const validate = () => {
    let isValidForm = false;
    if (!firstname) {
      setFirstnameRequired("First name is required!");
    } else {
      setFirstnameRequired(null);
    }
    if (!lastname) {
      setLastnameRequired("Lastname is required!");
    } else {
      setLastnameRequired(null);
    }
    if (!phone) {
      setPhoneRequired("Phone is required!");
    } else {
      setPhoneRequired(null);
    }
    if (!email) {
      setEmailRequired("Email is required!");
    } else {
      setEmailRequired(null);
    }
    if (!address) {
      setAddressRequired("Address name is required!");
    } else {
      setAddressRequired(null);
    }
    if (!image) {
      setImageRequired("Image is required!");
    } else {
      setImageRequired(null);
    }
    if (firstname && lastname && phone && email && address && image) {
      isValidForm = true;
    }
    return isValidForm;
  };

  const handleSave = () => {
    const isValid = validate();
    if (isValid) {
      const idUser = UserService.getAuthenticatedUserId();
      UserService.modifyUser(data, idUser)
        .then((response) => {
          console.log(response);
          toast.success("User modified successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle
            as={Button}
            variant="secondary"
            className="text-dark me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Document
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faCommentDots} className="me-2" /> Message
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Product
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item>
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" />{" "}
              Subscription Plan
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" /> Reports
              <span className="icon icon-small ms-1">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Products
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" /> Customers
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faCartArrowDown} className="me-2" />{" "}
                Orders
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faChartPie} className="me-2" /> Console
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item>
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-success me-2"
                />{" "}
                All Reports
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">General information</h5>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your first name"
                        value={user ? user.firstname : ""}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {firstnameRequired}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Also your last name"
                        value={user ? user.lastname : ""}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {lastnameRequired}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <Form.Group id="birthday">
                      <Form.Label>Birthday</Form.Label>
                      <Datetime
                        timeFormat={false}
                        onChange={setBirthday}
                        renderInput={(props, openCalendar) => (
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="text"
                              value={
                                birthday
                                  ? moment(birthday).format("DD/MM/YYYY")
                                  : ""
                              }
                              placeholder="dd/mm/yyyy"
                              onFocus={openCalendar}
                              onChange={() => {}}
                            />
                          </InputGroup>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="+12-345 678 910"
                        value={user ? user.phone : ""}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {phoneRequired}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Email</h5>
                <Row>
                  <Col sm={9} className="mb-3">
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={user ? user.email : ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {emailRequired}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="my-4">Address</h5>
                <Row>
                  <Col sm={9} className="mb-3">
                    <Form.Group id="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        placeholder="Enter your home address"
                        value={user ? user.address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {addressRequired}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-3">
                  <Button variant="primary" type="button" onClick={handleSave}>
                    Save All
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="text-center p-0 mb-4">
                <div
                  style={{ backgroundImage: `url(${ProfileCover})` }}
                  className="profile-cover rounded-top"
                />
                <Card.Body className="pb-5">
                  <Card.Img
                    src={user ? user.avatar : Profile1}
                    alt="Neil Portrait"
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                  />
                  <Card.Title>
                    {user ? user.firstname + " " + user.lastname : "Neil Sims"}
                  </Card.Title>
                  <Card.Subtitle className="fw-normal">
                    Senior Software Engineer
                  </Card.Subtitle>
                  <Card.Text className="text-gray mb-4">
                    New York, USA
                  </Card.Text>

                  <Button variant="primary" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />{" "}
                    Connect
                  </Button>
                  <Button variant="secondary" size="sm">
                    Send Message
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Select profile photo </h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                      <Image
                        fluid
                        rounded
                        src={image ? URL.createObjectURL(image) : Avatar}
                      />
                    </div>
                    <div className="file-field">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex">
                          <span className="icon icon-md">
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="me-3"
                            />
                          </span>
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <div className="d-md-block text-start">
                            <div className="fw-normal text-dark mb-1">
                              Choose Image
                            </div>
                            <div className="text-gray small">
                              JPG, GIF or PNG. Max size of 800K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <div className="text-start w-100 invalid-feedback d-block">
                  {imageRequired}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
