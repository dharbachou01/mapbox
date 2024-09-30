import World from "@/components/Icons/WorldIcon/WorldIcon";
import {FC} from "react";

interface IMapLoadingHolderProps {
  className?: string;
}

const MapLoadingHolder: FC<IMapLoadingHolderProps> = ({className}) => {
  return (
    <div className={`loading-holder ${className}`}>
      <World className="icon" />
      <h1>Initializing the map</h1>
      <div className="icon-attribute">
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>
        {" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default MapLoadingHolder;
