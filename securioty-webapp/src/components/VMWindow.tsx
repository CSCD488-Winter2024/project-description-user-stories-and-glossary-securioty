import React, { useState } from "react";

const VMWindow = () => {
  const [vmActive, setVmActive] = useState<boolean>(false);

  const activateVM = () => {
    setVmActive(!vmActive);
  };
  return (
    <>
      {vmActive && (
        <div className="d-flex  align-items-center w-50 vh-130 container float-end">
          <iframe
            name="iframe-vm"
            src="http://192.168.10.4:8081/vnc.html?host=192.168.10.4&port=8081&password=admin123&autoconnect=true"
            width="800"
            height="600"
          ></iframe>
        </div>
      )}
      <button className={"btn btn-primary"} onClick={activateVM}>
        {vmActive ? "Terminate VM" : "Launch VM"}
      </button>
    </>
  );
};

export default VMWindow;
