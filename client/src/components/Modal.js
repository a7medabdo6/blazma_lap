import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

function ModalCom(props) {
  return (
    <div dir="ltr">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            class="swal2-icon swal2-success swal2-icon-show"
            style={{ display: "flex" }}
          >
            <div
              class="swal2-success-circular-line-left"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            ></div>
            <span class="swal2-success-line-tip"></span>{" "}
            <span class="swal2-success-line-long"></span>
            <div class="swal2-success-ring"></div>{" "}
            <div
              class="swal2-success-fix"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            ></div>
            <div
              class="swal2-success-circular-line-right"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            ></div>
          </div>
          <h2 class="swal2-title" id="swal2-title" style={{ display: "block" }}>
            {props.message}
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={props.onHide}
            message="  تم تأكيد الحجز بنجاح
"
          >
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCom;
