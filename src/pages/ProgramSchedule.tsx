import ProgramScheduleCard from "../Components/ProgramScheduleCard";
import { ProgramScheduleDataArray } from "../config/constants";
export default function ProgramSchedule() {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "block",
        width: "55%",
        margin: "0px auto",
      }}
    >
      <ProgramScheduleCard items={ProgramScheduleDataArray} itemsPerPage={10} />
    </div>
  );
}
