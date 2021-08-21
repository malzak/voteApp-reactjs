import React, { useEffect, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import Select from "react-select";
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
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import EventService from "../../services/event.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import EventImage from "../../assets/img/events.jpg";
import { useParams } from "react-router-dom";

export default (props) => {
  const [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(Number);
  const [availableTicketNumber, setAvailableTicketNumber] = useState(Number);
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { idEvent } = useParams();
  // validation
  const [nameRequired, setNameRequired] = useState("");
  const [descriptionRequired, setDescriptionRequired] = useState("");
  const [priceRequired, setPriceRequired] = useState("");
  const [availableTicketNumberRequired, setAvailableTicketNumberRequired] =
    useState("");
  const [imageRequired, setImageRequired] = useState("");
  const [locationRequired, setLocationRequired] = useState("");
  const [eventTypeRequired, setEventTypeRequired] = useState("");

  useEffect(() => {
    EventService.getEventById(idEvent)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const startDateTime = new Date(startDate.valueOf()).toLocaleDateString(
    "fr-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "numeric",
      // minute: "numeric",
    }
  );
  const endDateTime = new Date(endDate.valueOf()).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "numeric",
    // minute: "numeric",
  });

  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("price", price);
  data.append("availableTicketNumber", availableTicketNumber);
  data.append("location", location);
  data.append("startDateTime", startDateTime);
  data.append("endDateTime", endDateTime);
  data.append("images", image);
  //data.append("tags", JSON.stringify(tag_));
  data.append("eventType", eventType);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleAvailableTicketNumber = (e) => {
    setAvailableTicketNumber(e.target.value);
  };

  const validate = () => {
    let isValidForm = false;
    if (!name) {
      setNameRequired("Name is required!");
    } else {
      setNameRequired(null);
    }
    if (!description) {
      setDescriptionRequired("Description is required!");
    } else {
      setDescriptionRequired(null);
    }
    if (!price) {
      setPriceRequired("Price is required!");
    } else {
      setPriceRequired(null);
    }
    if (!availableTicketNumber) {
      setAvailableTicketNumberRequired("Available tickets is required!");
    } else {
      setAvailableTicketNumberRequired(null);
    }
    if (!image) {
      setImageRequired("Image is required!");
    } else {
      setImageRequired(null);
    }
    if (!location) {
      setLocationRequired("Address is required!");
    } else {
      setLocationRequired(null);
    }
    if (!eventType) {
      setEventTypeRequired("Event type is required!");
    } else {
      setEventTypeRequired(null);
    }
    if (
      name &&
      description &&
      price &&
      availableTicketNumber &&
      image &&
      location &&
      eventType
    ) {
      isValidForm = true;
    }
    return isValidForm;
  };

  const handleReset = () => {
    const isValid = validate();
    if (isValid) {
      EventService.modifyEvent(event, idEvent)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edit Event</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your event name"
                  value={event ? event.name : ""}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {nameRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Enter event description"
                  value={event ? event.description : ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {descriptionRequired}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="startDate">
                <Form.Label>Start Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  timeFormat="HH:mm"
                  viewMode="time"
                  timeConstraints={{
                    hours: { min: 0, max: 23 },
                    minutes: { step: 1 },
                  }}
                  onChange={setStartDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          startDate
                            ? moment(startDate).format("DD/MM/YYYY")
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
              <Form.Group id="endDate">
                <Form.Label>End Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  timeFormat="HH:mm"
                  viewMode="time"
                  timeConstraints={{
                    hours: { min: 0, max: 23 },
                    minutes: { step: 1 },
                  }}
                  onChange={setEndDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          endDate ? moment(endDate).format("DD/MM/YYYY") : ""
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
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="12 €"
                  value={event ? event.price : ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {priceRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="availableTicketNumber">
                <Form.Label>Number of tickets</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="0"
                  value={event ? event.availableTicketNumber : ""}
                  onChange={(e) => setAvailableTicketNumber(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {availableTicketNumberRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Select event photo</h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                      <Image
                        fluid
                        rounded
                        src={image ? URL.createObjectURL(image) : EventImage}
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
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Enter your home address"
                  value={event ? event.location : ""}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {locationRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="type" className="mb-4">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={event ? event.type : ""}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="free" selected>
                    Free
                  </option>
                  <option value="paid">Paid</option>
                </Form.Select>
                <div className="text-start w-100 invalid-feedback d-block">
                  {eventTypeRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="type" className="mb-4">
                <Form.Label>Tags</Form.Label>
                <Select isMulti value={event.tags} />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="button" onClick={handleReset}>
              <i className="fa fa-save"></i> Save
            </Button>
            <Button
              variant="primary ms-1"
              type="button"
              onClick={() => props.history.push("/events")}
            >
              <i className="fa fa-undo"></i> Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
