import { Dispatch, FC, SetStateAction } from "react";
import { useBrandingStore } from "../../branding/brandingStore";

interface Props {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const LogoEB: FC<Props> = ({ collapsed, setCollapsed }) => {
  const store = useBrandingStore();

  return (
    <div
      onClick={() => setCollapsed((prev) => !prev)}
      style={{ cursor: "pointer" }}
    >
      {!collapsed ? (
        <img
          src={`http://localhost:3000/assets/logos/${store.currentClient}.svg`}
          alt=""
        />
      ) : (
        <img
          src={`http://localhost:3000/assets/logos/${store.currentClient}_collapsed.svg`}
          alt=""
        />
      )}
    </div>
  );
};
