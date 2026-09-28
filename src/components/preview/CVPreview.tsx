import { useCVStore } from "../../store/cvStore";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicalTemplate from "./templates/ClassicalTemplate";
import StandardTemplate from "./templates/StandardTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

export default function CVPreview() {
  const { data } = useCVStore();

  switch (data.theme) {
    case "classical":
      return <ClassicalTemplate />;
    case "standard":
      return <StandardTemplate />;
    case "minimalist":
      return <MinimalistTemplate />;
    case "elegant":
      return <ElegantTemplate />;
    case "modern":
    default:
      return <ModernTemplate />;
  }
}