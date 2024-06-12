import ActiveLab from "../components/ActiveLab";
import VMWindow from "../components/VMWindow";

const Lab = () => {
  const selectedLab = JSON.parse(localStorage.getItem("currentLab") || "null");
  return (
    <>
      <ActiveLab labItem={selectedLab} />
      <VMWindow />
    </>
  );
};

export default Lab;
