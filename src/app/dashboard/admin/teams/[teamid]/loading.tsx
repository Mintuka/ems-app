import Canvas from "@/components/Dashboard/Canvas";
import LoadingNavBar from "@/components/Loading/LoadingNavBar";
import LoadingTeam from "@/components/Loading/LoadingTeam";

type Props = {};
function loading({}: Props) {
  return (
    <Canvas>
      <LoadingNavBar />
      <hr />
      <LoadingTeam />
    </Canvas>
  );
}
export default loading;
