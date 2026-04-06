import React from "react";
import ReactSelect, { components as ReactSelectComponents } from "react-select";
import IconComponent from "./IconComponent";
import classNames from "classnames";

const OptionLabel = ({ image, name }) => (
  <div className={classNames("flex items-center", image && "gap-3")}>
    {image ? (
      <img src={image} alt={name} className="h-[27px] w-[40px]  object-cover" />
    ) : null}
    <span>{name}</span>
  </div>
);

const DropdownIndicator = (props) => (
  <ReactSelectComponents.DropdownIndicator {...props}>
    <span className="text-xs leading-none text-[color:var(--color-text-label)]">
        <IconComponent icon='drop-down'/>
    </span>
  </ReactSelectComponents.DropdownIndicator>
);

const Select = ({
  options = [],
  className = "",
  value,
  defaultValue,
  onChange,
  onClick,
  ...rest
}) => {
  const mappedOptions = options.map((item) => ({
    ...item,
    value: item.id ?? item.name,
    label: item.name,
  }));

  const fallbackValue = mappedOptions[0] || null;
  const selectedValue = value ?? defaultValue ?? fallbackValue;

  const handleChange = (selectedOption, actionMeta) => {
    if (onChange) {
      onChange(selectedOption, actionMeta);
    }
    if (onClick) {
      onClick(selectedOption, actionMeta);
    }
  };
  return (
    <ReactSelect
      className={classNames(className)}
      classNamePrefix="lrf-select"
      options={mappedOptions}
      value={selectedValue}
      isSearchable={false}
      menuPlacement="auto"
      menuPosition="fixed"
      menuShouldScrollIntoView={false}
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      onChange={handleChange}
      components={{ IndicatorSeparator: null, DropdownIndicator }}
      formatOptionLabel={(option) => (
        <OptionLabel image={option.image} name={option.name} />
      )}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: 32,
          border: "none",
          boxShadow: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          ...(state.isFocused ? { boxShadow: "none" } : {}),
        }),
        menu: (base) => ({
          ...base,
          zIndex: 30,
          marginTop: 6,
          minWidth: "max-content",
          backgroundColor: "var(--select-menu-bg)",
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 30,
        }),
        option: (base, state) => ({
          ...base,
          zIndex:30,
          cursor: "pointer",
          backgroundColor: state.isFocused
            ? "var(--select-option-hover-bg)"
            : "var(--select-option-bg)",
          color: "var(--select-option-text)",
        }),
        singleValue: (base) => ({
          ...base,
          color: "var(--select-value-text)",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: 0,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: 0,
          paddingLeft: 8,
        }),
      }}
      {...rest}
    />
  );
};

export default Select;
