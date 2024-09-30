import mapboxgl from "mapbox-gl";
import {FC} from "react";

interface ISidebarProps {
  map?: mapboxgl.Map
}

const Sidebar: FC<ISidebarProps> = ({map}) => {
  return <div>...some sidebar content...</div>;
}

export default Sidebar;
