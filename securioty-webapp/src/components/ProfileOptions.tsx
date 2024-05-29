import axios from "axios";
import { useEffect, useState } from "react";
import profileLab from "../scripts/profileLab";

const ProfileOptions = () => {
  const [userLabProgress, setUserLabProgress] = useState<profileLab[]>();
  useEffect(() => {
    getAccountProgress();
  }, []);
  const accountData = localStorage.getItem("ACCOUNT");
  const account = accountData !== null ? JSON.parse(accountData) : "";
  const h = { Authorization: `Bearer ${account.token}` };

  function getAccountProgress() {
    axios
      .get("/labs/get_completion_information", { headers: h })
      .then((response) => {
        // Transform the response data to match the profileLab interface
        const transformedData = response.data.map((item: any) => ({
          completedQuestions: item.completed_questions,
          description: item.lab_description,
          id: item.lab_id,
          title: item.lab_title,
          progress: item.progress_percentage,
        }));
        setUserLabProgress(transformedData);
        console.log(userLabProgress);
      })
      .catch(function (error) {
        console.error("Error fetching progress:", error);
      });
  }

  return (
    <>
      <h2 className="text-white">
        Welcome {account.firstname} {account.lastname}
      </h2>
      <h2 className="text-white">Lab Progress:</h2>
      <div className="container text-center overflow-hidden px-4">
        <div className="row row-cols-3 gx-5 pt-5">
          {userLabProgress !== undefined &&
            userLabProgress.map((lab) => {
              return (
                <div className="p-4" key={lab.id}>
                  <div className="card container">
                    <div className="card-body">
                      <h5 className="card-title">{lab.title}</h5>
                      <p className="card-text">Progress: {lab.progress}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        className="btn-group-vertical container d-flex mt-5 pt-5"
        role="group"
        aria-label="Vertical button group"
      >
        <button
          type="button"
          className="btn btn-primary d-flex justify-content-center align-items-center mt-5 pt-3 pb-3"
        >
          Change Password
        </button>
        <button
          type="button"
          className="btn btn-primary d-flex justify-content-center align-items-center mt-5 pt-3 pb-3"
        >
          Change Email
        </button>
        <button
          type="button"
          className="btn btn-primary d-flex justify-content-center align-items-center mt-5 pt-3 pb-3"
        >
          Reset Progress/ Delete Account
        </button>
      </div>
    </>
  );
};

export default ProfileOptions;
