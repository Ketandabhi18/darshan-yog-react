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
        marginBottom: "2%",
      }}
    >
      <ProgramScheduleCard items={ProgramScheduleDataArray} itemsPerPage={10} />
    </div>
  );
}
