import React from "react";

function TicketsComponent() {
  const data = [
    {
      title: "Mostar",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mostar_Old_Town_Panorama_2007.jpg",
    },
  ];

  function createCard(ticket) {
    return (
      <div className="col-12 border rounded p-3">
        <div className="d-flex flex-row  ">
          <div
            className="overflow-hidden"
            style={{ height: "120px", width: "120px" }}
          >
            <img
              className="w-100 h-100 object-fit-cover rounded"
              src={ticket.image}
            />
          </div>
          <div className="flex-grow-1 ms-3">second</div>
          <div className="d-flex flex-column justify-content-end ">
            <p className="mb-1">
              <strong>35 KM</strong>
            </p>
            <a className="btn btn-primary">Buy</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container col-6 py-5">
      <div className="row">{data.map((ticket) => createCard(ticket))}</div>
    </div>
  );
}

export default TicketsComponent;

