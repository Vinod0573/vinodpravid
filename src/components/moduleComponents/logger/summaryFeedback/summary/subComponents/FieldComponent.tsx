import React from "react";

interface props {
  fieldKey: string;
  object: Record<string, string>;
  extraClassField: string;
}

export default function FieldComponent(props: props) {
  return (
    <div className={`${props.extraClassField} fields`}>
      <div className="fields__key">{props.fieldKey}:</div>
      <div className="fields__value">
        {props.object[props.fieldKey as keyof typeof props.object] || "-"}
      </div>
    </div>
  );
}
