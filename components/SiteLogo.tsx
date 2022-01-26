import { FunctionComponent } from "react";

const SiteLogo: FunctionComponent = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <a href="/">
        <img
          className="hidden lg:block h-35 w-14"
          src="/3wa.png"
          alt="Workflow"
        />
      </a>
    </div>
  );
};

export default SiteLogo;
