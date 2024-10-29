import { servicesTypes } from "../config/services-options-config";


type Props = {
  selectedServicesTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ServicesTypesFilter = ({ selectedServicesTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Services Type</h4>
      {servicesTypes.map((servicesType) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={servicesType}
            checked={selectedServicesTypes.includes(servicesType)}
            onChange={onChange}
          />
          <span>{servicesType}</span>
        </label>
      ))}
    </div>
  );
};

export default ServicesTypesFilter;