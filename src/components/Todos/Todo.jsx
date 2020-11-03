import React from "react";
import "./Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Modal, Row } from "react-bootstrap";

function Todo(props) {
  let tasks = [];

  if (props.typeList === "completed") {
    tasks = props.tasks.filter((elem) => elem.taskChecked === true);
  } else if (props.typeList === "todo") {
    tasks = props.tasks.filter((elem) => elem.taskChecked === false);
  } else if (props.typeList === "all") {
    tasks = props.tasks;
  }
  return (
    <Modal.Body scrolling={"no"} className={"scroll"}>
      {tasks.map((el) => {
        if (!el) {
          return null;
        }
        return (
          <div key={el.idTask} className="todo">
            <Container>
              <Row className={"todosh"}>
                <Col>
                  <label>
                    {el.taskChecked ? (
                      <input
                        defaultChecked={true}
                        onClick={(e) => {
                          props.checkedLocal(e.target.checked, el.idTask);
                        }}
                        type="checkBox"
                      />
                    ) : (
                      <input
                        onClick={(e) => {
                          props.checkedLocal(e.target.checked, el.idTask);
                        }}
                        type="checkBox"
                      />
                    )}

                    <span className={"pseudocheckbox"}></span>
                  </label>
                </Col>

                <Col className={"text"}>
                  {el.taskChecked ? (
                    <div className="bodyTaskTrue">
                      <p>{el.textTask}</p>
                    </div>
                  ) : (
                    <div className="bodyTaskFalse">
                      <p>{el.textTask}</p>
                    </div>
                  )}
                </Col>

                <Col>
                  <FontAwesomeIcon
                    onClick={() => {
                      props.deleteTask(el.idTask);
                    }}
                    className={"trashIcon"}
                    icon={faTrashAlt}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
    </Modal.Body>
  );
}

export default Todo;
